// data.js — Demo Day team directory + supporting data
// DD#33 Taiwan lineup (Thu 3 Dec 2026, Taipei Marriott) — DRAFT.
// Source: "DD#33 MC materials (Cg)" sheet, tab "DD founder info for MCs" (TW = 1),
//   in its "Pitching order (TW)" order: 22 AppWorks Accelerator #33 teams (FlexHaul not pitching, Nov 13;
//   Ennovation has no TW order yet, so it sits last) + 4 Wistron Accelerator #11 teams (Hanomi + Sonice details TBC).
// Copy is product-level only: no revenue, customer names or regulatory claims
//   (see the sheet's "⚠ Check before saying on stage" column).
// Contacts: presenter email from the RSVP / intro-deck data; websites + LinkedIn
//   from the AW#33 intro deck. Logos + headshots from the AW#33 registration uploads
//   (WA#11: the DD#33 material form). logoMark = icon-only logo, shown with the name.
// Languages: Mandarin pitches are flagged; '' = not confirmed (no badge).
const TEAMS = [
  // ─── AppWorks Accelerator #33 ─ 22 teams (TW order per MC sheet, Nov 10; FlexHaul not pitching, Nov 13) ───
  { id:"ailytics", logo:"assets/logos/ailytics.png", linkedin:"https://www.linkedin.com/in/wei-zhuang-tan/", portrait:"assets/portraits/ailytics.jpg",
    name:"Ailytics", sub:"AI safety & productivity from existing cameras", tags:["Manufacturing AI","Enterprise AI"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Lenard Tan", title:"Founder & CEO", email:"weizhuang.tan@ailytics.ai", website:"https://ailytics.ai/", speakerOrder:1,
    pitch:"Turns the cameras a construction site or factory already has into an AI system that spots safety risks and productivity losses in real time." },
  { id:"mimin", logo:"assets/logos/mimin.png", linkedin:"https://www.linkedin.com/in/joseph-simbar-6aa44a17/", portrait:"assets/portraits/mimin.jpg",
    name:"Mimin", sub:"Customer-service AI agents for chat & voice", tags:["Enterprise AI"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Joseph Simbar", title:"CEO", email:"joseph@mimin.io", website:"https://www.mimin.io", speakerOrder:2,
    pitch:"Lets mid-market and enterprise businesses build their own customer-service AI agents for chat and voice, on one platform." },
  { id:"alpenglow", logo:"assets/logos/alpenglow.png", linkedin:"https://www.linkedin.com/in/mark-chen-a801811b8", portrait:"assets/portraits/alpenglow.jpg",
    name:"Alpenglow Tek", sub:"Compute-in-memory chips for always-on AI", tags:["Semiconductor"], batch:"AW#33", hq:"TW", language:"Mandarin",
    presenter:"Mark Chen", title:"Founder & CEO", email:"mark@alpenglowtek.com", website:"https://alpenglowtek.com/", speakerOrder:3,
    pitch:"A compute-in-memory chip platform — core, compiler and tools — that helps IC design houses ship ultra-low-power AI chips for small, always-on devices." },
  { id:"dataraai", logo:"assets/logos/dataraai.png", logoMark:true, linkedin:"https://www.linkedin.com/in/yuhlinchang", portrait:"assets/portraits/dataraai.jpg",
    name:"DataraAI", sub:"Robots for flexible-part assembly", tags:["Manufacturing AI"], batch:"AW#33", hq:"US", language:"Mandarin",
    presenter:"Yuhlin Chang", title:"Co-founder & CTO", email:"yuhlin.chang@dataraai.ai", website:"https://dataraai.ai", speakerOrder:4,
    pitch:"Robots that handle the soft, bendy parts rigid automation can't — starting with cable insertion in AI server racks — trained in a simulator calibrated against real-world behaviour." },
  { id:"ofek", logo:"assets/logos/ofek.png", portrait:"assets/portraits/ofek.jpg",
    name:"Ofek", sub:"AI quality control for electronics lines", tags:["Manufacturing AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Dario Weissmann", title:"CEO", email:"dariow@ofektaiwan.com", website:"https://www.ofektaiwan.com", speakerOrder:5,
    pitch:"Reads the data from every station on an electronics production line — inspection, test, repair — and flags defects and process drift before the boards ship." },
  { id:"vernus", logo:"assets/logos/vernus.png", linkedin:"https://www.linkedin.com/in/jimmy-yen-chu-lin-74785199/", portrait:"assets/portraits/vernus.jpg",
    name:"Vernus AI", sub:"AI & quantum simulation for drug manufacturing", tags:["Manufacturing AI"], batch:"AW#33", hq:"TW", language:"Mandarin",
    presenter:"Jimmy Lin", title:"CEO", email:"jimmy.lin@vernus.ai", website:"https://vernus.ai/", speakerOrder:6,
    pitch:"ReAIX, an AI and quantum-simulation platform that optimizes how active pharmaceutical ingredients are manufactured, to bring production costs down." },
  { id:"huemankind", logo:"assets/logos/huemankind.png", logoMark:true, linkedin:"https://www.linkedin.com/in/jenn-woei-loh-66719131/", portrait:"assets/portraits/huemankind.jpg",
    name:"huemankind", sub:"AI content studio for SMEs selling on WhatsApp", tags:["Enterprise AI"], batch:"AW#33", hq:"MY", language:"",
    presenter:"Jenn Woei Loh", title:"CEO", email:"zennith@huemankind.world", website:"https://zenneth.ai", speakerOrder:7,
    pitch:"An AI content studio for SMEs that sell over WhatsApp: it creates and publishes the content, then traces each ad through the chat to the sale it produced." },
  { id:"morphusai", logo:"assets/logos/morphusai.png", logoMark:true, linkedin:"https://www.linkedin.com/in/johnnyhsiehtw/", portrait:"assets/portraits/morphusai.jpg",
    name:"MorphusAI", sub:"Memory & identity layer for AI agents", tags:["Enterprise AI"], batch:"AW#33", hq:"TW", language:"Mandarin",
    presenter:"Johnny Hsieh", title:"Founder", email:"johnny@morphusai.com", website:"https://morphusai.com", speakerOrder:8,
    pitch:"A memory and identity layer so AI agents remember who they are, what they know and what they're allowed to do." },
  { id:"federation", logo:"assets/logos/federation.png", linkedin:"https://www.linkedin.com/in/gaheeseo/", portrait:"assets/portraits/federation.jpg",
    name:"Federation", sub:"AI agents for trade paperwork", tags:["Enterprise AI"], batch:"AW#33", hq:"KR", language:"English",
    presenter:"Gahee Seo", title:"CEO", email:"gahee@federationlabs.ai", website:"https://www.federationlabs.ai", speakerOrder:9,
    pitch:"AI agents that handle the trade paperwork manufacturers can't staff for — HS codes, tariffs, export rules — and use that knowledge to help them find and close deals." },
  { id:"alphaswift", logo:"assets/logos/alphaswift.png", logoMark:true, linkedin:"https://www.linkedin.com/in/shianlee/", portrait:"assets/portraits/alphaswift.jpg",
    name:"Alphaswift Industries", sub:"Autonomous cargo drones, built in Malaysia", tags:["Defense Tech"], batch:"AW#33", hq:"MY", language:"Mandarin",
    presenter:"Dr. Shian Lee", title:"Co-founder & CEO", email:"shian@alphaswift.com", website:"https://alphaswift.com/", speakerOrder:10,
    pitch:"Designs, builds and flies autonomous cargo drones with its own flight controllers and software, giving defense and industrial buyers a drone supply chain free of Chinese components." },
  { id:"teamsync", logo:"assets/logos/teamsync.png", logoMark:true, linkedin:"https://www.linkedin.com/in/jason-kao-66481a15a/", portrait:"assets/portraits/teamsync.jpg",
    name:"TeamSync AI", sub:"Enterprise AI OS", tags:["Enterprise AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Jason Kao", title:"Founder & CEO", email:"jasonvan701228@gmail.com", website:"https://shuchenai.com", speakerOrder:11,
    pitch:"An enterprise AI OS that connects a company's scattered knowledge, AI agents and workflows — including the ERP — into one governed collaboration hub." },
  { id:"netellus", logo:"assets/logos/netellus.png", linkedin:"https://www.linkedin.com/in/justinwu567/", portrait:"assets/portraits/netellus.jpg",
    name:"Netellus", sub:"Energy-saving upgrades for factories", tags:["Enterprise AI"], batch:"AW#33", hq:"TW", language:"Mandarin",
    presenter:"Justin Wu", title:"CEO", email:"justin@netellus.com", website:"https://www.netellus.com/", speakerOrder:12,
    pitch:"Matches manufacturers with vetted energy-saving vendors and finances the equipment upgrade, so a factory can replace major equipment with nothing upfront." },
  { id:"tynapse", logo:"assets/logos/tynapse.png", portrait:"assets/portraits/tynapse.jpg", linkedin:"https://www.linkedin.com/in/mattzaheen/",
    name:"Tynapse", sub:"Trust layer for enterprise AI", tags:["Enterprise AI"], batch:"AW#33", hq:"KR", language:"English",
    presenter:"Matt Zaheen", title:"Co-founder & Head of Strategy and Partnerships", email:"matt@tynapse.com", website:"https://www.tynapse.com/", speakerOrder:13,
    pitch:"A trust layer that checks, governs and audits enterprise AI at the moment of use, so banks and other regulated companies can deploy it safely." },
  { id:"remited", logo:"assets/logos/remited.png", portrait:"assets/portraits/remited.jpg", linkedin:"https://www.linkedin.com/in/brian-bae-ba638a131/",
    name:"Team REmited", sub:"Receipt rewards that become purchase data", tags:["Enterprise AI"], batch:"AW#33", hq:"KR", language:"English",
    presenter:"Brian Bae", title:"Co-founder & CEO", email:"sh.bae@teamremited.com", website:"https://www.teamremited.com", speakerOrder:14,
    pitch:"Carty rewards shoppers for uploading receipts, turning them into item-level purchase data that powers commerce AI for brands." },
  { id:"screened", logo:"assets/logos/screened.png", linkedin:"https://www.linkedin.com/in/wen-chen/", portrait:"assets/portraits/screened.jpg",
    name:"Screened", sub:"AI recruiter", tags:["Enterprise AI"], batch:"AW#33", hq:"SG", language:"Mandarin",
    presenter:"Wen Chen", title:"Co-founder & CEO", email:"wen@screened.io", website:"https://screened.io/", speakerOrder:15,
    pitch:"An AI recruiter that screens resumes, runs first-round interviews and handles candidate messages, with a structured interview framework built in." },
  { id:"qinvicta", logo:"assets/logos/qinvicta.png", portrait:"assets/portraits/qinvicta.jpg",
    name:"Qinvicta", sub:"Post-quantum cryptography in silicon", tags:["PQC"], batch:"AW#33", hq:"US", language:"Mandarin",
    presenter:"Jimmy Chen", title:"Co-founder & Chairman", email:"jmchen@qinvicta.com", website:"https://qinvicta.com", speakerOrder:16,
    pitch:"A hardware engine that builds post-quantum cryptography into silicon, so chipmakers and security vendors can make their products quantum-safe." },
  { id:"pqstation", logo:"assets/logos/pqstation.png", linkedin:"https://www.linkedin.com/in/prasanna-ravi-071a8679/", portrait:"assets/portraits/pqstation.jpg",
    name:"PQStation", sub:"Post-quantum migration for enterprises", tags:["PQC"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Dr. Prasanna Ravi", title:"CEO", email:"prasanna@pqstation.com", website:"https://www.pqstation.com", speakerOrder:17,
    pitch:"Finds every place an enterprise still uses encryption that quantum computers will break, then helps fix it." },
  { id:"blocktrend", logo:"assets/logos/blocktrend.png", linkedin:"https://www.linkedin.com/in/astrohsu/", portrait:"assets/portraits/blocktrend.jpg",
    name:"Blocktrend 區塊勢", sub:"Crypto analysis for Taiwan & Hong Kong readers", tags:["Media"], batch:"AW#33", hq:"TW", language:"Mandarin",
    presenter:"Ming-En Hsu", title:"Founder", email:"mn@blocktrend.today", website:"https://www.blocktrend.today", speakerOrder:18,
    pitch:"A subscription publication that explains global crypto through Taiwan and Hong Kong's own context, built on nine years of first-hand reporting and analysis." },
  { id:"coinpilot", logo:"assets/logos/coinpilot.png", linkedin:"https://linkedin.com/in/huichunhim", portrait:"assets/portraits/coinpilot.jpg",
    name:"Coinpilot", sub:"AI copilot for crypto trading", tags:["On-Chain Banking"], batch:"AW#33", hq:"HK", language:"English",
    presenter:"Peter Hui", title:"Co-founder", email:"peter@coinpilot.com", website:"https://coinpilot.com", speakerOrder:19,
    pitch:"Arlo, an AI copilot that researches, monitors and reviews crypto trades while the human keeps control of every decision." },
  { id:"stablecorp", logo:"assets/logos/stablecorp.png", logoMark:true, linkedin:"https://linkedin.com/in/sangharsh-bhustalimath", portrait:"assets/portraits/stablecorp.jpg",
    name:"Stablecorp", sub:"Back office for stablecoin earners", tags:["On-Chain Banking"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Sangharsh Bhustalimath", title:"Co-founder & CEO", email:"10k@xelio.xyz", website:"https://mystablecorp.xyz", speakerOrder:20,
    pitch:"For founders and freelancers paid in stablecoins: a US company, business accounts, invoicing and tax filings in one place." },
  { id:"fluidkey", logo:"assets/logos/fluidkey.png", linkedin:"https://www.linkedin.com/in/moritzboullenger/", portrait:"assets/portraits/fluidkey.jpg",
    name:"Fluidkey", sub:"Offshore brokerage on crypto rails", tags:["On-Chain Banking"], batch:"AW#33", hq:"CH", language:"English",
    presenter:"Moritz Boullenger", title:"Co-founder & CEO", email:"moritz@fluidkey.com", website:"https://fluidkey.com", speakerOrder:21,
    pitch:"An offshore brokerage rebuilt on crypto rails, for investors in Asia." },
  { id:"ennovation", logo:"assets/logos/ennovation.png", linkedin:"https://www.linkedin.com/in/adeline-yang-h", portrait:"assets/portraits/ennovation.jpg",
    name:"Ennovation", sub:"One-size myopia control for children", tags:["Health Tech"], batch:"AW#33", hq:"SG", language:"",
    presenter:"Adeline Yang", title:"Founder", email:"contact@ennovation.io", website:"https://www.myopreva.com", speakerOrder:22,
    pitch:"MyoPREVA, a one-size myopia-control product for children that is easy to apply and non-invasive." },

  // ─── Wistron Accelerator #11 ─ no pitching order yet; Hanomi + Sonice details TBC ───
  { id:"hanomi",    name:"Hanomi",    sub:"Wistron Accelerator #11", tags:[], batch:"WA#11", hq:"", language:"", presenter:"Presenter TBC", title:"", email:"", website:"", speakerOrder:1, pitch:"Details coming soon." },
  { id:"zig", logo:"assets/logos/zig.png", portrait:"assets/portraits/zig.jpg",
    name:"ZiG", sub:"AI + digital twins for enterprise transformation", tags:["Manufacturing AI","Enterprise AI"], batch:"WA#11", hq:"TW", language:"",
    presenter:"Frank Chang", title:"CMO", email:"frank.chang@zignet.co", website:"https://zignet.co/", speakerOrder:2,
    pitch:"A turnkey solution that integrates AI and digital twins to accelerate enterprise transformation." },
  { id:"waydosoft", logo:"assets/logos/waydosoft.png", logoMark:true, portrait:"assets/portraits/waydosoft.jpg",
    name:"WayDoSoft", sub:"Delivery-date decisions for precision manufacturing", tags:["Manufacturing AI"], batch:"WA#11", hq:"TW", language:"",
    presenter:"Tzu-Yao Lin", title:"CEO", email:"lint@wdmis.com.tw", website:"https://waydosoft.com.tw", speakerOrder:3,
    pitch:"Decision intelligence for delivery promises in high-mix precision manufacturing." },
  { id:"sonice",    name:"Sonice",    sub:"Wistron Accelerator #11", tags:[], batch:"WA#11", hq:"", language:"", presenter:"Presenter TBC", title:"", email:"", website:"", speakerOrder:4, pitch:"Details coming soon." },

  // ─── Wistron Computing Power Donation ─ 2 recipients share results on stage (Wistron email, Nov 5) ───
  // Copy from each team's own website until their material form comes in (forms.gle/posMyKoBXTaKZxqt5).
  { id:"dentscape", portrait:"assets/portraits/dentscape.jpg",
    name:"Dentscape", sub:"AI crown design for dental labs · AppWorks #24", tags:["Health Tech"], batch:"CPD", hq:"TW", language:"",
    presenter:"Bill Chou", title:"CEO", email:"bill.chou@dentscape.ai", website:"https://dentscape.ai", speakerOrder:1,
    pitch:"AI crown design software for dental labs: designs crowns, bridges and models in each lab's own style, reviewed in the tools the lab already uses." },
  { id:"siliconmind", logo:"assets/logos/siliconmind.png",
    name:"SiliconMind", sub:"Private, on-premise AI for chip design", tags:["Semiconductor"], batch:"CPD", hq:"TW", language:"",
    presenter:"Mu-Chi Chen", title:"Co-founder & CEO", email:"muchi.chen@siliconmind.co", website:"https://siliconmind.co", speakerOrder:2,
    pitch:"Private AI for IC design companies and IP providers: small models served on-premise that keep improving on the customer's own design data and workflows. Spun off from NTU and Academia Sinica." },
];

const AW_COUNT = TEAMS.filter((t) => t.batch === 'AW#33').length;
const WA_COUNT = TEAMS.filter((t) => t.batch === 'WA#11').length;
const CPD_COUNT = TEAMS.filter((t) => t.batch === 'CPD').length;

// Run of show per the TW Luma page (luma.com/DD33TWVIP), as of Nov 13.
const AGENDA = [
  { t:"12:00–13:00", title:"Registration",                                    tag:"Lobby · 5F",  now:false },
  { t:"13:00–13:20", title:"Opening Keynote by Jamie Lin",                    tag:"Keynote",     now:false },
  { t:"13:20–14:20", title:`AppWorks #33 Startups Demo · ${AW_COUNT} teams`,  tag:"Pitches",     now:true  },
  { t:"14:20–14:50", title:`Wistron #11 Startups Demo · ${WA_COUNT} teams + Computing Power Donation results · ${CPD_COUNT} teams`, tag:"Pitches", now:false },
  { t:"14:50–16:30", title:"Open Floor & Cocktail Networking",                tag:"Networking",  now:false, wide:true },
];

const TABS = [
  { id:"teams",     label:"Teams" },
  { id:"agenda",    label:"Agenda" },
  { id:"about",     label:"About AppWorks" },
  { id:"partners",  label:"Wistron" },
];

// Venue booth layout — [name, team id] per booth; leave unset until the floor plan is final:
//   window.BOOTH_MAP = { left:[...], right:[...], bottom:[...] };   (+ add a "booth-map" tab)
// Attendee perks — empty until confirmed. Shape:
//   { name, logo, note, width, offers:[{ perk:[en, zh], code, valid:[en, zh] }] }
window.EVENT_PARTNERS = [];

Object.assign(window, { TEAMS, AGENDA, TABS });

// ─── Traditional-Chinese (Taiwan) copy for the language toggle. ───
// Kept in English on purpose: Demo Day, AppWorks, Wistron, company + founder
// names, product names. Edit the wording here — it's the single source for 中文.
const ZH = {
  tabs: { teams: '團隊', agenda: '議程', about: '關於 AppWorks', partners: '緯創', 'booth-map': '攤位地圖' },
  teams: { heading: '登台團隊。', sub: '點選任一團隊即可收藏，或預約與創辦人交流。' },
  agenda: { heading: '議程。' },
  agendaTitles: ['報到', '開場：Jamie 林之晨主題演講', `AppWorks #33 Demo · ${AW_COUNT} 組`, `Wistron #11 Demo · ${WA_COUNT} 組 + 算力捐贈計畫成果分享 · ${CPD_COUNT} 組`, '自由交流與酒會'],
  album: { eyebrow: 'ACCUPAI 提供', heading: '活動即時相簿。', sub: '由 Accupai 即時拍攝活動現場——可即時觀看、下載與分享。' },
  partners: {
    cardTitle: 'Wistron Accelerator',
    programs: '屆數', alumni: '校友', pitching: '今日登台團隊',
  },
  sponsors: { eyebrow: '感謝我們的贊助商與合作夥伴', heading: 'Demo Day 贊助夥伴。' },
  footer: { ctaTitle: 'AW#34 正在招募中！', ctaSub: '加入我們——或推薦一位創業者朋友。' },
  teamSub: {
    dentscape: '為牙技所打造的 AI 牙冠設計', siliconmind: '在地端運作的晶片設計 AI',
    ailytics: '用既有攝影機做 AI 安全與產能監測', mimin: '文字與語音的客服 AI agent', alpenglow: '常時運作 AI 的記憶體內運算晶片',
    dataraai: '處理軟性元件組裝的機器人', ofek: '電子產線的 AI 品質管理', vernus: '以 AI 與量子模擬優化製藥製程',
    huemankind: '為 WhatsApp 銷售的中小企業打造的 AI 內容工作室', morphusai: 'AI agent 的記憶與身分層', federation: '處理貿易文件的 AI agent',
    alphaswift: '馬來西亞自製的自主貨運無人機', teamsync: '企業 AI 作業系統',
    netellus: '工廠節能升級的媒合與融資', tynapse: '企業 AI 的信任層', remited: '把收據回饋變成消費數據',
    screened: 'AI 招募專員', qinvicta: '做進晶片的後量子密碼', pqstation: '企業的後量子密碼遷移',
    blocktrend: '以台港脈絡解讀加密產業的訂閱媒體', coinpilot: '加密資產交易的 AI 副駕駛', stablecorp: '穩定幣收款者的後台營運',
    fluidkey: '以加密基礎設施重建的海外券商', ennovation: '兒童近視控制的單一規格產品',
    zig: 'AI 與數位孿生的企業轉型方案', waydosoft: '精密製造的交期決策',
  },
  teamPitch: {
    ailytics: '把工地或工廠既有的攝影機變成 AI 系統，即時找出安全風險與產能損失。',
    mimin: '讓中大型企業在同一個平台上，自建文字與語音的客服 AI agent。',
    alpenglow: '記憶體內運算（CIM）晶片平台，包含核心、編譯器與工具，協助 IC 設計公司更快推出小型常時運作裝置所需的超低功耗 AI 晶片。',
    dataraai: '讓機器人處理傳統自動化做不到的軟性元件組裝，從 AI 伺服器機櫃的線材插接開始，並在依真實物理行為校準的模擬器中訓練。',
    ofek: '整合電子產線各站點（檢測、測試、維修）的資料，在電路板出貨前找出瑕疵與製程偏移。',
    vernus: 'ReAIX 結合 AI 與量子模擬，優化原料藥（API）的製程，降低生產成本。',
    huemankind: '為透過 WhatsApp 銷售的中小企業產出並發布內容，並追蹤每則廣告從對話到成交的轉換。',
    morphusai: '為 AI agent 打造記憶與身分層，讓 agent 記得自己是誰、知道什麼、被允許做什麼。',
    federation: '以 AI agent 處理製造商人力難以負擔的貿易文件（HS 稅則、關稅、出口規範），並運用這些知識協助他們找到並談成訂單。',
    alphaswift: '自行設計、製造並營運自主貨運無人機，飛控與軟體皆為自研，為國防與產業客戶提供不含中國零組件的無人機供應鏈。',
    teamsync: '企業 AI 作業系統，把分散的知識、AI agent 與工作流程（包含 ERP）串成一個可治理的協作中樞。',
    netellus: '為製造業媒合經審核的節能廠商，並提供設備升級資金，讓工廠不需預付即可汰換主要設備。',
    tynapse: '在企業使用 AI 的當下進行檢查、治理與稽核，讓銀行等受監管企業能安心導入 AI。',
    remited: 'Carty 讓消費者上傳收據換取回饋，並把收據轉成品項層級的消費數據，提供品牌發展商務 AI。',
    screened: 'AI 招募專員，負責篩選履歷、進行第一輪面試與回覆求職者訊息，並內建結構化面試框架。',
    qinvicta: '把後量子密碼（PQC）做進晶片的硬體引擎，協助晶片商與資安廠商讓產品具備抗量子能力。',
    pqstation: '找出企業內所有會被量子電腦破解的加密使用點，並協助完成修補。',
    blocktrend: '訂閱制媒體，以台灣與香港的在地脈絡解讀全球加密產業，累積九年的第一手報導與分析。',
    coinpilot: 'Arlo 是加密資產交易的 AI 副駕駛，負責研究、監控與檢討交易，每個決策仍由使用者掌控。',
    stablecorp: '為以穩定幣收款的創業者與自由工作者，一站整合美國公司設立、商務帳戶、發票與報稅。',
    fluidkey: '以加密貨幣基礎設施重新打造的海外券商，服務亞洲投資人。',
    ennovation: 'MyoPREVA 是單一規格的兒童近視控制產品，使用簡單、非侵入式。',
    zig: '整合 AI 與數位孿生的一站式解決方案，加速企業轉型。',
    waydosoft: '為少量多樣的精密製造，提供交期承諾的決策智慧。',
    hanomi: '團隊資訊即將公布。', sonice: '團隊資訊即將公布。',
    dentscape: '為牙技所打造的 AI 牙科 CAD：依照每間技工所自己的風格設計牙冠、牙橋與模型，並在原本熟悉的工具中檢閱。',
    siliconmind: '為 IC 設計公司與 IP 供應商打造的私有 AI：在客戶機房運作的小型模型，持續以客戶自己的設計資料與流程學習。源自台大與中研院的研究計畫。',
  },
};
// Pick the right language; falls back to English if no zh string or not bilingual.
function tr(lang, en, zh) {
  return (window.EVENT_CONFIG && window.EVENT_CONFIG.bilingual !== false && lang === 'zh' && zh) ? zh : en;
}
Object.assign(window, { ZH, tr });

// Markets named in the hero lede, most teams first.
const COUNTRY = { TW:'Taiwan', SG:'Singapore', MY:'Malaysia', KR:'Korea', US:'the US', HK:'Hong Kong', CH:'Switzerland' };
const MARKET_NAMES = (() => {
  const n = {};
  TEAMS.forEach((t) => { if (t.hq) n[t.hq] = (n[t.hq] || 0) + 1; });
  const names = Object.keys(n).sort((a, b) => n[b] - n[a]).map((c) => COUNTRY[c] || c);
  return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1];
})();

// Edition config — Taiwan. The Singapore page (data-sg.js) overrides this.
window.EVENT_CONFIG = {
  edition: 'TW',
  city: 'Taipei',
  eventName: 'AppWorks #33 + Wistron #11 Demo Day',
  batchLabel: 'AppWorks #33',
  nextBatch: 'AW#34',        // footer "now taking applications" banner
  wistronBatch: 'WA#11',     // team.batch value shown in the Wistron block
  wistronLabel: 'Wistron #11',
  wistronLabelZh: '緯創 #11',
  wistronPrograms: 11,
  donationBatch: 'CPD',      // Computing Power Donation recipients, shown under the Wistron block
  donationLabel: 'Wistron Computing Power Donation', donationLabelZh: '緯創算力捐贈計畫',
  donationIntro: "Wistron's Computing Power Donation program gives 1 million GPU hours a year to AI startups and research teams. Two recipients share their results on stage.",
  donationIntroZh: '緯創算力捐贈計畫每年捐出 100 萬小時 GPU 算力，支持 AI 新創與研究團隊；本次有 2 組受贈團隊登台分享成果。',
  bilingual: true,   // EN + 中文
  wordly: true,      // AI live interpretation
  album: false,      // Accupai photo album — set albumUrl + true once the DD#33 album exists
  albumUrl: '',
  wistron: true,     // WA cohort + partners section
  // Key visual: image path = printed lockup · false = text wordmark · '' = empty slot
  keyVisual: 'assets/dd33-keyvisual-tw.webp',
  nowOnStage: false, // captions live in the floating 即時翻譯 widget, not an inline page strip
  heroDate: '3 Dec',  heroDateZh: '12/3',
  heroTime: 'Thu · 12:00–16:30', heroTimeZh: '週四 · 12:00–16:30',
  heroVenueShort: 'Marriott', heroVenueShortZh: '台北萬豪酒店',
  heroVenueSub: '5F Grand Ballroom · Taipei', heroVenueSubZh: '5F 萬豪廳 · 台北',
  heroTeamsNote: `${AW_COUNT} AppWorks · ${WA_COUNT} Wistron · ${CPD_COUNT} Compute Donation`,
  heroLede: {
    en: `**${TEAMS.length} select startups, one room.** ${AW_COUNT} from **AppWorks Accelerator #33**, ${WA_COUNT} from **Wistron Accelerator #11** and ${CPD_COUNT} from **Wistron's Computing Power Donation program** — founders from ${MARKET_NAMES}.\n` +
        `The AppWorks #33 theme is **Compiling the Uncompilable**: AI that captures the know-how experienced people carry and turns it into software any company can run.`,
    zh: `${TEAMS.length} 組新創、一個下午：${AW_COUNT} 組來自 AppWorks Accelerator #33，${WA_COUNT} 組來自 Wistron Accelerator #11，另有 ${CPD_COUNT} 組來自緯創算力捐贈計畫。\n` +
        `本屆主題「Compiling the Uncompilable」：用 AI 擷取資深工作者的經驗，轉成企業每天都能使用的軟體。`,
  },
  // Demo Day sponsors (logos from Ona's "(Newlogos)_DD#33TW" folder, 2026H2 versions).
  sponsors: [
    { name: 'Google Cloud', src: 'assets/sponsor-dd33-google-cloud.png', h: 30 },
    { name: 'AWS', src: 'assets/sponsor-dd33-aws.png', h: 56 },
    { name: 'KKCOMPANY', src: 'assets/sponsor-dd33-kkcompany.png', h: 50 },
  ],
  // Live caption engine switch (OpenAI/Gemini/Wordly). When set, the Captions
  // tab follows the server switch; defaults to Wordly so guests see no change
  // until an operator flips it from Backstage.
  captionsWorker: 'https://ddtw-captions.hsichun.workers.dev',
  // Anonymous page-view / click counts (analytics.js) — read at <this URL>/stats.
  analytics: 'https://ddtw-captions.hsichun.workers.dev',
};
