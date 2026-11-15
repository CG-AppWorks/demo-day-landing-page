// data-sg.js — Singapore edition team directory + supporting data.
// DD#33 Singapore lineup (Tue 17 Nov 2026, Marina One West) — DRAFT.
// Source: "DD#33 MC materials (Cg)" sheet, tab "DD founder info for MCs" (SG = 1),
//   in its "Pitching order (SG)" order (Nov 10): 15 AppWorks Accelerator #33 teams;
//   Screened dropped Nov 13 (Cg) -> 14 teams, later teams moved up one.
// Logos and portraits mirror data.js; Coinpilot's presenter differs (Jonathan Mui).
// One-liners: "AW#33 One-liner (Cg)" doc, accepted text as of Nov 15 (pending suggestions not applied).
// English-only · no Wistron · no live captions · no album.
const TEAMS = [
  { id:"ailytics", logo:"assets/logos/ailytics.png", linkedin:"https://www.linkedin.com/in/wei-zhuang-tan/", portrait:"assets/portraits/ailytics.jpg",
    name:"Ailytics", sub:"AI safety & productivity from existing cameras", tags:["Manufacturing AI","Enterprise AI"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Lenard Tan", title:"Founder & CEO", email:"weizhuang.tan@ailytics.ai", website:"https://ailytics.ai/", speakerOrder:1,
    pitch:"Turns any existing factory or construction camera into an AI safety and productivity monitor, with no new hardware required." },
  { id:"remited", logo:"assets/logos/remited.png", portrait:"assets/portraits/remited.jpg", linkedin:"https://www.linkedin.com/in/brian-bae-ba638a131/",
    name:"Team REmited", sub:"Receipt rewards that become purchase data", tags:["Enterprise AI"], batch:"AW#33", hq:"KR", language:"English",
    presenter:"Brian Bae", title:"Co-founder & CEO", email:"sh.bae@teamremited.com", website:"https://www.teamremited.com", speakerOrder:2,
    pitch:"Carty turns Korean shoppers' receipts into item-level commerce AI — the only dataset linking who bought what across online and offline." },
  { id:"huemankind", logo:"assets/logos/huemankind.png", logoMark:true, linkedin:"https://www.linkedin.com/in/jenn-woei-loh-66719131/", portrait:"assets/portraits/huemankind.jpg",
    name:"huemankind", sub:"AI content studio for SMEs selling on WhatsApp", tags:["Enterprise AI"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Jenn Woei Loh", title:"CEO", email:"zennith@huemankind.world", website:"https://zenneth.ai", speakerOrder:3,
    pitch:"An AI native creative agency that creates, publishes, and monitors brand social media, with paid-growth attribution for brands scaling ad spend." },
  { id:"alphaswift", logo:"assets/logos/alphaswift.png", logoMark:true, linkedin:"https://www.linkedin.com/in/shianlee/", portrait:"assets/portraits/alphaswift.jpg",
    name:"Alphaswift Industries", sub:"Autonomous cargo drones, built in Malaysia", tags:["Defense Tech"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Dr. Shian Lee", title:"Co-founder & CEO", email:"shian@alphaswift.com", website:"https://alphaswift.com/", speakerOrder:4,
    pitch:"Autonomous drones built on vendor agnostic supply chain, with in-house controllers and flight software, for defense and logistics use cases." },
  { id:"ennovation", logo:"assets/logos/ennovation.png", linkedin:"https://www.linkedin.com/in/adeline-yang-h", portrait:"assets/portraits/ennovation.jpg",
    name:"Ennovation", sub:"One-size myopia control for children", tags:["Health Tech"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Adeline Yang", title:"Founder", email:"contact@ennovation.io", website:"https://www.myopreva.com", speakerOrder:5,
    pitch:"One-size-fits-all myopia control for children — a single non-invasive SKU built to reach the 90% who go untreated." },
  { id:"pqstation", logo:"assets/logos/pqstation.png", linkedin:"https://www.linkedin.com/in/prasanna-ravi-071a8679/", portrait:"assets/portraits/pqstation.jpg",
    name:"PQStation", sub:"Post-quantum migration for enterprises", tags:["PQC"], batch:"AW#33", hq:"SG", language:"English",
    presenter:"Dr. Prasanna Ravi", title:"CEO", email:"prasanna@pqstation.com", website:"https://www.pqstation.com", speakerOrder:6,
    pitch:"Finds an enterprise's vulnerable cryptography and automates the fix, taking banks and critical infrastructure quantum-safe end to end." },
  { id:"federation", logo:"assets/logos/federation.png", linkedin:"https://www.linkedin.com/in/gaheeseo/", portrait:"assets/portraits/federation.jpg",
    name:"Federation", sub:"AI agents for trade paperwork", tags:["Enterprise AI"], batch:"AW#33", hq:"KR", language:"English",
    presenter:"Gahee Seo", title:"CEO", email:"gahee@federationlabs.ai", website:"https://federationlabs.ai/en", speakerOrder:7,
    pitch:"AI trade agents that clear the whole export cycle, from HS codes and FTA tariffs to closed deals, for APAC SME manufacturers." },
  { id:"vernus", logo:"assets/logos/vernus.png", linkedin:"https://www.linkedin.com/in/jimmy-yen-chu-lin-74785199/", portrait:"assets/portraits/vernus.jpg",
    name:"Vernus AI", sub:"AI & quantum simulation for drug manufacturing", tags:["Manufacturing AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Jimmy Lin", title:"CEO", email:"jimmy.lin@vernus.ai", website:"https://vernus.ai/", speakerOrder:8,
    pitch:"An AI trained as a process chemist, not a black box: it explains why a pharma manufacturing run drifts, not just that it did." },
  { id:"netellus", logo:"assets/logos/netellus.png", linkedin:"https://www.linkedin.com/in/justinwu567/", portrait:"assets/portraits/netellus.jpg",
    name:"Netellus", sub:"Energy-saving upgrades for factories", tags:["Enterprise AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Justin Wu", title:"CEO", email:"justin@netellus.com", website:"https://www.netellus.com/", speakerOrder:9,
    pitch:"AI matchmaking and a verified vendor graph that get corporates through energy-saving retrofits with zero upfront capital." },
  { id:"teamsync", logo:"assets/logos/teamsync.png", logoMark:true, linkedin:"https://www.linkedin.com/in/jason-kao-66481a15a/", portrait:"assets/portraits/teamsync.jpg",
    name:"ShuChen AI", sub:"Enterprise AI OS (TeamSync AI)", tags:["Enterprise AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Jason Kao", title:"Founder & CEO", email:"jasonvan701228@gmail.com", website:"https://shuchenai.com", speakerOrder:10,
    pitch:"TeamSync AI pulls scattered enterprise knowledge, workflows, and role-based agents into one governed operating hub." },
  { id:"ofek", logo:"assets/logos/ofek.png", portrait:"assets/portraits/ofek.jpg",
    name:"Ofek", sub:"AI quality control for electronics lines", tags:["Manufacturing AI"], batch:"AW#33", hq:"TW", language:"English",
    presenter:"Dario Weissmann", title:"CEO", email:"dariow@ofektaiwan.com", website:"https://www.ofektaiwan.com", speakerOrder:11,
    pitch:"HeatVision reads every station on an electronics line in real time, catching defects and process drift before they leave the factory." },
  { id:"coinpilot", logo:"assets/logos/coinpilot.png", linkedin:"https://www.linkedin.com/in/muijonathan/", portrait:"assets/portraits/coinpilot-sg.jpg",
    name:"Coinpilot", sub:"AI copilot for crypto trading", tags:["On-Chain Banking"], batch:"AW#33", hq:"HK", language:"English",
    presenter:"Jonathan Mui", title:"Co-founder & CEO", email:"jon@coinpilot.com", website:"https://coinpilot.com", speakerOrder:12,
    pitch:"An AI copilot that walks retail traders through research, live monitoring, and post-trade review, replacing gut feel with discipline." },
  { id:"fluidkey", logo:"assets/logos/fluidkey.png", linkedin:"https://www.linkedin.com/in/moritzboullenger/", portrait:"assets/portraits/fluidkey.jpg",
    name:"Fluidkey", sub:"Offshore brokerage on crypto rails", tags:["On-Chain Banking"], batch:"AW#33", hq:"CH", language:"English",
    presenter:"Moritz Boullenger", title:"Co-founder & CEO", email:"moritz@fluidkey.com", website:"https://fluidkey.com", speakerOrder:13,
    pitch:"Offshore USD and US-equity investing for mass-affluent Asia, opened in minutes on crypto rails instead of weeks through legacy brokers." },
  { id:"stablecorp", logo:"assets/logos/stablecorp.png", logoMark:true, linkedin:"https://linkedin.com/in/sangharsh-bhustalimath", portrait:"assets/portraits/stablecorp.jpg",
    name:"Stablecorp", sub:"Back office for stablecoin earners", tags:["On-Chain Banking"], batch:"AW#33", hq:"MY", language:"English",
    presenter:"Sangharsh Bhustalimath", title:"Co-founder & CEO", email:"10k@xelio.xyz", website:"https://mystablecorp.xyz", speakerOrder:14,
    pitch:"Incorporation, treasury, invoicing, and compliance for the growing class of founders and freelancers who get paid in stablecoins." },
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
  // Key visual: image path = printed lockup · false = text wordmark · '' = empty slot
  keyVisual: 'assets/dd33-keyvisual-sg.webp',
  nowOnStage: false,      // no live "on stage" takeover for SG
  heroDate: '17 Nov',
  heroTime: 'Tue · 15:45–18:00',
  heroVenueShort: 'Marina One',
  heroVenueSub: 'West Tower · Meeting Room 2',
  heroTeamsNote: 'AppWorks #33',
  // Intro copy from Alyssa (Nov 12). Blank line = new paragraph; team + market counts follow the lineup.
  // Her title line "AppWorks Demo Day #33 · Singapore" is now carried by the key visual
  // (set heroTitle to show it as text again).
  heroLede: {
    en: `Twice a year, AppWorks brings a new accelerator cohort to Demo Days in several cities.\n` +
        `For Singapore, we chose the AW#33 teams that are building for Southeast Asia and its wider region, and they come ready to raise funding and find partners.\n` +
        `In two focused hours, you’ll see ${TEAMS.length} international teams pitch and meet the founders in person.\n\n` +
        `This cohort’s strength is in applied AI. More than half of AW#33 build AI that turns hard-won industry know-how into software any company can run, in areas such as trade compliance, factory engineering and construction safety. Other teams work in deep tech: post-quantum cryptography, defense drones and on-chain finance.\n\n` +
        `The founders come from ${MARKET_COUNT} markets, and over half the teams include a repeat founder. Two teams already make more than US$1M a year in revenue.\n\n` +
        `Enjoy the show, and let the conversations begin!`,
  },
  // Demo Day sponsors (logos from Ona's "(Newlogos)_DD#33TW" folder, 2026H2 versions).
  sponsors: [
    { name: 'Google Cloud', src: 'assets/sponsor-dd33-google-cloud.png', h: 30 },
    { name: 'AWS', src: 'assets/sponsor-dd33-aws.png', h: 56 },
    { name: 'KKCOMPANY', src: 'assets/sponsor-dd33-kkcompany.png', h: 50 },
    { name: 'Stripe', src: 'assets/sponsor-dd33-stripe.png', h: 40 },   // SG only
  ],
  // Anonymous page-view / click counts (analytics.js) — read at <this URL>/stats.
  analytics: 'https://ddtw-captions.hsichun.workers.dev',
};
