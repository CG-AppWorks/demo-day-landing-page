// ai.js — server-side STT + glossary-aware bilingual translation.
// Keys live in env (Worker secrets); the browser never sees them.

import { glossaryForPrompt } from "./glossary.js";

const GEMINI_STT_MODEL = "gemini-2.5-flash";
const GEMINI_MT_MODEL = "gemini-2.5-flash";
const OPENAI_STT_MODEL = "gpt-4o-transcribe";
const OPENAI_MT_MODEL = "gpt-4o-mini";

function bilingualSystemPrompt(extraTerms) {
  return [
    "You caption a bilingual startup Demo Day in Taipei for a MIXED audience (Mandarin + English).",
    "For the given caption line, output BOTH:",
    '  - "en": a natural, concise English caption.',
    '  - "zh": Traditional Chinese as used in Taiwan (繁體中文，台灣慣用語).',
    "If the line is already in one language, keep that side faithful and translate the other.",
    "Taiwan vocabulary ONLY in zh: 軟體 not 软件, 網路 not 网络, 影片 not 视频, 新創 not 初创, 人工智慧/AI not 人工智能.",
    "Proper nouns must be rendered exactly; 'keep as' means leave in English (in BOTH en and zh):",
    glossaryForPrompt(),
    extraTerms ? "Speaker-specific terms for this segment:\n" + extraTerms : "",
    "Keep numbers, currencies, units exact. Output ONLY the caption.",
  ].filter(Boolean).join("\n");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Gemini flash models throw transient 429/503 under load — retry with backoff.
async function geminiFetch(url, init, tries = 4) {
  for (let a = 0; a < tries; a++) {
    const r = await fetch(url, init);
    if (r.ok || ![429, 500, 503].includes(r.status) || a === tries - 1) return r;
    await sleep(700 * (a + 1));
  }
}

function bytesToBase64(bytes) {
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

// ---- STT ----
async function sttOpenAI(env, blob) {
  const fd = new FormData();
  fd.append("file", blob, "chunk.wav");
  fd.append("model", OPENAI_STT_MODEL);
  fd.append("response_format", "json");
  const r = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST", headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}` }, body: fd,
  });
  if (!r.ok) throw new Error(`OpenAI STT ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return ((await r.json()).text || "").trim();
}

async function sttGemini(env, bytes, mime) {
  const body = {
    contents: [{ parts: [
      { inline_data: { mime_type: mime || "audio/wav", data: bytesToBase64(bytes) } },
      { text: "Transcribe this audio verbatim in the language spoken. Output ONLY the transcript text — no labels, no commentary. If there is no clear speech, output nothing." },
    ] }],
  };
  const r = await geminiFetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_STT_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`Gemini STT ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  return (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
}

// ---- bilingual translation of a single caption line ----
async function translateOpenAI(env, text, ctx, extraTerms) {
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OPENAI_MT_MODEL, temperature: 0.2,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "caption", strict: true,
          schema: { type: "object", additionalProperties: false, required: ["en", "zh"],
            properties: { en: { type: "string" }, zh: { type: "string" } } },
        },
      },
      messages: [
        { role: "system", content: bilingualSystemPrompt(extraTerms) },
        { role: "user", content: (ctx ? `Recent context:\n${ctx}\n\n` : "") + `Caption this line:\n${text}` },
      ],
    }),
  });
  if (!r.ok) throw new Error(`OpenAI MT ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return JSON.parse((await r.json()).choices[0].message.content);
}

async function translateGemini(env, text, ctx, extraTerms) {
  const r = await geminiFetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MT_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: bilingualSystemPrompt(extraTerms) }] },
      contents: [{ parts: [{ text: (ctx ? `Recent context:\n${ctx}\n\n` : "") + `Caption this line:\n${text}` }] }],
      generationConfig: {
        temperature: 0.2, responseMimeType: "application/json",
        responseSchema: { type: "OBJECT", required: ["en", "zh"], properties: { en: { type: "STRING" }, zh: { type: "STRING" } } },
      },
    }),
  });
  if (!r.ok) throw new Error(`Gemini MT ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  const txt = (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
  return JSON.parse(txt);
}

// One audio chunk -> {transcript, en, zh} for the given engine.
export async function captionChunk(env, engine, blob, bytes, mime, ctx, extraTerms) {
  const transcript = engine === "gemini" ? await sttGemini(env, bytes, mime) : await sttOpenAI(env, blob);
  if (!transcript) return { transcript: "", en: "", zh: "" };
  const pair = engine === "gemini"
    ? await translateGemini(env, transcript, ctx, extraTerms)
    : await translateOpenAI(env, transcript, ctx, extraTerms);
  return { transcript, en: pair.en || "", zh: pair.zh || "" };
}

// Text-only bilingual translate (for /api/translate testing + reuse).
export async function translateText(env, engine, text, ctx, extraTerms) {
  return engine === "gemini"
    ? translateGemini(env, text, ctx, extraTerms)
    : translateOpenAI(env, text, ctx, extraTerms);
}
