// run-compare.mjs — OpenAI vs Gemini head-to-head on a recorded clip.
// Pipeline per engine: STT (own model) -> glossary translation (own model).
// Outputs raw transcripts/translations to ./out and a side-by-side HTML report.
//
// Usage:
//   node run-compare.mjs            # full run (transcribe + translate + render)
//   node run-compare.mjs --render   # re-render report from existing ./out files
//
// Keys are read from ~/.config/ddtw/keys.env (OPENAI_API_KEY, GEMINI_API_KEY).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { GLOSSARY, glossaryForPrompt } from "./glossary.js";

const AUDIO = "audio/dd_clip.mp3";
const OUT = "out";
const OPENAI_STT = "gpt-4o-transcribe";
const OPENAI_MT = "gpt-4o-mini";
const GEMINI_MODEL = "gemini-2.5-flash"; // STT + MT; falls back to 2.0-flash if needed
const CHUNK = 200;       // lines per translation call (one call/engine = rate-limit-safe)
const CTX = 4;           // trailing context lines carried into the next chunk

// ---- keys ----
function loadKeys() {
  const p = join(homedir(), ".config/ddtw/keys.env");
  const env = {};
  const text = existsSync(p) ? readFileSync(p, "utf8") : "";
  for (const line of text.split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

const KEYS = loadKeys();
const OPENAI_KEY = KEYS.OPENAI_API_KEY;
const GEMINI_KEY = KEYS.GEMINI_API_KEY;

const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

// ---- language + segmentation helpers ----
function cjkRatio(s) {
  const cjk = (s.match(/[㐀-鿿]/g) || []).length;
  const letters = (s.match(/[A-Za-z㐀-鿿]/g) || []).length || 1;
  return cjk / letters;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function segment(text) {
  // Caption-sized lines for mixed CJK + Latin. Split on sentence enders,
  // commas, and whitespace; greedily pack to LIMIT; hard-cut overlong units
  // (handles Mandarin runs with little/no punctuation).
  const LIMIT = 80;
  const units = text.replace(/\s+/g, " ").split(/(?<=[.!?。！？,，、;；])|\s+/).map((s) => s.trim()).filter(Boolean);
  const lines = [];
  let buf = "";
  const latinJoin = (a, b) => a && /[A-Za-z0-9]$/.test(a) && /^[A-Za-z0-9]/.test(b);
  for (let u of units) {
    while (u.length > LIMIT) { if (buf) { lines.push(buf); buf = ""; } lines.push(u.slice(0, LIMIT)); u = u.slice(LIMIT); }
    const sep = latinJoin(buf, u) ? " " : "";
    if (buf && (buf.length + sep.length + u.length) > LIMIT) { lines.push(buf); buf = ""; }
    buf = buf ? buf + (latinJoin(buf, u) ? " " : "") + u : u;
  }
  if (buf) lines.push(buf);
  return lines.filter(Boolean);
}

// ---- OpenAI ----
async function openaiTranscribe() {
  log("OpenAI STT:", OPENAI_STT, "…");
  const buf = await readFile(AUDIO);
  const fd = new FormData();
  fd.append("file", new Blob([buf], { type: "audio/mpeg" }), "dd_clip.mp3");
  fd.append("model", OPENAI_STT);
  fd.append("response_format", "json");
  const r = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST", headers: { Authorization: `Bearer ${OPENAI_KEY}` }, body: fd,
  });
  if (!r.ok) throw new Error(`OpenAI STT ${r.status}: ${await r.text()}`);
  return (await r.json()).text;
}

function biUserPrompt(lines, ctx) {
  return (ctx.length ? `Recent lines already captioned (for consistency):\n${ctx.map((c) => c.zh).join("\n")}\n\n` : "") +
    `Caption these ${lines.length} lines. Return JSON {"out":[{"en","zh"}, ...]} with exactly ${lines.length} items, same order.\n\n` +
    lines.map((l, i) => `${i + 1}. ${l}`).join("\n");
}

async function openaiTranslateChunk(lines, ctx) {
  const sys = bilingualSystemPrompt();
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OPENAI_MT, temperature: 0.2,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "bicaptions", strict: true,
          schema: {
            type: "object", additionalProperties: false, required: ["out"],
            properties: {
              out: {
                type: "array", minItems: lines.length, maxItems: lines.length,
                items: {
                  type: "object", additionalProperties: false, required: ["en", "zh"],
                  properties: { en: { type: "string" }, zh: { type: "string" } },
                },
              },
            },
          },
        },
      },
      messages: [{ role: "system", content: sys }, { role: "user", content: biUserPrompt(lines, ctx) }],
    }),
  });
  if (!r.ok) throw new Error(`OpenAI MT ${r.status}: ${await r.text()}`);
  const txt = (await r.json()).choices[0].message.content;
  return JSON.parse(txt).out;
}

// ---- Gemini ----
let geminiModel = GEMINI_MODEL;
async function geminiPickModel() {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_KEY}`);
  if (!r.ok) return;
  const names = ((await r.json()).models || []).map((m) => m.name.replace("models/", ""));
  // Prefer 3.5-flash (separate, unspent daily quota bucket), then fall back.
  for (const pref of ["gemini-3.5-flash", "gemini-2.0-flash", "gemini-2.5-flash", "gemini-1.5-flash"]) {
    if (names.includes(pref)) { geminiModel = pref; return; }
  }
}
async function geminiCall(body, tries = 8) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${GEMINI_KEY}`;
  for (let a = 0; a < tries; a++) {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (r.ok) {
      const j = await r.json();
      const parts = j.candidates?.[0]?.content?.parts || [];
      return parts.map((p) => p.text || "").join("");
    }
    if ([429, 500, 503].includes(r.status) && a < tries - 1) { await sleep(Math.min(3000 * (a + 1), 12000)); continue; }
    throw new Error(`Gemini ${r.status}: ${await r.text()}`);
  }
}
async function geminiTranscribe() {
  log("Gemini STT:", geminiModel, "…");
  const buf = await readFile(AUDIO);
  return geminiCall({
    contents: [{
      parts: [
        { inline_data: { mime_type: "audio/mp3", data: buf.toString("base64") } },
        { text: "Transcribe this audio verbatim in the language spoken. Output ONLY the transcript text — no timestamps, no speaker labels, no commentary." },
      ],
    }],
  });
}
async function geminiTranslateChunk(lines, ctx) {
  const out = await geminiCall({
    systemInstruction: { parts: [{ text: bilingualSystemPrompt() }] },
    contents: [{ parts: [{ text: biUserPrompt(lines, ctx) }] }],
    generationConfig: {
      temperature: 0.2, responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT", required: ["out"],
        properties: {
          out: {
            type: "ARRAY",
            items: { type: "OBJECT", required: ["en", "zh"], properties: { en: { type: "STRING" }, zh: { type: "STRING" } } },
          },
        },
      },
    },
  });
  const v = JSON.parse(out);
  return Array.isArray(v) ? v : v.out;
}

// ---- shared bilingual prompt: each line -> BOTH English and zh-TW ----
function bilingualSystemPrompt() {
  return [
    "You are captioning a bilingual startup Demo Day in Taipei for a MIXED audience (Mandarin and English speakers).",
    "For EACH input line, output BOTH:",
    '  - "en": a natural, concise English caption.',
    '  - "zh": Traditional Chinese as used in Taiwan (繁體中文，台灣慣用語).',
    "If a line is already in one language, keep that side faithful and translate the other side.",
    "Taiwan vocabulary ONLY in zh: 軟體 not 软件, 網路 not 网络, 影片 not 视频, 新創 not 初创, 人工智慧/AI not 人工智能.",
    "These proper nouns must be rendered exactly; 'keep as' means leave in English (in BOTH en and zh):",
    glossaryForPrompt(),
    "Keep numbers, currencies, and units exact. Output ONLY the captions, no notes.",
  ].join("\n");
}

async function translateAll(engine, lines) {
  const fn = engine === "openai" ? openaiTranslateChunk : geminiTranslateChunk;
  const result = [];
  for (let i = 0; i < lines.length; i += CHUNK) {
    const chunk = lines.slice(i, i + CHUNK);
    const ctx = result.slice(-CTX);
    let out = null, last = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const r = await fn(chunk, ctx);
        if (Array.isArray(r)) last = r;
        if (Array.isArray(r) && r.length === chunk.length) { out = r; break; }
        log(`  ${engine}: chunk ${i / CHUNK} length mismatch (${r?.length}/${chunk.length})`);
      } catch (e) {
        log(`  ${engine}: chunk ${i / CHUNK} error: ${String(e.message).slice(0, 90)}`);
      }
      await sleep(1500 * (attempt + 1)); // back off; respects per-minute limits
    }
    // Quota-safe fallback: reuse best partial result, pad missing — never fan out per-line.
    if (!out) out = chunk.map((_, k) => (last && last[k]) || { en: "⟨—⟩", zh: "⟨—⟩" });
    result.push(...out);
    log(`  ${engine}: captioned ${result.length}/${lines.length}`);
  }
  return result;
}

// ---- report ----
function esc(s) { return String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }
function termCheck(enText) {
  return GLOSSARY.filter((g) => /[A-Za-z]/.test(g.en) && g.en.length > 3).map((g) => ({
    term: g.en, want: g.zh, hit: new RegExp(`\\b${g.en.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(enText),
  }));
}
async function render(data) {
  const biCol = (title, bi) => `
    <div class="col"><h3>${esc(title)}</h3>${bi.map((p) =>
      `<div class="seg"><div class="en">${esc(p?.en || "")}</div><div class="zh">${esc(p?.zh || "")}</div></div>`).join("")}</div>`;
  const srcCol = (title, lines) => `
    <div class="col"><h3>${esc(title)}</h3>${lines.map((l) =>
      `<div class="seg"><div class="src">${esc(l)}</div></div>`).join("")}</div>`;
  const oChecks = termCheck(data.openai.src.join(" "));
  const gChecks = termCheck(data.gemini.src.join(" "));
  const html = `<!doctype html><meta charset="utf-8"><title>OpenAI vs Gemini — DD_Clip</title>
<style>
  body{font:15px/1.6 -apple-system,BlinkMacSystemFont,"Noto Sans TC",sans-serif;margin:0;background:#0b0d10;color:#eef2f6}
  header{padding:18px 24px;border-bottom:1px solid #222a31}
  h1{font-size:18px;margin:0 0 6px} .meta{color:#8c98a4;font-size:13px}
  .meta b{color:#cfd8e0}
  .cols{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#222a31}
  .col{background:#0e1216;padding:16px 18px} .col h3{position:sticky;top:0;background:#0e1216;margin:0 0 10px;padding:6px 0;font-size:14px;color:#4c8dff}
  .col:nth-child(2) h3{color:#37d39b}
  .seg{margin:0 0 14px;padding-bottom:10px;border-bottom:1px dashed #1c242b}
  .src{color:#8c98a4;font-size:13px} .en{color:#9fb3c8;font-size:13px} .zh{font-weight:600;margin-top:3px}
  table{border-collapse:collapse;margin:8px 24px 24px;font-size:13px}
  td,th{border:1px solid #222a31;padding:5px 10px;text-align:center} td:first-child{text-align:left;color:#cfd8e0}
  .hit{color:#37d39b;font-weight:700} .miss{color:#55606a}
  .tabs{display:flex;gap:8px;padding:10px 24px}
  .tabs button{background:#14181d;border:1px solid #222a31;color:#eef2f6;border-radius:8px;padding:6px 12px;cursor:pointer}
  .tabs button.on{border-color:#4c8dff;color:#4c8dff}
  section{display:none} section.on{display:block}
</style>
<header>
  <h1>OpenAI vs Gemini — live-caption comparison</h1>
  <div class="meta">
    Clip: <b>DD_Clip.mp4</b> · ${data.duration} · ${esc(data.srcLang)} · output: <b>bilingual (EN + 繁中)</b><br>
    OpenAI: <b>${OPENAI_STT}</b> + <b>${OPENAI_MT}</b> · Gemini: <b>${esc(data.geminiModel)}</b> · glossary terms: <b>${GLOSSARY.length}</b>
  </div>
</header>
<div class="tabs">
  <button class="on" onclick="show(0,this)">Bilingual captions (EN + 中文)</button>
  <button onclick="show(1,this)">Source transcripts (STT)</button>
  <button onclick="show(2,this)">Glossary term check</button>
</div>
<section class="on"><div class="cols">
  ${biCol("OpenAI", data.openai.bi)}
  ${biCol("Gemini", data.gemini.bi)}
</div></section>
<section><div class="cols">
  ${srcCol("OpenAI — " + OPENAI_STT, data.openai.src)}
  ${srcCol("Gemini — " + esc(data.geminiModel), data.gemini.src)}
</div></section>
<section><table><tr><th>Term (expected)</th><th>OpenAI heard</th><th>Gemini heard</th></tr>
  ${oChecks.map((c, i) => `<tr><td>${esc(c.term)} → ${esc(c.want)}</td><td class="${c.hit?"hit":"miss"}">${c.hit?"✓":"·"}</td><td class="${gChecks[i].hit?"hit":"miss"}">${gChecks[i].hit?"✓":"·"}</td></tr>`).join("")}
</table></section>
<script>function show(i,b){document.querySelectorAll('section').forEach((s,k)=>s.classList.toggle('on',k===i));document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');}</script>`;
  await writeFile(join(OUT, "compare-report.html"), html);
}

// ---- main ----
async function main() {
  if (!OPENAI_KEY || !GEMINI_KEY) throw new Error("Missing keys in ~/.config/ddtw/keys.env");
  await mkdir(OUT, { recursive: true });
  await geminiPickModel();
  const renderOnly = process.argv.includes("--render");

  let oEn, gEn;
  if (renderOnly) {
    oEn = await readFile(join(OUT, "openai.src.txt"), "utf8");
    gEn = await readFile(join(OUT, "gemini.src.txt"), "utf8");
  } else {
    [oEn, gEn] = await Promise.all([openaiTranscribe(), geminiTranscribe()]);
    await writeFile(join(OUT, "openai.src.txt"), oEn);
    await writeFile(join(OUT, "gemini.src.txt"), gEn);
    log("transcription done.");
  }

  const srcLang = cjkRatio(oEn + gEn) > 0.3 ? "Mandarin-dominant (bilingual)" : "English-dominant (bilingual)";
  log(`source: ${srcLang}; producing bilingual EN + zh-TW captions`);

  const oLines = segment(oEn), gLines = segment(gEn);
  log(`segments: openai ${oLines.length}, gemini ${gLines.length}`);

  const [oBi, gBi] = await Promise.all([
    translateAll("openai", oLines),
    translateAll("gemini", gLines),
  ]);
  await writeFile(join(OUT, "openai.bi.json"), JSON.stringify(oBi, null, 2));
  await writeFile(join(OUT, "gemini.bi.json"), JSON.stringify(gBi, null, 2));

  await render({
    duration: "~12m15s", srcLang, geminiModel,
    openai: { src: oLines, bi: oBi },
    gemini: { src: gLines, bi: gBi },
  });
  log("report -> out/compare-report.html");
}

main().catch((e) => { console.error(e); process.exit(1); });
