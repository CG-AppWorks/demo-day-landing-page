// ai.js — server-side STT + glossary-aware bilingual translation.
// Keys live in env (Worker secrets); the browser never sees them.

import { glossaryForPrompt } from "./glossary.js";

const GEMINI_STT_MODEL = "gemini-3.5-flash"; // faster than 2.5-flash for transcription (~1.4s vs ~2.5s) and accurate
const GEMINI_MT_MODEL = "gemini-3.5-flash"; // 3.5 gives the better glossary recovery (matches the compare run)
const OPENAI_STT_MODEL = "gpt-4o-transcribe";
const OPENAI_MT_MODEL = "gpt-4o-mini";

function bilingualSystemPrompt(extraTerms, lang) {
  const ja = lang === "ja"; // secondary language: Japanese (Tokyo) vs the default zh-TW
  return [
    `You caption a bilingual startup pitch event for a MIXED audience (${ja ? "Japanese + English" : "Mandarin + English"}).`,
    "For the given caption line, output BOTH:",
    '  - "en": a natural, concise English caption.',
    ja
      ? '  - "zh": a natural Japanese (日本語) caption — this field carries the Japanese translation.'
      : '  - "zh": Traditional Chinese as used in Taiwan (繁體中文，台灣慣用語).',
    "If the line is already in one language, keep that side faithful and translate the other.",
    ja
      ? "Use natural spoken Japanese (敬体/丁寧). Keep brand/product names and acronyms in their original form."
      : "Taiwan vocabulary ONLY in zh: 軟體 not 软件, 網路 not 网络, 影片 not 视频, 新創 not 初创, 人工智慧/AI not 人工智能.",
    "Proper nouns must be rendered exactly; 'keep as' means leave in English (in BOTH en and zh):",
    glossaryForPrompt(),
    extraTerms ? "Speaker-specific terms for this segment:\n" + extraTerms : "",
    "Keep numbers, currencies, units exact. Output ONLY the caption.",
  ].filter(Boolean).join("\n");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- hallucination filter ----------------------------------------------
// STT models (Whisper-family + Gemini) "complete" silence/noise with plausible
// boilerplate instead of returning nothing. We drop those phantom lines so they
// never reach a viewer. Matched on a normalized form: lowercased, with all
// whitespace + ASCII/CJK punctuation/symbols stripped.
function normPhantom(s) {
  return (s || "").toLowerCase().replace(/[\s\p{P}\p{S}]/gu, "");
}
// Whole-line generic phantoms — the classic things STT invents on silence.
// Dropped only when they ARE the entire line (a real talk rarely is just these).
const PHANTOM_EXACT = [
  "thankyou", "thankyouverymuch", "thanksforwatching", "thankyouforwatching",
  "pleasesubscribe", "pleasesubscribeandlike", "謝謝大家", "謝謝觀看",
  "謝謝收看", "謝謝大家的收看", "請訂閱", "請訂閱我的頻道", "我們下次再見",
];
// Substrings that only ever appear in hallucinated/caption-artifact text —
// includes the event welcome-line phantom the model keeps inventing here.
const PHANTOM_CONTAINS = [
  "展示區域內最具潛力", "最具潛力的新創公司", "歡迎來到appworksdemoday",
  "welcometoappworksdemoday", "showcasethemostpromisingstartups",
  "字幕由", "字幕志願者", "請不吝點贊", "點贊訂閱", "明鏡與點點", "轉發打賞",
  "subscribetomychannel", "amaraorg", "transcribedby", "captionsby",
  // walk-up hype-music lyrics / crowd cheering / promo-video phantoms seen in testing
  "老虎般", "在烈火中起舞", "我是個贏家", "我是個戰士", "兄弟們加油",
  "irx的創辦人", "farhan",
];
// [music] / (applause) / 【掌聲】 style non-speech markers.
const PHANTOM_MARKER = /^[\[\(（【].{0,14}(music|音樂|音乐|掌聲|掌声|applause|laughter|笑聲|noise|背景音)/iu;

function looksLikeHallucination(text) {
  const t = (text || "").trim();
  if (!t) return true;
  if (!/\p{L}/u.test(t)) return true;                        // no letters: timecodes (00:00), bare numbers, punctuation
  const n = normPhantom(t);
  if (n.length < 2) return true;                              // punctuation/symbol only
  if (PHANTOM_MARKER.test(t)) return true;                   // [music] / (applause)
  if (PHANTOM_EXACT.includes(n)) return true;                // whole-line generic phantom
  if (PHANTOM_CONTAINS.some((p) => n.includes(p))) return true;
  if (/(.{2,12})\1{4,}/u.test(n)) return true;               // looped repetition hallucination
  return false;
}

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
    generationConfig: { thinkingConfig: { thinkingBudget: 0 } }, // ~5x faster; no reasoning needed for STT
  };
  const r = await geminiFetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_STT_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`Gemini STT ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  return (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("").trim();
}

// ---- bilingual translation of a single caption line ----
async function translateOpenAI(env, text, ctx, extraTerms, lang) {
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
        { role: "system", content: bilingualSystemPrompt(extraTerms, lang) },
        { role: "user", content: (ctx ? `Recent context:\n${ctx}\n\n` : "") + `Caption this line:\n${text}` },
      ],
    }),
  });
  if (!r.ok) throw new Error(`OpenAI MT ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return JSON.parse((await r.json()).choices[0].message.content);
}

async function translateGemini(env, text, ctx, extraTerms, lang) {
  const r = await geminiFetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MT_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: bilingualSystemPrompt(extraTerms, lang) }] },
      contents: [{ parts: [{ text: (ctx ? `Recent context:\n${ctx}\n\n` : "") + `Caption this line:\n${text}` }] }],
      generationConfig: {
        temperature: 0.2, responseMimeType: "application/json",
        responseSchema: { type: "OBJECT", required: ["en", "zh"], properties: { en: { type: "STRING" }, zh: { type: "STRING" } } },
        thinkingConfig: { thinkingBudget: 0 }, // disable internal reasoning — ~5x lower latency for live captions
      },
    }),
  });
  if (!r.ok) throw new Error(`Gemini MT ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const j = await r.json();
  const txt = (j.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
  return JSON.parse(txt);
}

// One audio chunk -> {transcript, en, zh} for the given engine.
export async function captionChunk(env, engine, blob, bytes, mime, ctx, extraTerms, lang) {
  const transcript = engine === "gemini" ? await sttGemini(env, bytes, mime) : await sttOpenAI(env, blob);
  // Drop phantom transcripts before spending a translation call on them.
  if (!transcript || looksLikeHallucination(transcript)) return { transcript: "", en: "", zh: "" };
  const pair = engine === "gemini"
    ? await translateGemini(env, transcript, ctx, extraTerms, lang)
    : await translateOpenAI(env, transcript, ctx, extraTerms, lang);
  // Belt-and-braces: also drop if the rendered caption is a known phantom.
  if (looksLikeHallucination(pair.en) || looksLikeHallucination(pair.zh)) return { transcript: "", en: "", zh: "" };
  return { transcript, en: pair.en || "", zh: pair.zh || "" };
}

// Text-only bilingual translate (for /api/translate testing + reuse).
export async function translateText(env, engine, text, ctx, extraTerms, lang) {
  return engine === "gemini"
    ? translateGemini(env, text, ctx, extraTerms, lang)
    : translateOpenAI(env, text, ctx, extraTerms, lang);
}
