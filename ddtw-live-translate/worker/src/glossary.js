// glossary.js — proper-noun + terminology control for EN -> zh-TW translation.
// { en, zh }  where zh === "KEEP" means leave the term in English.
// Seeded from demoday-live-translation-spec.md §2.5 + the #32/#10 team data.
// This is the same file the Worker's /api/translate will load in step 3.

export const GLOSSARY = [
  // --- core event / org names ---
  { en: "AppWorks",   zh: "KEEP", note: "never 'Apple Works' / 'AirPods' / '蘋果'" },
  { en: "Wistron",    zh: "緯創", note: "緯創資通" },
  { en: "Demo Day",   zh: "Demo Day", note: "keep in English" },
  { en: "Phison",     zh: "群聯",  note: "群聯電子; KS Pua's company" },
  { en: "KS Pua",     zh: "KEEP", note: "Phison chairman & CEO (潘健成)" },

  // --- terminology: Taiwan usage (zh-TW), not PRC ---
  { en: "accelerator",  zh: "加速器" },
  { en: "fundraising",  zh: "募資" },
  { en: "startup",      zh: "新創",   note: "NOT 初创/创业公司 (PRC usage)" },
  { en: "software",     zh: "軟體",   note: "NOT 软件" },
  { en: "network",      zh: "網路",   note: "NOT 网络" },
  { en: "video",        zh: "影片",   note: "NOT 视频" },
  { en: "AI",           zh: "AI",     note: "or 人工智慧, NOT 人工智能" },
  { en: "founder",      zh: "創辦人",  note: "NOT 创始人" },
  { en: "valuation",    zh: "估值" },
  { en: "round",        zh: "輪",     note: "as in funding round, e.g. A 輪" },

  // --- #32 startups (keep English company names) ---
  { en: "NOTAG KOREA",  zh: "KEEP" },
  { en: "Notifly",      zh: "KEEP" },
  { en: "Krush",        zh: "KEEP" },
  { en: "Innowave Tech",zh: "KEEP" },
  { en: "LIPS",         zh: "KEEP" },
  { en: "Shieldbase",   zh: "KEEP" },
  { en: "OmniEase AI",  zh: "KEEP" },
  { en: "Pathors",      zh: "KEEP" },
  { en: "Rosary Labs",  zh: "KEEP" },
  { en: "Novo AI",      zh: "KEEP" },
  { en: "Hyarks",       zh: "KEEP" },
  { en: "Arrivl",       zh: "KEEP" },
  { en: "Decisions Lab",zh: "KEEP" },
  { en: "SixSense",     zh: "KEEP" },
  { en: "Refundy",      zh: "KEEP" },

  // --- Wistron #10 startups ---
  { en: "Phasetrum",    zh: "KEEP" },
  { en: "Ruomei",       zh: "KEEP" },
  { en: "GreenBidz",    zh: "KEEP" },
  { en: "CloudStation", zh: "KEEP" },

  // --- presenters (keep names in English) ---
  { en: "Aiden Ung Choi",     zh: "KEEP" },
  { en: "Minyong Lee",        zh: "KEEP" },
  { en: "Stephen Moon",       zh: "KEEP" },
  { en: "Jinsong Xu",         zh: "KEEP" },
  { en: "Luke Liu",           zh: "KEEP" },
  { en: "Diego Rojas",        zh: "KEEP" },
  { en: "Sebastian Wijaya",   zh: "KEEP" },
  { en: "Yu-Chieh Cheng",     zh: "KEEP" },
  { en: "May Law",            zh: "KEEP" },
  { en: "Julien Condamines",  zh: "KEEP" },
  { en: "Juan Herrero Valero",zh: "KEEP" },
  { en: "Ryan Chen",          zh: "KEEP" },
  { en: "Louis Cheung",       zh: "KEEP" },
  { en: "Akanksha Jagwani",   zh: "KEEP" },
  { en: "Jaekyeum Kim",       zh: "KEEP" },
  { en: "Wayne Tsai",         zh: "KEEP" },
  { en: "Owen Lee",           zh: "KEEP" },
  { en: "Jerry Yiu",          zh: "KEEP" },
  { en: "Oumnya Benhassou",   zh: "KEEP" },
];

// Render the glossary block for the translation system prompt.
export function glossaryForPrompt() {
  return GLOSSARY.map((g) =>
    g.zh === "KEEP"
      ? `- "${g.en}" -> keep as "${g.en}"${g.note ? ` (${g.note})` : ""}`
      : `- "${g.en}" -> "${g.zh}"${g.note ? ` (${g.note})` : ""}`
  ).join("\n");
}
