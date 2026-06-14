// ddtw-captions — Worker entry / router.
//
// Step 1 scope (build-order §4.1): segment ingest, SSE fan-out, polling
// fallback, channel switch. All stateful routes forward to the single
// CaptionHub Durable Object instance ("event").
//
// Later steps add: POST /api/translate, POST /api/ephemeral/openai,
// POST /api/ephemeral/gemini (return 501 for now so the contract is visible).

import { CaptionHub } from "./caption-hub.js";
import { CORS_HEADERS, json } from "./http.js";
import { captionChunk, translateText } from "./ai.js";

export { CaptionHub };

// Routes the broadcaster posts to — require the admin bearer token.
const ADMIN_ROUTES = new Set([
  "/api/segment",
  "/api/switch",
  "/api/translate",
  "/api/caption",
  "/api/ephemeral/openai",
  "/api/ephemeral/gemini",
]);

// Stateful routes handled by the Durable Object.
const DO_ROUTES = new Set([
  "/api/segment",
  "/api/stream",
  "/api/latest",
  "/api/switch",
]);

// Direct browser→provider streaming (not needed by the chunked /api/caption path).
const NOT_YET = new Set([
  "/api/ephemeral/openai",
  "/api/ephemeral/gemini",
]);

const ENGINES = new Set(["openai", "gemini"]);

// Post a finished segment to the single DO instance (store + SSE fan-out).
function postSegment(env, seg) {
  const stub = env.CAPTION_HUB.get(env.CAPTION_HUB.idFromName("event"));
  return stub.fetch(new Request("https://do/api/segment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(seg),
  }));
}

function isAdmin(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  // Constant-ish comparison; tokens are short and this isn't a timing-critical surface.
  return Boolean(env.ADMIN_TOKEN) && token === env.ADMIN_TOKEN;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (pathname === "/" || pathname === "/health") {
      return json({
        ok: true,
        service: "ddtw-captions",
        step: 1,
        channels: ["openai", "gemini"],
        routes: ["/api/segment", "/api/stream", "/api/latest", "/api/switch"],
      });
    }

    if (ADMIN_ROUTES.has(pathname) && !isAdmin(request, env)) {
      return json({ error: "unauthorized" }, { status: 401 });
    }

    if (NOT_YET.has(pathname)) {
      return json({ error: "not_implemented", note: "use the chunked /api/caption path" }, { status: 501 });
    }

    // Live caption: one audio chunk -> STT -> bilingual glossary translation ->
    // store + fan out. Multipart: audio (wav blob), engine, seq, context?, terms?
    if (pathname === "/api/caption") {
      try {
        const form = await request.formData();
        const file = form.get("audio");
        const engine = String(form.get("engine") || "openai");
        const seq = Number(form.get("seq"));
        const ctx = String(form.get("context") || "");
        const terms = String(form.get("terms") || "");
        if (!file || typeof file === "string") return json({ error: "no_audio" }, { status: 400 });
        if (!ENGINES.has(engine)) return json({ error: "bad_engine" }, { status: 400 });
        if (!Number.isFinite(seq)) return json({ error: "bad_seq" }, { status: 400 });

        const bytes = new Uint8Array(await file.arrayBuffer());
        const res = await captionChunk(env, engine, file, bytes, file.type || "audio/wav", ctx, terms);
        if (res.transcript) {
          await postSegment(env, { channel: engine, seq, en: res.en, zh: res.zh, final: true });
        }
        return json({ ok: true, seq, ...res });
      } catch (e) {
        return json({ error: "caption_failed", message: String(e.message || e).slice(0, 300) }, { status: 502 });
      }
    }

    // Text-only bilingual translate (testing / reuse).
    if (pathname === "/api/translate") {
      try {
        const b = await request.json();
        if (!b || !b.text) return json({ error: "no_text" }, { status: 400 });
        const engine = ENGINES.has(b.engine) ? b.engine : "openai";
        const pair = await translateText(env, engine, String(b.text), String(b.context || ""), String(b.terms || ""));
        return json({ ok: true, ...pair });
      } catch (e) {
        return json({ error: "translate_failed", message: String(e.message || e).slice(0, 300) }, { status: 502 });
      }
    }

    if (DO_ROUTES.has(pathname)) {
      const id = env.CAPTION_HUB.idFromName("event");
      const stub = env.CAPTION_HUB.get(id);
      return stub.fetch(request);
    }

    return json({ error: "not_found" }, { status: 404 });
  },
};
