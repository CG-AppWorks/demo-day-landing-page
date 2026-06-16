// data.js — Demo Day team directory + supporting data
// DD#32 Taiwan lineup — source: Airtable "Company-Grid view" CSV, rows where DD TW = Yes.
//   15 AppWorks Accelerator #32 teams + 4 Wistron Accelerator #10 (placeholder — not in the AW table).
// Pitch order: CLIKA pitches 4th (per organizer); the rest are provisional.
// Languages: Mandarin pitches are flagged; English pitches default.
const TEAMS = [
  // ─── AppWorks Accelerator #32 ─ 14 teams (DD TW = Yes) ───
  { id:"notag", linkedin:"https://www.linkedin.com/in/aiden-ung-choi-6672b94a/",        order:1,  name:"NOTAG KOREA",      sub:"AI trading for e-commerce export",                       tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"SEA · KR",  hq:"KR", language:"English",  presenter:"Aiden Ung Choi",        title:"Founder",            email:"aiden0808@notaggroup.com",  website:"https://www.notaggroup.com/", speakerOrder:1,
    pitch:"AI trading firm automating multi-country, multi-channel and multi-brand e-commerce export logistics and distribution." },
  { id:"notifly", linkedin:"https://www.linkedin.com/in/minyong-lee/",      order:2,  name:"Notifly",          sub:"AI-native marketing automation",                          tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"KR · JP · TW", hq:"KR", language:"English",  presenter:"Minyong Lee",           title:"Founder & CEO",      email:"minyong@clix.so",           website:"https://clix.so/",            speakerOrder:2,
    pitch:"AI-native marketing automation for Asia's mobile-app and commerce businesses." },
  { id:"krush", linkedin:"https://www.linkedin.com/in/stephenkyungshinmoon/",        order:3,  name:"Krush",            sub:"Social & dating for the global Asian community",          tags:["AI"],                  batch:"AW#32", stage:"Pitching", market:"US · APAC", hq:"US", language:"English",  presenter:"Stephen Moon",          title:"Founder & CEO",      email:"stephen.moon@curelation.co", website:"https://www.krushdating.co", speakerOrder:3,
    pitch:"Dating and social platform connecting the global Asian community through cultural matching, offline events, and cross-border interactions." },
  { id:"innowave", linkedin:"https://www.linkedin.com/in/jinsong-xu-6ab5901b2/",     order:4,  name:"Innowave Tech",    sub:"Agentic AI for semiconductor manufacturing",              tags:["AI","Manufacturing"],  batch:"AW#32", stage:"Pitching", market:"Global",   hq:"SG", language:"Mandarin", presenter:"Jinsong Xu",            title:"Founder & CEO",      email:"jinsong.xu@innowave.com.sg", website:"https://www.innowave.com.sg", speakerOrder:4,
    pitch:"Agentic AI for semiconductor and advanced manufacturing — driving factory autonomy." },
  { id:"clika", linkedin:"https://www.linkedin.com/in/nayulkim", order:5,  name:"CLIKA",            sub:"Model compression & compilation for edge AI",             tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"US · KR",  hq:"US", language:"English",  presenter:"Nayul Kim",             title:"Co-Founder & CEO",   email:"nayul@clika.io",            website:"https://www.clika.io/",       speakerOrder:5,
    pitch:"Model compression and compilation that shrinks AI models to run efficiently on edge devices." },
  { id:"lips", linkedin:"https://www.linkedin.com/in/luke-liu-b301063b/",         order:6,  name:"LIPS",             sub:"Robotics vision & edge AI",                               tags:["AI","Manufacturing"],  batch:"AW#32", stage:"Pitching", market:"Global",   hq:"TW", language:"Mandarin", presenter:"Luke Liu",              title:"Founder",            email:"lukeliu@lips-hci.com",      website:"https://www.lips-hci.com",    speakerOrder:6,
    pitch:"Robotics vision platform and edge-AI solution provider." },
  { id:"shieldbase", linkedin:"https://www.linkedin.com/in/diegolrojas",   order:7,  name:"Shieldbase",       sub:"Secure enterprise AI OS",                                  tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"SEA",      hq:"SG", language:"English",  presenter:"Diego Rojas",           title:"Founder & CEO",      email:"diego@shieldbase.ai",       website:"https://shieldbase.ai",       speakerOrder:7,
    pitch:"Secure enterprise AI OS unifying knowledge and systems to power agents and workflows." },
  { id:"omniease", linkedin:"https://www.linkedin.com/in/sebawija",     order:8,  name:"OmniEase AI",      sub:"AI for trade compliance & customs",                       tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"SEA · US", hq:"SG", language:"English",  presenter:"Sebastian Wijaya",      title:"Founder & CEO",      email:"sebastian@omniease.ai",     website:"https://www.omniease.ai",     speakerOrder:8,
    pitch:"Agentic AI for global trade compliance and customs automation." },
  { id:"pathors", linkedin:"https://www.linkedin.com/in/brandonlu0924",      order:9,  name:"Pathors",          sub:"Voice AI for phone interactions",                          tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"TW · US",  hq:"TW", language:"Mandarin", presenter:"Brandon Lu",        title:"Co-founder & COO",   email:"brandon@pathors.com",       website:"https://pathors.com/",        speakerOrder:9,
    pitch:"Transforming complex phone interactions into guided, verifiable Voice AI workflows." },
  { id:"sixsense", linkedin:"https://www.linkedin.com/in/akanksha-jagwani-a7489041",     order:10, name:"SixSense",         sub:"AI quality control for manufacturing",                     tags:["AI","Manufacturing"],  batch:"AW#32", stage:"Pitching", market:"SG · TW · US", hq:"SG", language:"English",  presenter:"Akanksha Jagwani",      title:"Co-Founder & CEO",   email:"akanksha@sixsense.ai",      website:"https://www.sixsense.ai",     speakerOrder:10,
    pitch:"AI manufacturing platform automating defect inspection and predictive quality control to lift yield and cycle time for semiconductor and advanced manufacturing lines." },
  { id:"rosary", linkedin:"https://www.linkedin.com/in/may-law/",       order:11,  name:"Rosary Labs",      sub:"AI agents for AEC workflows",                              tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"MY",       hq:"MY", language:"Mandarin", presenter:"May Law",               title:"Co-Founder",         email:"may@rosarylabs.ai",         website:"https://www.rosarylabs.ai",   speakerOrder:11,
    pitch:"AI agents that automate workflows across PDF, CAD, and BIM for the Architecture, Engineering & Construction (AEC) industry." },
  { id:"novo", linkedin:"https://www.linkedin.com/in/juliencondamines/",         order:12, name:"Novo AI",          sub:"AI claims processing for insurance",                       tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"APAC · EU", hq:"HK", language:"English",  presenter:"Julien Condamines",         title:"Co-Founder & CEO",   email:"julien@heynovo.ai",         website:"https://heynovo.ai",          speakerOrder:12,
    pitch:"AI claim-processing automation and abuse prevention for insurance companies." },
  { id:"hyarks", linkedin:"https://www.linkedin.com/in/jhvalero/",       order:13, name:"Hyarks",           sub:"Robotics for the marine industry",                         tags:["Dual-Use"],            batch:"AW#32", stage:"Pitching", market:"Global",   hq:"TW", language:"English",  presenter:"Juan Herrero Valero",   title:"Founder & CEO",      email:"juan.herrero@hyarks.com",   website:"https://www.hyarks.com/",     speakerOrder:13,
    pitch:"Multi-domain robotic solutions to make the maritime ecosystem safe, sustainable and accessible — built for ports, coast guards, oil & gas and navies." },
  { id:"arrivl", linkedin:"https://www.linkedin.com/in/ryanchen056/",       order:14, name:"Arrivl",           sub:"AI visibility & agent-driven sales",                      tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"US · EU · UK", hq:"US", language:"Mandarin", presenter:"Ryan Chen",             title:"Co-Founder & CEO",   email:"ryan@auragtm.com",          website:"https://arrivl.ai/",          speakerOrder:14,
    pitch:"A tool for making your content more visible to AI agents — and converting agent visits into sales." },
  { id:"decisionslab", linkedin:"https://www.linkedin.com/in/louis-dlb11/", order:15, name:"Decisions Lab",    sub:"Persona-simulating AI for B2B sales",                      tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"HK · US",  hq:"HK", language:"English",  presenter:"Louis Cheung",          title:"Co-Founder & CEO",   email:"louis@decisionslab.io",     website:"https://www.decisionslab.io", speakerOrder:15,
    pitch:"Persona-simulating AI for B2B sales teams to predict each prospect's reaction before you send outreach." },

  // ─── Wistron Accelerator #10 ─ placeholder teams (not in the AppWorks CSV — confirm real lineup) ───
  { id:"phasetrum", linkedin:"https://www.linkedin.com/in/wayne-tsai-5536a067", order:1, name:"Phasetrum", sub:"Phased-array RF chips for satellites", tags:["Dual-Use","Manufacturing"], batch:"WA#10", stage:"Pitching", market:"Global", hq:"TW", language:"Mandarin", presenter:"Wayne Tsai", title:"Founder & CEO", email:"wayne@phasetrum.com", website:"https://phasetrum.com", speakerOrder:1,
    pitch:"AIP + patented Phase Tuner architecture for phased-array antennas — 99% yield, 50% less power, 10× faster calibration for LEO satellite, AESA radar and 6G." },
  { id:"ruomei", linkedin:"https://tw.linkedin.com/in/owen-lee-74808534", order:2, name:"Ruomei", sub:"Nano thermal-management materials", tags:["Manufacturing"], batch:"WA#10", stage:"Pitching", market:"Global", hq:"TW", language:"Mandarin", presenter:"Owen Lee", title:"Founder & CEO", email:"jackylin@ruomei.com.tw", website:"https://ruomei.com.tw/", speakerOrder:2,
    pitch:"Nano-scale thermal solder mask + microchannel cooling that drop in to existing SMT lines, cutting AI-chip temperatures with zero process change — 'aluminum-for-copper' lightweighting." },
  { id:"greenbidz", linkedin:"https://www.linkedin.com/in/yiu-che-wei-143795209/", order:3, name:"GreenBidz", sub:"Circular-asset marketplace & ESG", tags:["AI","Enterprise"], batch:"WA#10", stage:"Pitching", market:"Asia", hq:"TW", language:"Mandarin", presenter:"Jerry Yiu", title:"Founder & CEO", email:"jyiu@greenbidz.com", website:"https://greenbidz.com", speakerOrder:3,
    pitch:"SaaS-enabled B2B marketplace that helps factories recover value from surplus equipment while auto-capturing the CO₂ and lifecycle data enterprises need for ESG reporting." },
  { id:"cloudstation", linkedin:"https://www.linkedin.com/in/oumnyabenhassou/", order:4, name:"CloudStation", sub:"Deploy apps & AI agents to any cloud", tags:["AI","Enterprise"], batch:"WA#10", stage:"Pitching", market:"Global", hq:"FR", language:"English", presenter:"Oumnya Benhassou", title:"Co-Founder & CEO", email:"oumnya@cloud-station.io", website:"https://cloud-station.io", speakerOrder:4,
    pitch:"A no-code, multi-cloud platform that lets non-technical founders deploy apps, databases and autonomous AI agents — 'the technical co-founder you don't give equity to.'" },
];

const AGENDA = [
  { t:"12:00–13:00", title:"Registration",                             tag:"Lobby · 5F",  now:false },
  { t:"13:00–13:20", title:"Opening",              tag:"Keynote",     now:false },
  { t:"13:20–14:00", title:"AppWorks #32 Startups Demo · 15 teams",    tag:"Pitches",     now:true  },
  { t:"14:00–14:30", title:"Wistron #10 Startups Demo · 4 teams",   tag:"Pitches",     now:false },
  { t:"14:30–16:30", title:"Open Floor & Cocktail Networking",         tag:"Networking",  now:false, wide:true },
];

const TABS = [
  { id:"teams",    label:"Teams" },
  { id:"agenda",   label:"Agenda" },
  { id:"about",    label:"About" },
];

Object.assign(window, { TEAMS, AGENDA, TABS });

// ─── Traditional-Chinese (Taiwan) copy for the language toggle. ───
// Kept in English on purpose: Demo Day, AppWorks, Wistron, company + founder
// names, product names. Edit the wording here — it's the single source for 中文.
const ZH = {
  tabs: { teams: '團隊', agenda: '議程', about: '關於' },
  teams: { heading: '登台團隊。', sub: '點選任一團隊即可收藏，或預約與創辦人交流。' },
  agenda: { heading: '議程。' },
  agendaTitles: ['報到', '開場', 'AppWorks #32 Demo · 15 組', 'Wistron #10 Demo · 4 組', '自由交流與酒會'],
  album: { eyebrow: 'ACCUPAI 提供', heading: '活動即時相簿。', sub: '由 Accupai 即時拍攝活動現場——可即時觀看、下載與分享。' },
  partners: {
    cardTitle: 'Wistron Accelerator',
    body: '專注於 AI、機器人、永續與次世代運算的企業加速器，為新創串接 Wistron 的全球製造網路與企業客戶。第 10 屆帶來新一批具備商業 POC 路徑的團隊。',
    programs: '屆數', alumni: '校友', pitching: '今日登台團隊',
  },
  sponsors: { eyebrow: '感謝我們的贊助商與合作夥伴', heading: 'Demo Day 贊助夥伴。' },
  footer: { ctaTitle: 'AW#33 正在招募中！', ctaSub: '加入我們——或推薦一位創業者朋友。' },
  teamSub: {
    notag: 'AI 驅動的電商出口貿易與配送', notifly: 'AI 原生的行銷自動化', krush: '為全球亞洲社群打造的交友與社交平台',
    clika: '邊緣 AI 的模型壓縮與編譯', innowave: '半導體製造的代理式 AI', lips: '機器人視覺與邊緣 AI',
    shieldbase: '企業級安全 AI 作業系統', omniease: '貿易合規與報關的自動化 AI', pathors: '電話互動的語音 AI',
    rosary: 'AEC 工作流程的 AI 代理', novo: '保險理賠的 AI 自動化', hyarks: '海洋產業的機器人解決方案',
    arrivl: 'AI 能見度與代理驅動的銷售', decisionslab: 'B2B 銷售的人物模擬 AI', sixsense: '製造業的 AI 品質控管',
    phasetrum: '衛星用相位陣列 RF 晶片', ruomei: '奈米散熱管理材料', greenbidz: '循環資產交易市場與 ESG',
    cloudstation: '將應用與 AI 代理部署到任何雲端',
  },
  teamPitch: {
    notag: 'AI 貿易公司，自動化跨國、跨通路、跨品牌的電商出口物流與配送。',
    notifly: '為亞洲行動應用與電商業者打造的 AI 原生行銷自動化。',
    krush: '交友與社交平台，透過文化匹配、線下活動與跨境互動連結全球亞洲社群。',
    clika: '模型壓縮與編譯技術，讓 AI 模型縮小並在邊緣裝置上高效運行。',
    innowave: '面向半導體與先進製造的代理式 AI，推動工廠自主化。',
    lips: '機器人視覺平台與邊緣 AI 解決方案供應商。',
    shieldbase: '企業級安全 AI 作業系統，整合知識與系統以驅動 AI 代理與工作流程。',
    omniease: '面向全球貿易合規與報關自動化的代理式 AI。',
    pathors: '將複雜的電話互動轉化為有引導、可驗證的語音 AI 工作流程。',
    rosary: '為建築、工程與營造（AEC）產業打造的 AI 代理，自動化 PDF、CAD 與 BIM 工作流程。',
    novo: '為保險公司提供 AI 理賠處理自動化與濫用防範。',
    hyarks: '多領域機器人解決方案，讓海事生態更安全、永續且易於使用——為港口、海巡、油氣與海軍打造。',
    arrivl: '讓你的內容更容易被 AI 代理看見，並將代理造訪轉化為銷售的工具。',
    decisionslab: '為 B2B 銷售團隊打造的人物模擬 AI，在發出開發信前預測每位潛在客戶的反應。',
    sixsense: 'AI 製造平台，自動化瑕疵檢測與預測性品質控管，為半導體與先進製造產線提升良率與週期時間。',
    phasetrum: 'AIP + 專利 Phase Tuner 架構打造相位陣列天線——99% 良率、功耗降低 50%、校準速度提升 10 倍，適用於 LEO 衛星、AESA 雷達與 6G。',
    ruomei: '奈米級散熱焊罩 + 微流道冷卻，可直接導入現有 SMT 產線，零製程變更即為 AI 晶片降溫——以鋁代銅的輕量化方案。',
    greenbidz: 'SaaS 驅動的 B2B 交易市場，協助工廠回收閒置設備價值，並自動擷取企業 ESG 報告所需的碳排與生命週期數據。',
    cloudstation: '無程式碼、多雲平台，讓非技術背景的創辦人也能部署應用、資料庫與自主 AI 代理——「不必給股份的技術共同創辦人」。',
  },
};
// Pick the right language; falls back to English if no zh string or not bilingual.
function tr(lang, en, zh) {
  return (window.EVENT_CONFIG && window.EVENT_CONFIG.bilingual !== false && lang === 'zh' && zh) ? zh : en;
}
Object.assign(window, { ZH, tr });

// Edition config — Taiwan. The Singapore page (data-sg.js) overrides this.
window.EVENT_CONFIG = {
  edition: 'TW',
  city: 'Taipei',
  venue: 'Taipei Marriott Hotel · 5F Grand Ballroom',
  bilingual: true,   // EN + 中文
  wordly: true,      // AI live interpretation
  album: true,       // Accupai photo album
  wistron: true,     // WA#10 cohort + partners section
  keyVisual: true,   // use the printed key-visual lockup in the hero
  nowOnStage: false, // captions live in the floating 即時翻譯 widget, not an inline page strip
  // Live caption engine switch (OpenAI/Gemini/Wordly). When set, the Captions
  // tab follows the server switch; defaults to Wordly so guests see no change
  // until an operator flips it from Backstage.
  captionsWorker: 'https://ddtw-captions.hsichun.workers.dev',
};
