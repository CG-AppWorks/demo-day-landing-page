// data-sg.js — Singapore edition team directory + supporting data.
// DD#33 Singapore lineup (Tue 17 Nov 2026, Marina One West) — DRAFT.
// Source: "DD#33 MC materials (Cg)" sheet, tab "DD founder info for MCs" (SG = 1),
//   in its "Pitching order (SG)" order (Nov 10): 15 AppWorks Accelerator #33 teams.
// Card copy, logos and portraits mirror data.js; Coinpilot's presenter differs (Jonathan Mui).
// English-only · no Wistron · no live captions · no album.
const TEAMS = [
  { id:"ailytics", logo:"assets/logos/ailytics.png", linkedin:"https://www.linkedin.com/in/wei-zhuang-tan/", portrait:"assets/portraits/ailytics.jpg",
    name:"Ailytics", sub:"AI safety & productivity from existing cameras", tags:["Manufacturing AI","Enterprise AI"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Lenard Tan", title:"Founder & CEO", email:"weizhuang.tan@ailytics.ai", website:"https://ailytics.ai/", speakerOrder:1,
    pitch:"Turns the cameras a construction site or factory already has into an AI system that spots safety risks and productivity losses in real time." },
  { id:"remited", logo:"assets/logos/remited.png", portrait:"assets/portraits/remited.jpg", linkedin:"https://www.linkedin.com/in/brian-bae-ba638a131/",
    name:"Team REmited", sub:"Receipt rewards that become purchase data", tags:["Enterprise AI"], batch:"AW#33", hq:"KR", language:"English",
    presenter:"Brian Bae", title:"Co-founder & CEO", email:"sh.bae@teamremited.com", website:"https://www.teamremited.com", speakerOrder:2,
    pitch:"Carty rewards shoppers for uploading receipts, turning them into item-level purchase data that powers commerce AI for brands." },
  { id:"huemankind", logo:"assets/logos/huemankind.png", logoMark:true, linkedin:"https://www.linkedin.com/in/jenn-woei-loh-66719131/", portrait:"assets/portraits/huemankind.jpg",
    name:"huemankind", sub:"AI content studio for SMEs selling on WhatsApp", tags:["Enterprise AI"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Jenn Woei Loh", title:"CEO", email:"zennith@huemankind.world", website:"https://zenneth.ai", speakerOrder:3,
    pitch:"An AI content studio for SMEs that sell over WhatsApp: it creates and publishes the content, then traces each ad through the chat to the sale it produced." },
  { id:"alphaswift", logo:"assets/logos/alphaswift.png", logoMark:true, linkedin:"https://www.linkedin.com/in/shianlee/", portrait:"assets/portraits/alphaswift.jpg",
    name:"Alphaswift Industries", sub:"Autonomous cargo drones, built in Malaysia", tags:["Defense Tech"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Dr. Shian Lee", title:"Co-founder & CEO", email:"shian@alphaswift.com", website:"https://alphaswift.com/", speakerOrder:4,
    pitch:"Designs, builds and flies autonomous cargo drones with its own flight controllers and software, giving defense and industrial buyers a drone supply chain free of Chinese components." },
  { id:"ennovation", logo:"assets/logos/ennovation.png", linkedin:"https://www.linkedin.com/in/adeline-yang-h", portrait:"assets/portraits/ennovation.jpg",
    name:"Ennovation", sub:"One-size myopia control for children", tags:["Health Tech"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Adeline Yang", title:"Founder", email:"contact@ennovation.io", website:"https://www.myopreva.com", speakerOrder:5,
    pitch:"MyoPREVA, a one-size myopia-control product for children that is easy to apply and non-invasive." },
  { id:"pqstation", logo:"assets/logos/pqstation.png", linkedin:"https://www.linkedin.com/in/prasanna-ravi-071a8679/", portrait:"assets/portraits/pqstation.jpg",
    name:"PQStation", sub:"Post-quantum migration for enterprises", tags:["PQC"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Dr. Prasanna Ravi", title:"CEO", email:"prasanna@pqstation.com", website:"https://www.pqstation.com", speakerOrder:6,
    pitch:"Finds every place an enterprise still uses encryption that quantum computers will break, then helps fix it." },
  { id:"screened", logo:"assets/logos/screened.png", linkedin:"https://www.linkedin.com/in/wen-chen/", portrait:"assets/portraits/screened.jpg",
    name:"Screened", sub:"AI recruiter", tags:["Enterprise AI"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Wen Chen", title:"Co-founder & CEO", email:"wen@screened.io", website:"https://screened.io/", speakerOrder:7,
    pitch:"An AI recruiter that screens resumes, runs first-round interviews and handles candidate messages, with a structured interview framework built in." },
  { id:"federation", logo:"assets/logos/federation.png", linkedin:"https://www.linkedin.com/in/gaheeseo/", portrait:"assets/portraits/federation.jpg",
    name:"Federation", sub:"AI agents for trade paperwork", tags:["Enterprise AI"], batch:"AW#33", hq:"KR", language:"English",
    presenter:"Gahee Seo", title:"CEO", email:"gahee@federationlabs.ai", website:"https://www.federationlabs.ai", speakerOrder:8,
    pitch:"AI agents that handle the trade paperwork manufacturers can't staff for — HS codes, tariffs, export rules — and use that knowledge to help them find and close deals." },
  { id:"vernus", logo:"assets/logos/vernus.png", linkedin:"https://www.linkedin.com/in/jimmy-yen-chu-lin-74785199/", portrait:"assets/portraits/vernus.jpg",
    name:"Vernus AI", sub:"AI & quantum simulation for drug manufacturing", tags:["Manufacturing AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Jimmy Lin", title:"CEO", email:"jimmy.lin@vernus.ai", website:"https://vernus.ai/", speakerOrder:9,
    pitch:"ReAIX, an AI and quantum-simulation platform that optimizes how active pharmaceutical ingredients are manufactured, to bring production costs down." },
  { id:"netellus", logo:"assets/logos/netellus.png", linkedin:"https://www.linkedin.com/in/justinwu567/", portrait:"assets/portraits/netellus.jpg",
    name:"Netellus", sub:"Energy-saving upgrades for factories", tags:["Enterprise AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Justin Wu", title:"CEO", email:"justin@netellus.com", website:"https://www.netellus.com/", speakerOrder:10,
    pitch:"Matches manufacturers with vetted energy-saving vendors and finances the equipment upgrade, so a factory can replace major equipment with nothing upfront." },
  { id:"teamsync", logo:"assets/logos/teamsync.png", logoMark:true, linkedin:"https://www.linkedin.com/in/jason-kao-66481a15a/", portrait:"assets/portraits/teamsync.jpg",
    name:"TeamSync AI", sub:"Enterprise AI OS", tags:["Enterprise AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Jason Kao", title:"Founder & CEO", email:"jasonvan701228@gmail.com", website:"https://shuchenai.com", speakerOrder:11,
    pitch:"An enterprise AI OS that connects a company's scattered knowledge, AI agents and workflows — including the ERP — into one governed collaboration hub." },
  { id:"ofek", logo:"assets/logos/ofek.png", portrait:"assets/portraits/ofek.jpg",
    name:"Ofek", sub:"AI quality control for electronics lines", tags:["Manufacturing AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Dario Weissmann", title:"CEO", email:"dariow@ofektaiwan.com", website:"https://www.ofektaiwan.com", speakerOrder:12,
    pitch:"Reads the data from every station on an electronics production line — inspection, test, repair — and flags defects and process drift before the boards ship." },
  { id:"coinpilot", logo:"assets/logos/coinpilot.png", linkedin:"https://www.linkedin.com/in/muijonathan/", portrait:"assets/portraits/coinpilot-sg.jpg",
    name:"Coinpilot", sub:"AI copilot for crypto trading", tags:["On-Chain Banking"], batch:"AW#33", hq:"HK", language:"English",
    presenter:"Jonathan Mui", title:"Co-founder & CEO", email:"jon@coinpilot.com", website:"https://coinpilot.com", speakerOrder:13,
    pitch:"Arlo, an AI copilot that researches, monitors and reviews crypto trades while the human keeps control of every decision." },
  { id:"fluidkey", logo:"assets/logos/fluidkey.png", linkedin:"https://www.linkedin.com/in/moritzboullenger/", portrait:"assets/portraits/fluidkey.jpg",
    name:"Fluidkey", sub:"Offshore brokerage on crypto rails", tags:["On-Chain Banking"], batch:"AW#33", hq:"CH", language:"English",
    presenter:"Moritz Boullenger", title:"Co-founder & CEO", email:"moritz@fluidkey.com", website:"https://fluidkey.com", speakerOrder:14,
    pitch:"An offshore brokerage rebuilt on crypto rails, for investors in Asia." },
  { id:"stablecorp", logo:"assets/logos/stablecorp.png", logoMark:true, linkedin:"https://linkedin.com/in/sangharsh-bhustalimath", portrait:"assets/portraits/stablecorp.jpg",
    name:"Stablecorp", sub:"Back office for stablecoin earners", tags:["On-Chain Banking"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Sangharsh Bhustalimath", title:"Co-founder & CEO", email:"10k@xelio.xyz", website:"https://mystablecorp.xyz", speakerOrder:15,
    pitch:"For founders and freelancers paid in stablecoins: a US company, business accounts, invoicing and tax filings in one place." },
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

// Number of distinct HQ markets in the lineup (quoted in the intro).
const MARKET_COUNT = new Set(TEAMS.map((t) => t.hq).filter(Boolean)).size;

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
  // Intro copy from Alyssa (Nov 12). Blank line = new paragraph; team + market counts follow the lineup.
  heroTitle: 'AppWorks Demo Day #33 · Singapore',
  heroLede: {
    en: `Twice a year, AppWorks brings a new accelerator cohort to Demo Days in several cities.\n` +
        `For Singapore, we chose the AW#33 teams that are building for Southeast Asia and its wider region, and they come ready to raise funding and find partners.\n` +
        `In two focused hours, you’ll see ${TEAMS.length} international teams pitch and meet the founders in person.\n\n` +
        `This cohort’s strength is in applied AI. More than half of AW#33 build AI that turns hard-won industry know-how into software any company can run, in areas such as trade compliance, factory engineering and construction safety. Other teams work in deep tech: post-quantum cryptography, defense drones and on-chain finance.\n\n` +
        `The founders come from ${MARKET_COUNT} markets, and over half the teams include a repeat founder. Two teams already make more than US$1M a year in revenue.\n\n` +
        `Enjoy the show, and let the conversations begin!`,
  },
  // Anonymous page-view / click counts (analytics.js) — read at <this URL>/stats.
  analytics: 'https://ddtw-captions.hsichun.workers.dev',
};
