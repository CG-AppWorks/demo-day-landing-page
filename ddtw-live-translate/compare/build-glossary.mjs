// build-glossary.mjs — turn speaker pitch scripts into a DYNAMIC glossary.
//
// For each script in scripts/<teamId>.txt, an LLM extracts the proper nouns,
// product/person names, acronyms and jargon a STT/translator is likely to get
// wrong, with their preferred English + zh-TW (Taiwan) renderings, plus a
// one-line context blurb. Output: out/glossary-dynamic.json, keyed by team.
//
// At event time the live system loads the active team's terms (keyed to the
// backstage "currently-pitching team") into BOTH the STT keyword hint and the
// translation prompt. See README.
//
// Usage:  node build-glossary.mjs            # process every scripts/*.txt
//         node build-glossary.mjs aliena     # just one team

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const SCRIPTS_DIR = "scripts";
const OUT = "out";
const MODEL = "gpt-4o";

function loadKeys() {
  const p = join(homedir(), ".config/ddtw/keys.env");
  const env = {};
  const text = existsSync(p) ? readFileSync(p, "utf8") : "";
  for (const line of text.split("\n")) { const m = line.match(/^([A-Z_]+)=(.*)$/); if (m) env[m[1]] = m[2].trim(); }
  return env;
}
const OPENAI_KEY = loadKeys().OPENAI_API_KEY;
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

const SYS = [
  "You build a glossary for a live bilingual (English + Traditional Chinese, Taiwan usage) caption system at a startup Demo Day in Taipei.",
  "From the speaker's pitch script, extract EVERY term a speech-to-text engine or translator is likely to get wrong or render inconsistently:",
  "company names, product names, person names, acronyms, and domain-specific jargon.",
  "For each term provide:",
  '  - "en": the exact English form as it should appear,',
  '  - "zh": the Traditional Chinese (Taiwan) rendering, OR the literal string "KEEP" if it must stay in English (brand/person names usually KEEP),',
  '  - "note": optional short disambiguation (e.g. likely mis-hearings to guard against).',
  "Taiwan vocabulary only in zh (軟體 not 软件, 網路 not 网络, 人工智慧 not 人工智能).",
  'Also write "blurb": a one-sentence English description of the company (used as context for the translator).',
  "Only include terms that genuinely risk mistranslation — skip common words. Return JSON.",
].join("\n");

const SCHEMA = {
  type: "object", additionalProperties: false, required: ["blurb", "terms"],
  properties: {
    blurb: { type: "string" },
    terms: {
      type: "array",
      items: {
        type: "object", additionalProperties: false, required: ["en", "zh", "note"],
        properties: { en: { type: "string" }, zh: { type: "string" }, note: { type: "string" } },
      },
    },
  },
};

async function extract(team, text) {
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${OPENAI_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL, temperature: 0,
      response_format: { type: "json_schema", json_schema: { name: "glossary", strict: true, schema: SCHEMA } },
      messages: [{ role: "system", content: SYS }, { role: "user", content: `Team: ${team}\n\nScript:\n${text}` }],
    }),
  });
  if (!r.ok) throw new Error(`OpenAI ${r.status}: ${await r.text()}`);
  return JSON.parse((await r.json()).choices[0].message.content);
}

async function main() {
  if (!OPENAI_KEY) throw new Error("Missing OPENAI_API_KEY in ~/.config/ddtw/keys.env");
  if (!existsSync(SCRIPTS_DIR)) throw new Error(`No ${SCRIPTS_DIR}/ directory — add one <teamId>.txt per pitch script.`);
  await mkdir(OUT, { recursive: true });

  const only = process.argv[2];
  let files = (await readdir(SCRIPTS_DIR)).filter((f) => /\.(txt|md)$/i.test(f));
  if (only) files = files.filter((f) => f.replace(/\.(txt|md)$/i, "") === only);
  if (!files.length) throw new Error("No matching scripts found.");

  const dynamic = {};
  for (const f of files) {
    const team = f.replace(/\.(txt|md)$/i, "");
    const text = await readFile(join(SCRIPTS_DIR, f), "utf8");
    log(`extracting ${team} (${text.length} chars) …`);
    const g = await extract(team, text);
    dynamic[team] = g;
    log(`  ${g.terms.length} terms · ${g.blurb}`);
  }

  await writeFile(join(OUT, "glossary-dynamic.json"), JSON.stringify(dynamic, null, 2));
  const total = Object.values(dynamic).reduce((n, g) => n + g.terms.length, 0);
  log(`done: ${Object.keys(dynamic).length} teams, ${total} terms -> out/glossary-dynamic.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
