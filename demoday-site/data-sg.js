// data-sg.js — Singapore edition team directory + supporting data.
// Source: Airtable "Company-Grid view" CSV, rows where DD SG = Yes (12 teams).
// English-only · no Wistron · no Wordly · no album.
// Pitch order is provisional (no SG order column in the sheet yet).
const TEAMS = [
  { id:"decisionslab", linkedin:"https://www.linkedin.com/in/louis-dlb11/", name:"Decisions Lab",  sub:"Persona-simulating AI for B2B sales",        tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"HK · US",  hq:"HK", language:"English", presenter:"Louis Cheung",        title:"Co-Founder & CEO", email:"louis@decisionslab.io",     website:"https://www.decisionslab.io", speakerOrder:1,
    pitch:"Persona-simulating AI for B2B sales teams to predict each prospect's reaction before you send outreach." },
  { id:"hyarks", linkedin:"https://www.linkedin.com/in/jhvalero/",       name:"Hyarks",          sub:"Robotics for the marine industry",           tags:["Dual-Use"],           batch:"AW#32", stage:"Pitching", market:"Global",   hq:"TW", language:"English", presenter:"Juan Herrero Valero", title:"Founder & CEO",    email:"juan.herrero@hyarks.com",   website:"https://www.hyarks.com/",     speakerOrder:2,
    pitch:"Multi-domain robotic solutions to make the maritime ecosystem safe, sustainable and accessible — built for ports, coast guards, oil & gas and navies." },
  { id:"innowave", linkedin:"https://www.linkedin.com/in/jinsong-xu-6ab5901b2/",     name:"Innowave Tech",   sub:"Agentic AI for semiconductor manufacturing", tags:["AI","Manufacturing"], batch:"AW#32", stage:"Pitching", market:"Global",   hq:"SG", language:"English", presenter:"Jinsong Xu",          title:"Founder & CEO",    email:"jinsong.xu@innowave.com.sg", website:"https://www.innowave.com.sg", speakerOrder:3,
    pitch:"Agentic AI for semiconductor and advanced manufacturing — driving factory autonomy." },
  { id:"krush", linkedin:"https://www.linkedin.com/in/stephenkyungshinmoon/",        name:"Krush",           sub:"Social & dating for the global Asian community", tags:["AI"],             batch:"AW#32", stage:"Pitching", market:"US · APAC", hq:"US", language:"English", presenter:"Stephen Moon",        title:"Founder & CEO",    email:"stephen.moon@curelation.co", website:"https://www.krushdating.co", speakerOrder:4,
    pitch:"Dating and social platform connecting the global Asian community through cultural matching, offline events, and cross-border interactions." },
  { id:"lips", linkedin:"https://www.linkedin.com/in/luke-liu-b301063b/",         name:"LIPS",            sub:"Robotics vision & edge AI",                  tags:["AI","Manufacturing"], batch:"AW#32", stage:"Pitching", market:"Global",   hq:"TW", language:"English", presenter:"Luke Liu",            title:"Founder",          email:"lukeliu@lips-hci.com",      website:"https://www.lips-hci.com",    speakerOrder:5,
    pitch:"Robotics vision platform and edge-AI solution provider." },
  { id:"notag", linkedin:"https://www.linkedin.com/in/aiden-ung-choi-6672b94a/",        name:"NOTAG KOREA",     sub:"AI trading for e-commerce export",           tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"SEA · KR", hq:"KR", language:"English", presenter:"Aiden Ung Choi",      title:"Founder",          email:"aiden0808@notaggroup.com",  website:"https://www.notaggroup.com/", speakerOrder:6,
    pitch:"AI trading firm automating multi-country, multi-channel and multi-brand e-commerce export logistics and distribution." },
  { id:"novo", linkedin:"https://www.linkedin.com/in/juliencondamines/",         name:"Novo AI",         sub:"AI claims processing for insurance",         tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"APAC · EU", hq:"HK", language:"English", presenter:"Julien Condamines",       title:"Co-Founder & CEO", email:"julien@heynovo.ai",         website:"https://heynovo.ai",          speakerOrder:7,
    pitch:"AI claim-processing automation and abuse prevention for insurance companies." },
  { id:"pathors", linkedin:"https://www.linkedin.com/in/brandonlu0924",      name:"Pathors",         sub:"Voice AI for phone interactions",            tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"TW · US",  hq:"TW", language:"English", presenter:"Yu-Chieh Cheng",      title:"Co-Founder & CEO", email:"brandon@pathors.com",       website:"https://pathors.com/",        speakerOrder:8,
    pitch:"Transforming complex phone interactions into guided, verifiable Voice AI workflows." },
  { id:"refundy", linkedin:"https://www.linkedin.com/in/jaekyeumkim/",      name:"Refundy",         sub:"Returns & refunds for cross-border commerce", tags:["AI","Enterprise"],   batch:"AW#32", stage:"Pitching", market:"KR · Global", hq:"KR", language:"English", presenter:"Jaekyeum Kim",        title:"Co-Founder & COO", email:"jk.kim@refundy.co",         website:"https://www.refundy.co/en",   speakerOrder:10,
    pitch:"Returns and refunds automation for cross-border e-commerce sellers sourcing from China to global marketplaces." },
  { id:"rosary", linkedin:"https://www.linkedin.com/in/may-law/",       name:"Rosary Labs",     sub:"AI agents for AEC workflows",                tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"MY",       hq:"MY", language:"English", presenter:"May Law",             title:"Co-Founder",       email:"may@rosarylabs.ai",         website:"https://www.rosarylabs.ai",   speakerOrder:11,
    pitch:"AI agents that automate workflows across PDF, CAD, and BIM for the Architecture, Engineering & Construction (AEC) industry." },
  { id:"shieldbase", linkedin:"https://www.linkedin.com/in/diegolrojas",   name:"Shieldbase",      sub:"Secure enterprise AI OS",                    tags:["AI","Enterprise"],    batch:"AW#32", stage:"Pitching", market:"SEA",      hq:"SG", language:"English", presenter:"Diego Rojas",         title:"Founder & CEO",    email:"diego@shieldbase.ai",       website:"https://shieldbase.ai",       speakerOrder:12,
    pitch:"Secure enterprise AI OS unifying knowledge and systems to power agents and workflows." },
];

// Singapore run-of-show — Tue 9 June 2026, Guoco Midtown Network Hub.
const AGENDA = [
  { t:"16:45–17:00", title:"VIP Registration",                       tag:"Lobby",      now:false },
  { t:"17:00–17:05", title:"Opening Remarks",                        tag:"Keynote",    now:false },
  { t:"17:05–17:20", title:"Keynote · KS Pua, CEO of Phison",        tag:"Keynote",    now:false },
  { t:"17:20–17:50", title:"AppWorks #32 Startups Demo",             tag:"Pitches",    now:true  },
  { t:"17:50–19:00", title:"Happy Hour · Cocktails & Networking",      tag:"Networking", now:false },
];

const TABS = [
  { id:"teams",    label:"Teams" },
  { id:"agenda",   label:"Agenda" },
  { id:"about",    label:"About" },
];

Object.assign(window, { TEAMS, AGENDA, TABS });

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
};
