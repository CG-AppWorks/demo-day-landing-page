// CaptionHub — single Durable Object holding live caption state and fanning
// segments out to SSE subscribers. See spec §2.1.
//
// Channels: "openai" and "gemini" are the two engine pipelines. "active" is a
// virtual channel: subscribers to it always receive whatever channel the admin
// switch currently points at, and get a `switch` event when it flips.

import { CORS_HEADERS, json } from "./http.js";

const CHANNELS = ["openai", "gemini"];               // caption-producing engine channels
const SWITCH_TARGETS = ["openai", "gemini", "wordly"]; // valid POST /api/switch values
const STREAM_CHANNELS = ["openai", "gemini", "active"];
const MAX_SEGMENTS = 500;       // per-channel in-memory cap (spec §2.1)
const BACKLOG_ON_CONNECT = 30;  // recent segments replayed to a new subscriber
const KV_RECENT = 50;           // segments mirrored to KV for polling fallback
const HEARTBEAT_MS = 20_000;    // keep-alive comment through proxies (spec §2.1)
const KV_FLUSH_MS = 5_000;      // debounce window for persistence writes

export class CaptionHub {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.enc = new TextEncoder();

    // Live state (in-memory, rebuilt from storage on cold start).
    this.segments = { openai: [], gemini: [] }; // each sorted ascending by seq
    this.active = "openai";
    this.subs = { openai: new Set(), gemini: new Set(), active: new Set() };

    this.heartbeat = null;
    this.lastFlush = 0;
    this.dirty = { openai: false, gemini: false };

    this.state.blockConcurrencyWhile(async () => {
      const storedActive = await this.state.storage.get("active");
      if (SWITCH_TARGETS.includes(storedActive)) this.active = storedActive;
      for (const ch of CHANNELS) {
        const arr = await this.state.storage.get(`segments:${ch}`);
        if (Array.isArray(arr)) this.segments[ch] = arr;
      }
    });
  }

  async fetch(request) {
    const url = new URL(request.url);
    try {
      switch (url.pathname) {
        case "/api/segment": return await this.handleSegment(request);
        case "/api/switch":  return await this.handleSwitch(request);
        case "/api/latest":  return this.handleLatest(url);
        case "/api/stream":  return this.handleStream(url);
        default:             return json({ error: "not_found" }, { status: 404 });
      }
    } catch (err) {
      return json({ error: "internal", message: String((err && err.message) || err) }, { status: 500 });
    }
  }

  // -- POST /api/segment ----------------------------------------------------
  // Body: { channel, seq, en, zh, ts?, final? }. Interim segments (final:false)
  // are later replaced in place by the final segment with the same seq.
  async handleSegment(request) {
    let body;
    try { body = await request.json(); } catch { return json({ error: "bad_json" }, { status: 400 }); }

    const { channel, seq, en = "", zh = "", ts, final = true } = body || {};
    if (!CHANNELS.includes(channel)) return json({ error: "bad_channel" }, { status: 400 });
    if (!Number.isFinite(seq))       return json({ error: "bad_seq" }, { status: 400 });

    const seg = { channel, seq, en: String(en), zh: String(zh), ts: Number.isFinite(ts) ? ts : Date.now(), final: !!final };
    this.upsert(channel, seg);
    this.broadcast(seg);
    this.scheduleFlush(channel);
    return json({ ok: true, seq });
  }

  upsert(channel, seg) {
    const arr = this.segments[channel];
    const i = arr.findIndex((s) => s.seq === seg.seq);
    if (i >= 0) {
      arr[i] = seg; // replace interim with final (or correct a resend); order unchanged
      return;
    }
    arr.push(seg);
    // Cheap path: usually monotonic, so only sort if the new seq landed out of order.
    if (arr.length > 1 && seg.seq < arr[arr.length - 2].seq) arr.sort((a, b) => a.seq - b.seq);
    if (arr.length > MAX_SEGMENTS) arr.splice(0, arr.length - MAX_SEGMENTS);
  }

  // -- POST /api/switch -----------------------------------------------------
  async handleSwitch(request) {
    let body;
    try { body = await request.json(); } catch { return json({ error: "bad_json" }, { status: 400 }); }

    const active = body && body.active;
    if (!SWITCH_TARGETS.includes(active)) return json({ error: "bad_target" }, { status: 400 });

    this.active = active;
    await this.state.storage.put("active", active);
    try { await this.env.CAPTIONS_KV.put("active", active); } catch { /* KV is best-effort */ }

    // Tell "active" subscribers to reset, then replay the new source's backlog.
    // "wordly" is a non-caption source (the viewer shows the Wordly embed), so
    // it has no segments to replay.
    this.sendRaw("active", this.frame("switch", { active, ts: Date.now() }));
    const segs = CHANNELS.includes(active) ? this.segments[active].slice(-BACKLOG_ON_CONNECT) : [];
    this.sendRaw("active", this.frame("backlog", { channel: active, segments: segs }));

    return json({ ok: true, active });
  }

  // -- GET /api/latest?channel=&since= (polling fallback) -------------------
  handleLatest(url) {
    const requested = url.searchParams.get("channel") || "active";
    const resolved = requested === "active" ? this.active : requested;
    if (resolved === "wordly") return json({ channel: "wordly", active: this.active, segments: [] });
    if (!CHANNELS.includes(resolved)) return json({ error: "bad_channel" }, { status: 400 });

    const sinceRaw = url.searchParams.get("since");
    const since = sinceRaw === null ? null : Number(sinceRaw);
    let segs = this.segments[resolved];
    if (Number.isFinite(since)) segs = segs.filter((s) => s.seq > since);

    return json({ channel: resolved, active: this.active, segments: segs });
  }

  // -- GET /api/stream?channel=openai|gemini|active (SSE) -------------------
  handleStream(url) {
    const channel = url.searchParams.get("channel") || "active";
    if (!STREAM_CHANNELS.includes(channel)) return json({ error: "bad_channel" }, { status: 400 });

    const hub = this;
    let ctrl;
    const stream = new ReadableStream({
      start(controller) {
        ctrl = controller;
        hub.subs[channel].add(controller);
        const resolved = channel === "active" ? hub.active : channel;
        controller.enqueue(hub.frame("hello", { channel, active: hub.active, ts: Date.now() }));
        const segs = CHANNELS.includes(resolved) ? hub.segments[resolved].slice(-BACKLOG_ON_CONNECT) : [];
        controller.enqueue(hub.frame("backlog", { channel: resolved, segments: segs }));
        hub.ensureHeartbeat();
      },
      cancel() {
        hub.subs[channel].delete(ctrl);
        hub.maybeStopHeartbeat();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
        ...CORS_HEADERS,
      },
    });
  }

  // -- fan-out helpers ------------------------------------------------------
  broadcast(seg) {
    const frame = this.frame("segment", seg);
    this.sendRaw(seg.channel, frame);
    if (seg.channel === this.active) this.sendRaw("active", frame);
  }

  frame(event, data) {
    return this.enc.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  }

  sendRaw(channel, bytes) {
    for (const c of this.subs[channel]) {
      try { c.enqueue(bytes); }
      catch { this.subs[channel].delete(c); } // controller closed; drop it
    }
  }

  ensureHeartbeat() {
    if (this.heartbeat) return;
    this.heartbeat = setInterval(() => {
      const ping = this.enc.encode(`: ping ${Date.now()}\n\n`);
      for (const ch of STREAM_CHANNELS) this.sendRaw(ch, ping);
    }, HEARTBEAT_MS);
  }

  maybeStopHeartbeat() {
    const open = this.subs.openai.size + this.subs.gemini.size + this.subs.active.size;
    if (open === 0 && this.heartbeat) {
      clearInterval(this.heartbeat);
      this.heartbeat = null;
    }
  }

  // -- persistence (debounced) ----------------------------------------------
  scheduleFlush(channel) {
    this.dirty[channel] = true;
    const now = Date.now();
    if (now - this.lastFlush < KV_FLUSH_MS) return;
    this.lastFlush = now;
    this.flush();
  }

  flush() {
    for (const ch of CHANNELS) {
      if (!this.dirty[ch]) continue;
      this.dirty[ch] = false;
      const recent = this.segments[ch].slice(-MAX_SEGMENTS);
      // DO storage = durable across restarts; KV = cross-instance polling fallback.
      this.state.storage.put(`segments:${ch}`, recent);
      // KV mirror is best-effort; swallow failures (it's only the polling fallback).
      try {
        this.env.CAPTIONS_KV.put(`segments:${ch}`, JSON.stringify(recent.slice(-KV_RECENT))).catch(() => {});
      } catch { /* binding missing in some local setups */ }
    }
  }
}
