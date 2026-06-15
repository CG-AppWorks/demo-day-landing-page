// data-sg.js — Singapore edition team directory + supporting data.
// Source: Airtable "Company-Grid view" CSV, rows where DD SG = Yes (12 teams).
// English-only · no Wistron · no Wordly · no album.
// Pitch order is provisional (no SG order column in the sheet yet).
const TEAMS = [
  { id:"innowave", linkedin:"https://www.linkedin.com/in/jinsong-xu-6ab5901b2/",     name:"Innowave Tech",   sub:"Agentic AI for semiconductor manufacturing", tags:["AI","Manufacturing"], batch:"AW#32", stage:"Pitching", market:"Global",   hq:"SG", language:"English", presenter:"Jinsong Xu",          title:"Founder & CEO",    email:"jinsong.xu@innowave.com.sg", website:"https://www.innowave.com.sg", speakerOrder:1,
    pitch:"Agentic AI for semiconductor and advanced manufacturing — driving factory autonomy." },
  { id:"lips", linkedin:"https://www.linkedin.com/in/luke-liu-b301063b/",         name:"LIPS",            sub:"Robotics vision & edge AI",                  tags:["AI","Manufacturing"], batch:"AW#32", stage:"Pitching", market:"Global",   hq:"TW", language:"English", presenter:"Luke Liu",            title:"Founder",          email:"lukeliu@lips-hci.com",      website:"https://www.lips-hci.com",    speakerOrder:2,
    pitch:"Robotics vision platform and edge-AI solution provider." },
  { id:"shieldbase", linkedin:"https://www.linkedin.com/in/diegolrojas",   name:"Shieldbase",      sub:"Secure enterprise AI OS",                    tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"SEA",      hq:"SG", language:"English", presenter:"Diego Rojas",         title:"Founder & CEO",    email:"diego@shieldbase.ai",       website:"https://shieldbase.ai",       speakerOrder:3,
    pitch:"Secure enterprise AI OS unifying knowledge and systems to power agents and workflows." },
  { id:"notag", linkedin:"https://www.linkedin.com/in/aiden-ung-choi-6672b94a/",        name:"NOTAG KOREA",     sub:"AI trading for e-commerce export",           tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"SEA · KR", hq:"KR", language:"English", presenter:"Aiden Ung Choi",      title:"Founder",          email:"aiden0808@notaggroup.com",  website:"https://www.notaggroup.com/", speakerOrder:4,
    pitch:"AI trading firm automating multi-country, multi-channel and multi-brand e-commerce export logistics and distribution." },
  { id:"refundy", linkedin:"https://www.linkedin.com/in/jaekyeumkim/",      name:"Refundy",         sub:"Returns & refunds for cross-border commerce", tags:["AI","Enterprise"],   batch:"AW#32", stage:"Pitching", market:"KR · Global", hq:"KR", language:"English", presenter:"Jaekyeum Kim",        title:"Co-Founder & COO", email:"jk.kim@refundy.co",         website:"https://www.refundy.co/en",   speakerOrder:5,
    pitch:"Returns and refunds automation for cross-border e-commerce sellers sourcing from China to global marketplaces." },
  { id:"krush", linkedin:"https://www.linkedin.com/in/stephenkyungshinmoon/",        name:"Krush",           sub:"Social & dating for the global Asian community", tags:["AI"],             batch:"AW#32", stage:"Pitching", market:"US · APAC", hq:"US", language:"English", presenter:"Stephen Moon",        title:"Founder & CEO",    email:"stephen.moon@curelation.co", website:"https://www.krushdating.co", speakerOrder:6,
    pitch:"Dating and social platform connecting the global Asian community through cultural matching, offline events, and cross-border interactions." },
  { id:"novo", linkedin:"https://www.linkedin.com/in/juliencondamines/",         name:"Novo AI",         sub:"AI claims processing for insurance",         tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"APAC · EU", hq:"HK", language:"English", presenter:"Julien Condamines",       title:"Co-Founder & CEO", email:"julien@heynovo.ai",         website:"https://heynovo.ai",          speakerOrder:7,
    pitch:"AI claim-processing automation and abuse prevention for insurance companies." },
  { id:"hyarks", linkedin:"https://www.linkedin.com/in/jhvalero/",       name:"Hyarks",          sub:"Robotics for the marine industry",           tags:["Dual-Use"],           batch:"AW#32", stage:"Pitching", market:"Global",   hq:"TW", language:"English", presenter:"Juan Herrero Valero", title:"Founder & CEO",    email:"juan.herrero@hyarks.com",   website:"https://www.hyarks.com/",     speakerOrder:8,
    pitch:"Multi-domain robotic solutions to make the maritime ecosystem safe, sustainable and accessible — built for ports, coast guards, oil & gas and navies." },
  { id:"rosary", linkedin:"https://www.linkedin.com/in/may-law/",       name:"Rosary Labs",     sub:"AI agents for AEC workflows",                tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"MY",       hq:"MY", language:"English", presenter:"May Law",             title:"Co-Founder",       email:"may@rosarylabs.ai",         website:"https://www.rosarylabs.ai",   speakerOrder:9,
    pitch:"AI agents that automate workflows across PDF, CAD, and BIM for the Architecture, Engineering & Construction (AEC) industry." },
  { id:"pathors", linkedin:"https://www.linkedin.com/in/brandonlu0924",      name:"Pathors",         sub:"Voice AI for phone interactions",            tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"TW · US",  hq:"TW", language:"English", presenter:"Yu-Chieh Cheng",      title:"Co-Founder & CEO", email:"brandon@pathors.com",       website:"https://pathors.com/",        speakerOrder:10,
    pitch:"Transforming complex phone interactions into guided, verifiable Voice AI workflows." },
  { id:"decisionslab", linkedin:"https://www.linkedin.com/in/louis-dlb11/", name:"Decisions Lab",  sub:"Persona-simulating AI for B2B sales",        tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"HK · US",  hq:"HK", language:"English", presenter:"Louis Cheung",        title:"Co-Founder & CEO", email:"louis@decisionslab.io",     website:"https://www.decisionslab.io", speakerOrder:11,
    pitch:"Persona-simulating AI for B2B sales teams to predict each prospect's reaction before you send outreach." },
];

// Singapore run-of-show — Tue 9 June 2026, Guoco Midtown Network Hub.
const AGENDA = [
  { t:"16:45–17:00", title:"VIP Registration",                       tag:"Lobby",      now:false },
  { t:"17:00–17:05", title:"Opening Remarks",                        tag:"Keynote",    now:false },
  { t:"17:05–17:20", title:"Keynote · KS Pua, Chairman & CEO of Phison",        tag:"Keynote",    now:false },
  { t:"17:20–17:50", title:"AppWorks #32 Startups Demo",             tag:"Pitches",    now:true  },
  { t:"17:50–19:00", title:"Happy Hour · Cocktails & Networking",      tag:"Networking", now:false },
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
  teams: { heading: '簡報團隊。', sub: '點選任一團隊即可收藏，或預約與創辦人交流。' },
  agenda: { heading: '議程。' },
  agendaTitles: ['報到', '開場', 'AppWorks #32 新創簡報 · 15 組', 'Wistron #10 新創簡報 · 4 組', '自由交流與酒會'],
  album: { eyebrow: 'ACCUPAI 提供', heading: '活動即時相簿。', sub: '由 Accupai 即時拍攝活動現場——可即時觀看、下載與分享。' },
  partners: {
    cardTitle: 'Wistron Accelerator',
    body: '專注於 AI、機器人、永續與次世代運算的企業加速器，為新創串接 Wistron 的全球製造網路與企業客戶。第 10 屆帶來新一批具備商業 POC 路徑的團隊。',
    programs: '屆數', alumni: '校友', pitching: '今日簡報團隊',
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

// Edition config — Singapore: English-only, no Wistron / Wordly / album.
window.EVENT_CONFIG = {
  edition: 'SG',
  city: 'Singapore',
  venue: 'Guoco Midtown Network Hub · Singapore',
  bilingual: false,
  wordly: false,
  album: false,
  wistron: false,
  keyVisual: false,       // use the text headline lockup
  nowOnStage: false,      // no live "on stage" takeover for SG
  heroDate: '9 Jun',
  heroTime: 'Tue · 17:00–19:00',
  heroVenueShort: 'Guoco Midtown',
  heroVenueSub: 'MICE Room 2+3 · Singapore',
  heroTeamsNote: 'AppWorks #32',
  heroGuest: {
    name: 'KS Pua',
    role: 'Chairman & CEO of Phison',
    url: 'https://www.linkedin.com/in/k-s-pua-1090054/',
  },
};
