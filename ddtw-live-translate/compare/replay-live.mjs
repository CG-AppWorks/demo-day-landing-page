// replay-live.mjs — re-broadcast the DD_Clip bilingual captions through the
// deployed Worker as if the event were live, so the team can watch /compare
// and /viewer behave in real time.
//
// Per segment: posts an interim (partial text, final:false), then the full
// bilingual segment (final:true), paced by text length (~speaking speed).
//
// Usage:
//   node replay-live.mjs                 # one pass over the clip (~12 min feel, default 1.5x)
//   node replay-live.mjs --speed=3       # 3x faster
//   node replay-live.mjs --loop          # repeat until Ctrl-C
//
// Reads: out/openai.bi.json, out/gemini.bi.json
// Token: DDTW_ADMIN_TOKEN env, or /tmp/ddtw_admin_token.txt

import { readFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";

const BASE = process.env.DDTW_BASE || "https://ddtw-captions.hsichun.workers.dev";
const SPEED = Number((process.argv.find((a) => a.startsWith("--speed=")) || "").split("=")[1]) || 1.5;
const LOOP = process.argv.includes("--loop");

const TOKEN = process.env.DDTW_ADMIN_TOKEN ||
  (existsSync("/tmp/ddtw_admin_token.txt") ? readFileSync("/tmp/ddtw_admin_token.txt", "utf8").trim() : "");
if (!TOKEN) { console.error("No admin token (set DDTW_ADMIN_TOKEN or /tmp/ddtw_admin_token.txt)"); process.exit(1); }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

async function post(channel, seq, en, zh, final) {
  // A live broadcaster must shrug off transient network errors — never throw.
  for (let a = 0; a < 3; a++) {
    try {
      const r = await fetch(`${BASE}/api/segment`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
        body: JSON.stringify({ channel, seq, en, zh, final }),
      });
      if (!r.ok) log(`  ! ${channel} seq ${seq} -> HTTP ${r.status}`);
      return;
    } catch (e) {
      if (a === 2) { log(`  ! ${channel} seq ${seq} dropped: ${e.cause?.code || e.message}`); return; }
      await sleep(700 * (a + 1));
    }
  }
}

// Duration a segment stays "being spoken": ~14 chars/s for CJK-ish mixed text.
function speakMs(p) {
  const len = Math.max((p.zh || "").length, (p.en || "").length / 2);
  return Math.min(Math.max((len / 14) * 1000, 1500), 9000) / SPEED;
}

async function replayOnce(openai, gemini, runBase) {
  const n = Math.max(openai.length, gemini.length);
  log(`streaming ${n} segments to ${BASE} (speed ${SPEED}x) …`);
  for (let i = 0; i < n; i++) {
    const seq = runBase + i;
    const o = openai[i], g = gemini[i];
    const dur = speakMs(g || o || {});
    // interim: first ~60% of the text, lighter style on viewers
    const interim = (p) => ({
      en: (p.en || "").slice(0, Math.ceil((p.en || "").length * 0.6)) + "…",
      zh: (p.zh || "").slice(0, Math.ceil((p.zh || "").length * 0.6)) + "…",
    });
    await Promise.all([
      o && post("openai", seq, interim(o).en, interim(o).zh, false),
      g && post("gemini", seq, interim(g).en, interim(g).zh, false),
    ]);
    await sleep(dur * 0.6);
    await Promise.all([
      o && post("openai", seq, o.en, o.zh, true),
      g && post("gemini", seq, g.en, g.zh, true),
    ]);
    if ((i + 1) % 10 === 0) log(`  ${i + 1}/${n}`);
    await sleep(dur * 0.4);
  }
  log("pass complete.");
}

const openai = JSON.parse(await readFile("out/openai.bi.json", "utf8"));
const gemini = JSON.parse(await readFile("out/gemini.bi.json", "utf8"));

// Unique seq space per run so reconnecting viewers don't collide with old data.
let runBase = 10_000 + (Math.floor(process.uptime() * 1000) % 1000) * 1000;
do {
  await replayOnce(openai, gemini, runBase);
  runBase += Math.max(openai.length, gemini.length) + 100;
} while (LOOP);
