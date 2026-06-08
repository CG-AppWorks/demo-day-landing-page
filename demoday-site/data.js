// data.js — Demo Day team directory + supporting data
// DD#32 Taiwan lineup — source: Airtable "Company-Grid view" CSV, rows where DD TW = Yes.
//   14 AppWorks Accelerator #32 teams + 4 Wistron Accelerator #10 (placeholder — not in the AW table).
// Pitch order: the CSV "TW Pitching Order" column was empty, so speakerOrder is provisional.
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
  { id:"lips", linkedin:"https://www.linkedin.com/in/luke-liu-b301063b/",         order:5,  name:"LIPS",             sub:"Robotics vision & edge AI",                               tags:["AI","Manufacturing"],  batch:"AW#32", stage:"Pitching", market:"Global",   hq:"TW", language:"Mandarin", presenter:"Luke Liu",              title:"Founder",            email:"lukeliu@lips-hci.com",      website:"https://www.lips-hci.com",    speakerOrder:5,
    pitch:"Robotics vision platform and edge-AI solution provider." },
  { id:"shieldbase", linkedin:"https://www.linkedin.com/in/diegolrojas",   order:6,  name:"Shieldbase",       sub:"Secure enterprise AI OS",                                  tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"SEA",      hq:"SG", language:"English",  presenter:"Diego Rojas",           title:"Founder & CEO",      email:"diego@shieldbase.ai",       website:"https://shieldbase.ai",       speakerOrder:6,
    pitch:"Secure enterprise AI OS unifying knowledge and systems to power agents and workflows." },
  { id:"omniease", linkedin:"https://www.linkedin.com/in/sebawija",     order:7,  name:"OmniEase AI",      sub:"AI for trade compliance & customs",                       tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"SEA · US", hq:"SG", language:"English",  presenter:"Sebastian Wijaya",      title:"Founder & CEO",      email:"sebastian@omniease.ai",     website:"https://www.omniease.ai",     speakerOrder:7,
    pitch:"Agentic AI for global trade compliance and customs automation." },
  { id:"pathors", linkedin:"https://www.linkedin.com/in/brandonlu0924",      order:8,  name:"Pathors",          sub:"Voice AI for phone interactions",                          tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"TW · US",  hq:"TW", language:"Mandarin", presenter:"Yu-Chieh Cheng",        title:"Co-Founder & CEO",   email:"brandon@pathors.com",       website:"https://pathors.com/",        speakerOrder:8,
    pitch:"Transforming complex phone interactions into guided, verifiable Voice AI workflows." },
  { id:"rosary", linkedin:"https://www.linkedin.com/in/may-law/",       order:9,  name:"Rosary Labs",      sub:"AI agents for AEC workflows",                              tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"MY",       hq:"MY", language:"Mandarin", presenter:"May Law",               title:"Co-Founder",         email:"may@rosarylabs.ai",         website:"https://www.rosarylabs.ai",   speakerOrder:9,
    pitch:"AI agents that automate workflows across PDF, CAD, and BIM for the Architecture, Engineering & Construction (AEC) industry." },
  { id:"novo", linkedin:"https://www.linkedin.com/in/juliencondamines/",         order:10, name:"Novo AI",          sub:"AI claims processing for insurance",                       tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"APAC · EU", hq:"HK", language:"English",  presenter:"Julien Condamines",         title:"Co-Founder & CEO",   email:"julien@heynovo.ai",         website:"https://heynovo.ai",          speakerOrder:10,
    pitch:"AI claim-processing automation and abuse prevention for insurance companies." },
  { id:"hyarks", linkedin:"https://www.linkedin.com/in/jhvalero/",       order:11, name:"Hyarks",           sub:"Robotics for the marine industry",                         tags:["Dual-Use"],            batch:"AW#32", stage:"Pitching", market:"Global",   hq:"TW", language:"English",  presenter:"Juan Herrero Valero",   title:"Founder & CEO",      email:"juan.herrero@hyarks.com",   website:"https://www.hyarks.com/",     speakerOrder:11,
    pitch:"Multi-domain robotic solutions to make the maritime ecosystem safe, sustainable and accessible — built for ports, coast guards, oil & gas and navies." },
  { id:"arrivl", linkedin:"https://www.linkedin.com/in/ryanchen056/",       order:12, name:"Arrivl",           sub:"AI visibility & agent-driven sales",                      tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"US · EU · UK", hq:"US", language:"Mandarin", presenter:"Ryan Chen",             title:"Co-Founder & CEO",   email:"ryan@auragtm.com",          website:"https://arrivl.ai/",          speakerOrder:12,
    pitch:"A tool for making your content more visible to AI agents — and converting agent visits into sales." },
  { id:"decisionslab", linkedin:"https://www.linkedin.com/in/louis-dlb11/", order:13, name:"Decisions Lab",    sub:"Persona-simulating AI for B2B sales",                      tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"HK · US",  hq:"HK", language:"English",  presenter:"Louis Cheung",          title:"Co-Founder & CEO",   email:"louis@decisionslab.io",     website:"https://www.decisionslab.io", speakerOrder:13,
    pitch:"Persona-simulating AI for B2B sales teams to predict each prospect's reaction before you send outreach." },
  { id:"sixsense", linkedin:"https://www.linkedin.com/in/akanksha-jagwani-a7489041",     order:14, name:"SixSense",         sub:"AI quality control for manufacturing",                     tags:["AI","Manufacturing"],  batch:"AW#32", stage:"Pitching", market:"SG · TW · US", hq:"SG", language:"English",  presenter:"Akanksha Jagwani",      title:"Co-Founder & CEO",   email:"akanksha@sixsense.ai",      website:"https://www.sixsense.ai",     speakerOrder:14,
    pitch:"AI manufacturing platform automating defect inspection and predictive quality control to lift yield and cycle time for semiconductor and advanced manufacturing lines." },

  // ─── Wistron Accelerator #10 ─ placeholder teams (not in the AppWorks CSV — confirm real lineup) ───
  { id:"phasetrum", order:1, name:"Phasetrum", sub:"Phased-array RF chips for satellites", tags:["Dual-Use","Manufacturing"], batch:"WA#10", stage:"Pitching", market:"Global", hq:"TW", language:"Mandarin", presenter:"Wayne Tsai", title:"Founder & CEO", email:"wayne@phasetrum.com", website:"https://phasetrum.com", speakerOrder:1,
    pitch:"AIP + patented Phase Tuner architecture for phased-array antennas — 99% yield, 50% less power, 10× faster calibration for LEO satellite, AESA radar and 6G." },
  { id:"ruomei", order:2, name:"Ruomei", sub:"Nano thermal-management materials", tags:["Manufacturing"], batch:"WA#10", stage:"Pitching", market:"Global", hq:"TW", language:"Mandarin", presenter:"Owen Lee", title:"Founder & CEO", email:"jackylin@ruomei.com.tw", website:"https://ruomei.com.tw/", speakerOrder:2,
    pitch:"Nano-scale thermal solder mask + microchannel cooling that drop in to existing SMT lines, cutting AI-chip temperatures with zero process change — 'aluminum-for-copper' lightweighting." },
  { id:"greenbidz", order:3, name:"GreenBidz", sub:"Circular-asset marketplace & ESG", tags:["AI","Enterprise"], batch:"WA#10", stage:"Pitching", market:"Asia", hq:"TW", language:"Mandarin", presenter:"Jerry Yiu", title:"Founder & CEO", email:"jyiu@greenbidz.com", website:"https://greenbidz.com", speakerOrder:3,
    pitch:"SaaS-enabled B2B marketplace that helps factories recover value from surplus equipment while auto-capturing the CO₂ and lifecycle data enterprises need for ESG reporting." },
  { id:"cloudstation", order:4, name:"CloudStation", sub:"Deploy apps & AI agents to any cloud", tags:["AI","Enterprise"], batch:"WA#10", stage:"Pitching", market:"Global", hq:"FR", language:"English", presenter:"Oumnya Benhassou", title:"Co-Founder & CEO", email:"oumnya@cloud-station.io", website:"https://cloud-station.io", speakerOrder:4,
    pitch:"A no-code, multi-cloud platform that lets non-technical founders deploy apps, databases and autonomous AI agents — 'the technical co-founder you don't give equity to.'" },
];

const AGENDA = [
  { t:"12:00–13:00", title:"Registration",                             tag:"Lobby · 5F",  now:false },
  { t:"13:00–13:20", title:"Opening",              tag:"Keynote",     now:false },
  { t:"13:20–14:00", title:"AppWorks #32 Startups Demo · 14 teams",    tag:"Pitches",     now:true  },
  { t:"14:00–14:30", title:"Wistron #10 Startups Demo · 4 teams",   tag:"Pitches",     now:false },
  { t:"14:30–16:30", title:"Open Floor & Cocktail Networking",         tag:"Networking",  now:false, wide:true },
];

const TABS = [
  { id:"teams",    label:"Teams" },
  { id:"agenda",   label:"Agenda" },
  { id:"about",    label:"About" },
];

Object.assign(window, { TEAMS, AGENDA, TABS });

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
};
