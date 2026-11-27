// context.js — operator-managed caption context (Backstage → "Caption context").
//
// What the AI reads before it captions a line:
//   general.instructions  free-text style notes ("keep zh short", "say 新創 not 初創", …)
//   general.glossary      one term per line: "English = 中文", "Name = keep", or a bare
//                         "Name" (= keep in English); anything after "#" is a note
//   teams[id]             { label, script } — each team's pitch script
//   onStage               team id whose script is used right now ("" = none)
//
// Stored in the CaptionHub Durable Object (strongly consistent, read on every
// caption call); this module only validates and shapes it.

export const LIMITS = { instructions: 4000, glossary: 20000, label: 300, script: 15000, id: 40 };

const str = (v, max) => String(v == null ? "" : v).replace(/\r\n?/g, "\n").slice(0, max);
export const cleanId = (v) => (/^[a-z0-9_-]{1,40}$/.test(String(v || "")) ? String(v) : "");

export function cleanGeneral(g) {
  return {
    instructions: str(g && g.instructions, LIMITS.instructions).trim(),
    glossary: str(g && g.glossary, LIMITS.glossary).trim(),
  };
}

export function cleanTeam(t) {
  return { label: str(t && t.label, LIMITS.label).trim(), script: str(t && t.script, LIMITS.script).trim() };
}
