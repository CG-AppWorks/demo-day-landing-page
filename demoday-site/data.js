// data.js — Demo Day team directory + supporting data
// Real DD#32 lineup — AppWorks Accelerator #32 (13 teams) + Wistron Accelerator #10 (4 placeholder teams).
// Order matches the run-of-show on event day.
// Languages: Mandarin pitches are flagged; English pitches default.
const TEAMS = [
  // ─── AppWorks Accelerator #32 ─ 13 teams ───
  { id:"notag",        order:1,  name:"NOTAG KOREA",      sub:"AI trading firm for e-commerce export",                  tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"KR", hq:"KR", nationality:"KR", language:"English",  presenter:"Aiden Ung Choi",       title:"CEO",                      email:"aiden0808@notaggroup.com",   website:"https://www.notaggroup.com/", favs:32, views:240, speakerOrder:1,
    pitch:"AI trading firm automates multi-country, multi-channel, and multi-brand e-commerce export logistics and distribution." },
  { id:"notify",       order:2,  name:"Notify",           sub:"AI-native marketing automation",                          tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"KR", hq:"KR", nationality:"KR", language:"English",  presenter:"Minyong Lee",          title:"Founder & CEO",            email:"minyong@greyboxhq.com",     website:"https://clix.so/",            favs:28, views:210, speakerOrder:2,
    pitch:"AI-native marketing automation solution." },
  { id:"krush",        order:3,  name:"Krush",            sub:"Dating & social for the global Asian community",          tags:["AI"],                  batch:"AW#32", stage:"Pitching", market:"US", hq:"US", nationality:"AU", language:"English",  presenter:"Stephen Kyungshin Moon", title:"CEO / Founder",          email:"curelation.co@gmail.com",   website:"https://www.krushdating.co",  favs:24, views:190, speakerOrder:3,
    pitch:"Dating and social platform connecting the global Asian community through cultural matching, offline events, and cross-border interactions." },
  { id:"innowave",     order:4,  name:"Innowave Tech",    sub:"Agentic AI for semiconductor & manufacturing",            tags:["AI","Manufacturing"],  batch:"AW#32", stage:"Pitching", market:"SG", hq:"SG", nationality:"SG", language:"Mandarin", presenter:"Xu Jinsong",           title:"CEO & Founder",            email:"jinsong.xu@innowave.com.sg", website:"https://www.innowave.com.sg", favs:41, views:320, speakerOrder:4,
    pitch:"Agentic AI solutions to Semiconductor and Manufacturing for Factory Autonomy." },
  { id:"lips",         order:5,  name:"LIPS",             sub:"Robotics vision & edge AI",                               tags:["AI","Manufacturing"],  batch:"AW#32", stage:"Pitching", market:"TW", hq:"TW", nationality:"TW", language:"Mandarin", presenter:"Luke Liu",             title:"CEO",                      email:"lukeliu@lips-hci.com",      website:"https://www.lips-hci.com",    favs:38, views:300, speakerOrder:5,
    pitch:"Robotics Vision Platform & Edge AI Solution Provider." },
  { id:"shieldbase",   order:6,  name:"Shieldbase",       sub:"Secure enterprise AI OS",                                  tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"SG", hq:"SG", nationality:"ARG", language:"English",  presenter:"Diego Rojas",          title:"Founder & CEO",            email:"diego@shieldbase.ai",       website:"https://shieldbase.ai",       favs:33, views:260, speakerOrder:6,
    pitch:"Secure enterprise AI OS unifying knowledge and systems to power agents and workflow." },
  { id:"omniease",     order:7,  name:"OmniEase AI",      sub:"Agentic AI for trade compliance & customs",               tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"SG", hq:"SG", nationality:"ID", language:"English",  presenter:"Sebastian Wijaya",     title:"CEO & Co-Founder",         email:"sebastian@omniease.ai",     website:"https://www.omniease.ai",     favs:22, views:170, speakerOrder:7,
    pitch:"Agentic AI for global trade compliance and customs automation." },
  { id:"pathors",      order:8,  name:"Pathors",          sub:"Voice AI for guided phone interactions",                   tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"TW", hq:"TW", nationality:"TW", language:"Mandarin", presenter:"Brandon Lu",           title:"COO",                      email:"contact@pathors.com",       website:"https://pathors.com/",        favs:19, views:160, speakerOrder:8,
    pitch:"Transforming complex phone interactions into guided, verifiable Voice AI workflows." },
  { id:"rosary",       order:9,  name:"Rosary Labs",      sub:"AI agents for AEC workflows",                              tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"MY", hq:"MY", nationality:"MY", language:"Mandarin", presenter:"May Law",              title:"Co-Founder",               email:"may@rosarylabs.ai",         website:"https://www.rosarylabs.ai",   favs:14, views:120, speakerOrder:9,
    pitch:"Builds AI agents that automate workflows across PDF, CAD, and BIM for the Architecture, Engineering and Construction (AEC) industry." },
  { id:"novo",         order:10, name:"Novo AI",          sub:"AI claim processing for insurance",                        tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"HK", hq:"HK", nationality:"FR", language:"English",  presenter:"Julien Condamines",    title:"Co-Founder & CRO",         email:"julien@heynovo.ai",         website:"https://heynovo.ai",          favs:21, views:170, speakerOrder:10,
    pitch:"AI claim processing automation and abuse prevention for insurance companies." },
  { id:"hyarks",       order:11, name:"Hyarks",           sub:"Multi-domain robotics for maritime",                       tags:["Dual-Use"],            batch:"AW#32", stage:"Pitching", market:"TW", hq:"TW", nationality:"ES", language:"English",  presenter:"Juan Herrero",         title:"Founder & CEO",            email:"juan.herrero@hyarks.com",   website:"https://www.hyarks.com/",     favs:29, views:230, speakerOrder:11,
    pitch:"Multi-domain robotic solutions to make the maritime ecosystem safe, sustainable and accessible." },
  { id:"arrivl",       order:12, name:"Arrivl",           sub:"AI visibility & agent sales analytics",                   tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"US", hq:"US", nationality:"TW", language:"Mandarin", presenter:"Ryan Chen",            title:"CEO",                      email:"ryan@arrivl.ai",            website:"https://www.auragtm.com",     favs:12, views:110, speakerOrder:12,
    pitch:"A tool for making your content more visible to agents and converting agent visits to sales." },
  { id:"decisionslab", order:13, name:"Decisions Lab",    sub:"Persona-simulating AI for B2B sales",                      tags:["AI","Enterprise"],     batch:"AW#32", stage:"Pitching", market:"HK", hq:"HK", nationality:"HK", language:"English",  presenter:"Louis Cheung",         title:"Co-Founder & CEO",         email:"louis@decisionslab.io",     website:"https://www.decisionslab.io", favs:17, views:140, speakerOrder:13,
    pitch:"Persona-simulating AI for B2B sales teams to predict each prospect's reaction before you send outreach." },

  // ─── Wistron Accelerator #10 ─ placeholder teams (please confirm real lineup) ───
  { id:"wa-team-1", order:14, name:"WA#10 Team A",    sub:"— placeholder —",                                          tags:["AI","Manufacturing"],  batch:"WA#10", stage:"Pitching", market:"TW", hq:"TW", nationality:"TW", language:"English",  presenter:"TBC",                  title:"—",                        email:"team@example.com",          website:"",                            favs:0,  views:0,   speakerOrder:14,
    pitch:"Placeholder — share the WA#10 lineup and I'll drop in the real team here." },
  { id:"wa-team-2", order:15, name:"WA#10 Team B",    sub:"— placeholder —",                                          tags:["AI","Manufacturing"],  batch:"WA#10", stage:"Pitching", market:"TW", hq:"TW", nationality:"TW", language:"English",  presenter:"TBC",                  title:"—",                        email:"team@example.com",          website:"",                            favs:0,  views:0,   speakerOrder:15,
    pitch:"Placeholder — share the WA#10 lineup and I'll drop in the real team here." },
  { id:"wa-team-3", order:16, name:"WA#10 Team C",    sub:"— placeholder —",                                          tags:["AI","Manufacturing"],  batch:"WA#10", stage:"Pitching", market:"TW", hq:"TW", nationality:"TW", language:"English",  presenter:"TBC",                  title:"—",                        email:"team@example.com",          website:"",                            favs:0,  views:0,   speakerOrder:16,
    pitch:"Placeholder — share the WA#10 lineup and I'll drop in the real team here." },
  { id:"wa-team-4", order:17, name:"WA#10 Team D",    sub:"— placeholder —",                                          tags:["AI","Manufacturing"],  batch:"WA#10", stage:"Pitching", market:"TW", hq:"TW", nationality:"TW", language:"English",  presenter:"TBC",                  title:"—",                        email:"team@example.com",          website:"",                            favs:0,  views:0,   speakerOrder:17,
    pitch:"Placeholder — share the WA#10 lineup and I'll drop in the real team here." },
];

const AGENDA = [
  { t:"12:00–13:00", title:"Registration",                             tag:"Lobby · 5F",  now:false },
  { t:"13:00–13:20", title:"Opening Remarks · Jamie Lin",              tag:"Keynote",     now:false },
  { t:"13:20–14:15", title:"AppWorks #32 Startups Demo · 13 teams",    tag:"Pitches",     now:true  },
  { t:"14:15–14:30", title:"Wistron Accelerator #10 Demo · 4 teams",   tag:"Pitches",     now:false },
  { t:"14:30–16:30", title:"Open Floor & Cocktail Networking",         tag:"Networking",  now:false, wide:true },
];

const TABS = [
  { id:"teams",    label:"Teams" },
  { id:"agenda",   label:"Agenda" },
  { id:"about",    label:"About" },
];

Object.assign(window, { TEAMS, AGENDA, TABS });
