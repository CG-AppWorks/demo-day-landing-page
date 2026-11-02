// data-sg.js — Singapore edition team directory + supporting data.
// DD#33 Singapore lineup (Tue 17 Nov 2026, Marina One West) — DRAFT.
// Source: "DD#33 MC materials (Cg)" sheet, tab "DD founder info for MCs" (SG = 1),
//   in its "Pitching order (SG)" order: 17 AppWorks Accelerator #33 teams.
// Card copy mirrors data.js (product-level only); presenters differ for Coinpilot
//   (Jonathan Mui) and Predictefy (SG only).
// English-only · no Wistron · no live captions · no album.
const TEAMS = [
  { id:"ailytics", linkedin:"https://www.linkedin.com/in/wei-zhuang-tan/", portrait:"assets/portraits/ailytics.jpg",
    name:"Ailytics", sub:"AI safety & productivity from existing cameras", tags:["AI","Manufacturing"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Lenard Tan", title:"Founder & CEO", email:"weizhuang.tan@ailytics.ai", website:"https://ailytics.ai/", speakerOrder:1,
    pitch:"Turns the cameras a construction site or factory already has into an AI system that spots safety risks and productivity losses in real time." },
  { id:"mimin", linkedin:"https://www.linkedin.com/in/joseph-simbar-6aa44a17/", portrait:"assets/portraits/mimin.jpg",
    name:"Mimin", sub:"Customer-service AI agents for chat & voice", tags:["AI","Enterprise"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Joseph Simbar", title:"CEO", email:"joseph@mimin.io", website:"https://www.mimin.io", speakerOrder:2,
    pitch:"Lets mid-market and enterprise businesses build their own customer-service AI agents for chat and voice, on one platform." },
  { id:"remited", linkedin:"https://www.linkedin.com/in/brian-bae-ba638a131/",
    name:"Team REmited", sub:"Receipt rewards that become purchase data", tags:["AI","Enterprise"], batch:"AW#33", hq:"KR", language:"English",
    presenter:"Brian Bae", title:"Co-founder & CEO", email:"sh.bae@teamremited.com", website:"https://www.teamremited.com", speakerOrder:3,
    pitch:"Carty rewards shoppers for uploading receipts, turning them into item-level purchase data that powers commerce AI for brands." },
  { id:"huemankind", linkedin:"https://www.linkedin.com/in/jenn-woei-loh-66719131/", portrait:"assets/portraits/huemankind.jpg",
    name:"huemankind", sub:"AI content studio for SMEs selling on WhatsApp", tags:["AI","Enterprise"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Jenn Woei Loh", title:"CEO", email:"zennith@huemankind.world", website:"https://zenneth.ai", speakerOrder:4,
    pitch:"An AI content studio for SMEs that sell over WhatsApp: it creates and publishes the content, then traces each ad through the chat to the sale it produced." },
  { id:"alphaswift", linkedin:"https://www.linkedin.com/in/shianlee/", portrait:"assets/portraits/alphaswift.jpg",
    name:"Alphaswift Industries", sub:"Autonomous cargo drones, built in Malaysia", tags:["Dual-Use"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Dr. Shian Lee", title:"Co-founder & CEO", email:"shian@alphaswift.com", website:"https://alphaswift.com/", speakerOrder:5,
    pitch:"Designs, builds and flies autonomous cargo drones with its own flight controllers and software, giving defence and industrial buyers a drone supply chain free of Chinese components." },
  { id:"ennovation", linkedin:"https://www.linkedin.com/in/adeline-yang-h", portrait:"assets/portraits/ennovation.jpg",
    name:"Ennovation", sub:"One-size myopia control for children", tags:["Health"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Adeline Yang", title:"Founder", email:"contact@ennovation.io", website:"https://www.myopreva.com", speakerOrder:6,
    pitch:"MyoPREVA, a one-size myopia-control product for children that is easy to apply and non-invasive." },
  { id:"pqstation", linkedin:"https://www.linkedin.com/in/prasanna-ravi-071a8679/", portrait:"assets/portraits/pqstation.jpg",
    name:"PQStation", sub:"Post-quantum migration for enterprises", tags:["Deep Tech","Enterprise"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Dr. Prasanna Ravi", title:"CEO", email:"prasanna@pqstation.com", website:"https://www.pqstation.com", speakerOrder:7,
    pitch:"Finds every place an enterprise still uses encryption that quantum computers will break, then helps fix it." },
  { id:"screened", linkedin:"https://www.linkedin.com/in/wen-chen/", portrait:"assets/portraits/screened.jpg",
    name:"Screened", sub:"AI recruiter", tags:["AI","Enterprise"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Wen Chen", title:"Co-founder & CEO", email:"wen@screened.io", website:"https://screened.io/", speakerOrder:8,
    pitch:"An AI recruiter that screens resumes, runs first-round interviews and handles candidate messages, with a structured interview framework built in." },
  { id:"federation", linkedin:"https://www.linkedin.com/in/gaheeseo/", portrait:"assets/portraits/federation.jpg",
    name:"Federation", sub:"AI agents for trade paperwork", tags:["AI","Enterprise"], batch:"AW#33", hq:"KR", language:"English",
    presenter:"Gahee Seo", title:"CEO", email:"gahee@federationlabs.ai", website:"https://www.federationlabs.ai", speakerOrder:9,
    pitch:"AI agents that handle the trade paperwork manufacturers can't staff for — HS codes, tariffs, export rules — and use that knowledge to help them find and close deals." },
  { id:"vernus", linkedin:"https://www.linkedin.com/in/jimmy-yen-chu-lin-74785199/", portrait:"assets/portraits/vernus.jpg",
    name:"Vernus AI", sub:"AI & quantum simulation for drug manufacturing", tags:["AI","Manufacturing"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Jimmy Lin", title:"CEO", email:"jimmy.lin@vernus.ai", website:"https://vernus.ai/", speakerOrder:10,
    pitch:"ReAIX, an AI and quantum-simulation platform that optimizes how active pharmaceutical ingredients are manufactured, to bring production costs down." },
  { id:"netellus", linkedin:"https://www.linkedin.com/in/justinwu567/", portrait:"assets/portraits/netellus.jpg",
    name:"Netellus", sub:"Energy-saving upgrades for factories", tags:["Energy","Manufacturing"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Justin Wu", title:"CEO", email:"justin@netellus.com", website:"https://www.netellus.com/", speakerOrder:11,
    pitch:"Matches manufacturers with vetted energy-saving vendors and finances the equipment upgrade, so a factory can replace major equipment with nothing upfront." },
  { id:"teamsync", linkedin:"https://www.linkedin.com/in/jason-kao-66481a15a/", portrait:"assets/portraits/teamsync.jpg",
    name:"TeamSync AI", sub:"Enterprise AI OS", tags:["AI","Enterprise"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Jason Kao", title:"Founder & CEO", email:"jasonvan701228@gmail.com", website:"https://shuchenai.com", speakerOrder:12,
    pitch:"An enterprise AI OS that connects a company's scattered knowledge, AI agents and workflows — including the ERP — into one governed collaboration hub." },
  { id:"ofek",
    name:"Ofek", sub:"AI quality control for electronics lines", tags:["AI","Manufacturing"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Dario Weissmann", title:"CEO", email:"dariow@ofektaiwan.com", website:"https://www.ofektaiwan.com", speakerOrder:13,
    pitch:"Reads the data from every station on an electronics production line — inspection, test, repair — and flags defects and process drift before the boards ship." },
  { id:"coinpilot", linkedin:"https://www.linkedin.com/in/muijonathan/", portrait:"assets/portraits/coinpilot-sg.jpg",
    name:"Coinpilot", sub:"AI copilot for crypto trading", tags:["AI","On-chain"], batch:"AW#33", hq:"HK", language:"English",
    presenter:"Jonathan Mui", title:"Co-founder & CEO", email:"jon@coinpilot.com", website:"https://coinpilot.com", speakerOrder:14,
    pitch:"Arlo, an AI copilot that researches, monitors and reviews crypto trades while the human keeps control of every decision." },
  { id:"fluidkey", linkedin:"https://www.linkedin.com/in/moritzboullenger/", portrait:"assets/portraits/fluidkey.jpg",
    name:"Fluidkey", sub:"Offshore brokerage on crypto rails", tags:["On-chain"], batch:"AW#33", hq:"CH", language:"English",
    presenter:"Moritz Boullenger", title:"Co-founder & CEO", email:"moritz@fluidkey.com", website:"https://fluidkey.com", speakerOrder:15,
    pitch:"An offshore brokerage rebuilt on crypto rails, for investors in Asia." },
  { id:"stablecorp", linkedin:"https://linkedin.com/in/sangharsh-bhustalimath", portrait:"assets/portraits/stablecorp.jpg",
    name:"Stablecorp", sub:"Back office for stablecoin earners", tags:["On-chain"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Sangharsh Bhustalimath", title:"Co-founder & CEO", email:"10k@xelio.xyz", website:"https://mystablecorp.xyz", speakerOrder:16,
    pitch:"For founders and freelancers paid in stablecoins: a US company, business accounts, invoicing and tax filings in one place." },
  { id:"predictefy", linkedin:"https://www.linkedin.com/in/arvin-nathan-16638a16a/", portrait:"assets/portraits/predictefy.jpg",
    name:"Predictefy", sub:"Data & API layer for prediction markets", tags:["On-chain"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Arvin Nathan", title:"CEO", email:"tafcir@predictefy.com", website:"https://predictefy.com", speakerOrder:17,
    pitch:"One terminal and one API across prediction markets: normalized data, and matching of equivalent markets across venues." },
];

// Singapore run of show — per the SG Luma page (luma.com/DD33SGVIP).
const AGENDA = [
  { t:"15:45–16:00", title:"Registration",                                        tag:"Lobby",      now:false },
  { t:"16:00–16:05", title:"Opening Remarks",                                     tag:"Keynote",    now:false },
  { t:"16:05–16:40", title:`AppWorks #33 Startups Demo · ${TEAMS.length} teams`,  tag:"Pitches",    now:true  },
  { t:"16:40–18:00", title:"Open Floor & Networking · light bites, red & white wine", tag:"Networking", now:false },
];

const TABS = [
  { id:"teams",    label:"Teams" },
  { id:"agenda",   label:"Agenda" },
  { id:"about",    label:"About" },
];

Object.assign(window, { TEAMS, AGENDA, TABS });

// Shared components read ZH for labels; Singapore is English-only, so only the
// keys they touch are kept here.
const ZH = {
  tabs: { teams: '團隊', agenda: '議程', about: '關於' },
  teams: { heading: '登台團隊。', sub: '點選任一團隊即可收藏，或預約與創辦人交流。' },
  agenda: { heading: '議程。' },
  agendaTitles: [],
  album: { eyebrow: 'ACCUPAI 提供', heading: '活動即時相簿。', sub: '' },
  partners: { programs: '屆數', pitching: '今日登台團隊' },
  sponsors: { eyebrow: '感謝我們的贊助商與合作夥伴', heading: 'Demo Day 贊助夥伴。' },
  footer: { ctaTitle: 'AW#34 正在招募中！', ctaSub: '加入我們——或推薦一位創業者朋友。' },
  teamSub: {},
  teamPitch: {},
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

// Edition config — Singapore: English-only, no Wistron / live captions / album.
window.EVENT_CONFIG = {
  edition: 'SG',
  city: 'Singapore',
  eventName: 'AppWorks #33 Demo Day',
  batchLabel: 'AppWorks #33',
  nextBatch: 'AW#34',
  bilingual: false,
  wordly: false,
  album: false,
  wistron: false,
  // Key visual: image path = printed lockup · false = text wordmark · '' = empty slot (until the DD#33 artwork lands)
  keyVisual: '',
  nowOnStage: false,      // no live "on stage" takeover for SG
  heroDate: '17 Nov',
  heroTime: 'Tue · 15:45–18:00',
  heroVenueShort: 'Marina One',
  heroVenueSub: 'West Tower · Meeting Room 2',
  heroTeamsNote: 'AppWorks #33',
  heroLede: {
    en: `**${TEAMS.length} selected startups** from the **AppWorks #33** cohort — founders from ${MARKET_NAMES}.\n` +
        `The batch theme is **Compiling the Uncompilable**: AI that captures expert know-how and turns it into software any company can run — alongside **post-quantum security**, **defence drones** and **on-chain finance**.`,
  },
};
