// Generated from sections.jsx by tools/build-jsx.mjs — edit the .jsx, then rebuild.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// sections.jsx — Agenda, Album, About, Partners, Sponsors, IntroModal

function Agenda(_ref) {
  var language = _ref.language;
  return /*#__PURE__*/React.createElement("section", {
    className: "section bone",
    id: "agenda"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, tr(language, 'Agenda.', ZH.agenda.heading)))), /*#__PURE__*/React.createElement("div", {
    className: "agenda".concat(window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false ? ' one-col' : '')
  }, AGENDA.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "slot",
      style: s.wide ? {
        gridColumn: '1/-1'
      } : {}
    }, /*#__PURE__*/React.createElement("div", {
      className: "t"
    }, s.t), /*#__PURE__*/React.createElement("div", {
      className: "title"
    }, tr(language, s.title, (ZH.agendaTitles || [])[i])));
  }))));
}
window.Agenda = Agenda;
function Album(_ref2) {
  var language = _ref2.language;
  var ALBUM_URL = (window.EVENT_CONFIG || {}).albumUrl;
  return /*#__PURE__*/React.createElement("section", {
    className: "section tight",
    id: "album"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, tr(language, 'POWERED BY ACCUPAI', ZH.album.eyebrow)), /*#__PURE__*/React.createElement("h2", null, tr(language, 'Live photo album.', ZH.album.heading)), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, tr(language, 'Real-time event photos — view, download, and share on the spot.', ZH.album.sub))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "btn primary",
    href: ALBUM_URL,
    target: "_blank",
    rel: "noopener",
    "data-track": "album",
    "data-x": "open"
  }, tr(language, 'Open live album', '開啟即時相簿'), " ", /*#__PURE__*/React.createElement(I.arrow, null))))));
}
window.Album = Album;
function About(_ref3) {
  var language = _ref3.language;
  // Follow the nav language toggle. Non-bilingual editions (e.g. SG) stay English.
  var zh = (window.EVENT_CONFIG ? window.EVENT_CONFIG.bilingual !== false : true) && language === 'zh';
  var cards = [{
    title: "AppWorks",
    en: "Founded in 2009, AppWorks is an accelerator built by founders, for founders — which has since expanded into a broader startup community and venture capital platform. Just as the Mobile Internet reshaped entire industries, we believe AI and blockchain are driving the next major paradigm shift. Founders lead the work of building great companies; our role is to support them from the seed stage onward with long-term guidance, capital, and a strong regional network.",
    zh: "2009 年成立，由「創業者」為「創業者」設立的加速器，以及基於加速器發展的新創社群與創投機構，致力協助下世代的創業者抓住數位革命的成長機會。正如行動網路曾引發巨大的產業變革，我們相信 AI 與區塊鏈正推動新一波關鍵的典範轉移。創業者是主角，投資人是配角；我們從種子時期開始支持團隊，陪著他們打造區域級、世界級的偉大企業。",
    link: "https://appworks.tw/",
    stats: [{
      v: "680",
      l: "Startups",
      lz: "新創",
      num: true
    }, {
      v: "2,168",
      l: "Founders",
      lz: "創業者",
      num: true
    }, {
      v: /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#ff6b0f'
        }
      }, zh ? "亞洲跨境" : "Pan-Asia"),
      l: "Region",
      lz: "布局"
    }]
  }, {
    title: "AppWorks Accelerator",
    en: "Founded in 2010, AppWorks Accelerator selects the most promising teams every six months, helping founders go from 0 to 1 to product–market fit and scale. As of Q3 2026, the ecosystem spans 680 active startups and 2,168 founders — including 135 AI startups and 144 Web3 startups. Collectively they have raised US$ 8.2B, reached US$ 43.4B in valuation, generate US$ 19.7B in annual revenue, and created 28,592 jobs across 9 markets.",
    zh: "2010 年成立，每半年遴選最具潛力的團隊，協助創業者從 0 到 1 找到產品與市場的契合點，並在成長階段建立可持續且可擴張的商業模式。截至 2026 年第三季，生態系共有 680 家活躍新創、2,168 位創業者，包含 135 家 AI 新創與 144 家 Web3 新創；合計募得 82 億美元，總市值 434 億美元，年營收 197 億美元，提供 28,592 個工作機會，橫跨台灣、印尼、新加坡、馬來西亞、越南、菲律賓、韓國、日本與香港等九大市場。",
    link: "https://appworks.tw/accelerator/",
    stats: [{
      v: "US$ 8.2B",
      vz: ["82", "億美元"],
      l: "Total Raised",
      lz: "總募資",
      num: true
    }, {
      v: "US$ 43.4B",
      vz: ["434", "億美元"],
      l: "Total Valuation",
      lz: "總市值",
      num: true
    }, {
      v: "28,592",
      l: "Jobs Created",
      lz: "工作機會",
      num: true
    }]
  }, {
    title: "AppWorks Funds",
    en: "AppWorks manages four venture capital funds totaling US$ 386M. We invest from Seed to Series C, funding 20–30 deals a year, now with 130+ portfolio names — Lalamove, Dapper Labs / Flow, Animoca Brands, 91APP, Figment, Carousell, ShopBack, 17LIVE, KKday — and have produced 6 IPOs, 9 IEOs, 1 hectocorn, 2 decacorns, 5 unicorns and 4 centaurs.",
    zh: "管理四支創投基金，總募集金額 3.86 億美元。通常投資種子輪至 C 輪，每年進行 20–30 個投資案，至今已投資超過 130 家新創，如 Lalamove、Dapper Labs / Flow、Animoca Brands、91APP、Figment、Carousell、ShopBack、17LIVE、KKday；並已有 6 個 IPO、9 個 IEO，以及 1 隻百角獸、2 隻十角獸、5 隻獨角獸與 4 隻 Centaur。",
    link: "https://appworks.tw/investments/",
    stats: [{
      v: "US$ 386M",
      vz: ["3.86", "億美元"],
      l: "AUM",
      lz: "管理資產",
      num: true
    }, {
      v: /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#ff6b0f'
        }
      }, "6 / 5"),
      l: "IPOs · Unicorns",
      lz: "IPO · 獨角獸"
    }, {
      v: "130+",
      l: "Portfolio",
      lz: "投資新創",
      num: true
    }]
  }, {
    title: "Aiworks",
    en: "Aiworks supports enterprises in advancing AI and automation transformation through consulting and workforce training — from foundational literacy to practical implementation. It has helped Taiwan Mobile, SinoPac, Nanshan Life, Hotai Insurance, and Hanlin Publishing build AI capabilities. As an OpenAI Service Partner, Aiworks has empowered 200+ enterprises and 20,000+ professionals across telecom, finance, retail, publishing, and technology.",
    zh: "專注協助企業推動 AI 與自動化升級，以顧問服務與人才培訓為核心，從素養啟蒙到應用落地。曾協助台灣大哥大、永豐金控、南山人壽、和泰產險、翰林出版等企業建立 AI 與自動化能力；現為 OpenAI 台灣官方合作服務夥伴，截至目前已與超過 200 家企業合作，累計培訓逾 20,000 位學員，服務橫跨電信、金融、零售、出版與科技產業。",
    link: "https://aiworks.tw/",
    stats: [{
      v: "200+",
      l: "Enterprises",
      lz: "合作企業",
      num: true
    }, {
      v: "20,000+",
      l: "Trained",
      lz: "培訓學員",
      num: true
    }, {
      v: /*#__PURE__*/React.createElement("span", {
        style: {
          color: '#ff6b0f'
        }
      }, "OpenAI"),
      l: "Partner",
      lz: "合作夥伴"
    }]
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "about"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, zh ? '創立於 2009 年' : 'SINCE 2009'), /*#__PURE__*/React.createElement("h2", null, zh ? '關於 AppWorks。' : 'About AppWorks.'), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, zh ? '加速器、社群與創投，由創業者，為創業者打造。' : 'An accelerator, a community, and venture capital — built by founders, for founders.'))), /*#__PURE__*/React.createElement("div", {
    className: "about-grid"
  }, cards.map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "about-card"
    }, /*#__PURE__*/React.createElement("h3", null, c.title, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }, ".")), /*#__PURE__*/React.createElement("p", {
      className: zh ? 'zh' : ''
    }, zh ? c.zh : c.en), /*#__PURE__*/React.createElement("div", {
      className: "stats-inline"
    }, c.stats.map(function (s, j) {
      return /*#__PURE__*/React.createElement("div", {
        key: j,
        className: "stat"
      }, /*#__PURE__*/React.createElement("div", {
        className: "v"
      }, zh && s.vz ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: "num"
      }, s.vz[0]), /*#__PURE__*/React.createElement("span", {
        className: "unit"
      }, s.vz[1])) : s.num ? /*#__PURE__*/React.createElement("span", {
        className: "num"
      }, s.v) : s.v), /*#__PURE__*/React.createElement("div", {
        className: "l"
      }, zh && s.lz ? s.lz : s.l));
    })), /*#__PURE__*/React.createElement("a", {
      className: "btn outline sm arrow",
      href: c.link,
      target: "_blank",
      rel: "noopener",
      "data-track": "about_link",
      "data-x": c.title
    }, zh ? '更多資訊' : 'More information', " ", /*#__PURE__*/React.createElement(I.arrow, null)));
  }))));
}
window.About = About;
function Partners(_ref4) {
  var _ref4$favorites = _ref4.favorites,
    favorites = _ref4$favorites === void 0 ? [] : _ref4$favorites,
    _ref4$onFav = _ref4.onFav,
    onFav = _ref4$onFav === void 0 ? function () {} : _ref4$onFav,
    _ref4$onIntro = _ref4.onIntro,
    onIntro = _ref4$onIntro === void 0 ? function () {} : _ref4$onIntro,
    _ref4$onOpenLive = _ref4.onOpenLive,
    onOpenLive = _ref4$onOpenLive === void 0 ? function () {} : _ref4$onOpenLive,
    _ref4$density = _ref4.density,
    density = _ref4$density === void 0 ? 'comfy' : _ref4$density,
    _ref4$accentIntensity = _ref4.accentIntensity,
    accentIntensity = _ref4$accentIntensity === void 0 ? 'balanced' : _ref4$accentIntensity,
    language = _ref4.language;
  var CFG = window.EVENT_CONFIG || {};
  var waTeams = (window.TEAMS || []).filter(function (t) {
    return t.batch === CFG.wistronBatch;
  });
  var donationTeams = CFG.donationBatch ? (window.TEAMS || []).filter(function (t) {
    return t.batch === CFG.donationBatch;
  }) : [];
  var card = function card(t) {
    return /*#__PURE__*/React.createElement(window.TeamCard, {
      key: t.id,
      team: t,
      density: density,
      favorited: favorites.includes(t.id),
      onFav: onFav,
      onIntro: onIntro,
      onOpenLive: onOpenLive,
      accentLive: accentIntensity !== 'restrained',
      liveTeamId: null,
      language: language
    });
  };
  var zh = (window.EVENT_CONFIG ? window.EVENT_CONFIG.bilingual !== false : true) && language === 'zh';
  return /*#__PURE__*/React.createElement("section", {
    className: "section bone",
    id: "partners"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, CFG.wistronLabel, "."))), /*#__PURE__*/React.createElement("div", {
    className: "about-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "about-card"
  }, /*#__PURE__*/React.createElement("h3", null, "Wistron", /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, ".")), /*#__PURE__*/React.createElement("p", {
    className: zh ? 'zh' : ''
  }, tr(language, "Wistron is one of the world's leading manufacturers in the ICT industry. In recent years it has invested in R&D, technology innovation, and diversified product development, integrating hardware devices, software services, and cloud data systems into technical-service platforms and solutions — building new technology supply chains and innovation platforms, and expanding into new fields such as education, enterprise services, IoT, and healthcare. Building toward a sustainable, long-term business, Wistron pursues forward-looking strategic investments and technology partners, and in recent years has already invested over NT$14 billion across more than 60 companies.", "緯創資通集團身為全球 ICT 產業領導廠商之一，正積極佈局未來、邁向永續。憑藉堅強的研發及技術創新能力，以及多元化產品發展，將硬體設備結合軟體服務、雲端數據系統，提供技術服務與解決方案，建立新技術產業鏈以及創新平台，大力將事業擴展至教育、企業服務、物聯網及醫療等新領域。緯創邁向永續的關鍵作法之一，就是採取積極的前瞻性投資，引進策略技術夥伴，投資並攜手新創團隊；近幾年已投入超過新台幣 140 億元、橫跨超過 60 家投資甚或長期經營的案例。")), /*#__PURE__*/React.createElement("div", {
    className: "stats-inline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "NT$14B+")), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, tr(language, 'Invested', '累計投資'))), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "60+")), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, tr(language, 'Companies', '投資案例'))), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#ff6b0f'
    }
  }, "ICT")), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, tr(language, 'Global leader', '全球領導廠商')))), /*#__PURE__*/React.createElement("a", {
    className: "btn outline sm arrow",
    href: "https://www.wistron.com/",
    target: "_blank",
    rel: "noopener",
    "data-track": "wistron_link",
    "data-x": "wistron"
  }, tr(language, 'More information', '更多資訊'), " ", /*#__PURE__*/React.createElement(I.arrow, null))), /*#__PURE__*/React.createElement("div", {
    className: "about-card"
  }, /*#__PURE__*/React.createElement("h3", null, "Wistron Accelerator", /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, ".")), /*#__PURE__*/React.createElement("p", {
    className: zh ? 'zh' : ''
  }, tr(language, "To broaden and deepen its collaboration with startups, Wistron set up its corporate venture capital office (CVC) in 2021 and launched the Wistron Accelerator together with AppWorks — a leading launchpad for bold and ambitious entrepreneurs targeting Greater Southeast Asia (GSEA). Through strategic investment and partnership, it actively builds Wistron's growth engines for the future. The program is operated by AppWorks, runs twice a year, and recruits a limited cohort of 7 startups per batch.", "為了擴大與新創合作的廣度與深度，緯創在 2021 年成立企業投資辦公室 (CVC)，並與大東南亞領先的新創加速器 AppWorks 合作啟動 Wistron Accelerator 緯創垂直加速器，透過策略投資與結盟，積極佈局未來的成長引擎；由 AppWorks 提供營運等核心業務，並以每年舉辦兩屆、限額招募 7 家新創來進行。")), /*#__PURE__*/React.createElement("div", {
    className: "stats-inline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, CFG.wistronPrograms)), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, tr(language, 'Programs', ZH.partners.programs))), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, "7")), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, tr(language, 'Per batch', '每屆名額'))), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, waTeams.length)), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, tr(language, 'Teams pitching today', ZH.partners.pitching)))), /*#__PURE__*/React.createElement("a", {
    className: "btn outline sm arrow",
    href: "https://appworks.tw/wistron/",
    target: "_blank",
    rel: "noopener",
    "data-track": "wistron_link",
    "data-x": "wistron-accelerator"
  }, tr(language, 'More information', '更多資訊'), " ", /*#__PURE__*/React.createElement(I.arrow, null)))), waTeams.length > 0 && window.TeamCard && /*#__PURE__*/React.createElement("div", {
    className: "teams ".concat(density),
    style: {
      marginTop: 24
    }
  }, waTeams.map(card)), donationTeams.length > 0 && window.TeamCard && /*#__PURE__*/React.createElement("div", {
    className: "donation-block"
  }, /*#__PURE__*/React.createElement("h3", null, tr(language, CFG.donationLabel, CFG.donationLabelZh), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, zh ? '。' : '.')), /*#__PURE__*/React.createElement("p", {
    className: "sub".concat(zh ? ' zh' : '')
  }, tr(language, CFG.donationIntro, CFG.donationIntroZh)), /*#__PURE__*/React.createElement("div", {
    className: "teams ".concat(density)
  }, donationTeams.map(card)))));
}
window.Partners = Partners;
function Sponsors(_ref5) {
  var language = _ref5.language;
  // Demo Day sponsors — logo lockups from EVENT_CONFIG.sponsors ({ name, src, h }),
  // so each edition can list its own (SG adds Stripe).
  var sponsors = (window.EVENT_CONFIG || {}).sponsors || [];
  if (!sponsors.length) return null;
  var layout = {
    2: 'two',
    3: 'three',
    4: 'four'
  }[sponsors.length] || '';
  return /*#__PURE__*/React.createElement("section", {
    className: "section tight",
    id: "sponsors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, tr(language, 'Thank you to our sponsors & partners', ZH.sponsors.eyebrow)), /*#__PURE__*/React.createElement("h2", null, tr(language, 'Demo Day sponsors.', ZH.sponsors.heading)))), /*#__PURE__*/React.createElement("div", {
    className: "sponsors ".concat(layout)
  }, sponsors.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "sp"
    }, /*#__PURE__*/React.createElement("img", {
      src: s.src,
      alt: s.name,
      style: {
        height: s.h + 'px',
        width: 'auto'
      }
    }));
  }))));
}
window.Sponsors = Sponsors;

/* ─── Event partners (attendee perks + promo codes, from the deck) ─── */
function EventPartners(_ref6) {
  var language = _ref6.language;
  // Perks come from EVENT_PARTNERS in the data file; [en, zh] pairs.
  // Renders nothing until that edition's perks are confirmed.
  var list = window.EVENT_PARTNERS || [];
  if (!list.length) return null;
  var partners = list.map(function (p) {
    return _objectSpread(_objectSpread({}, p), {}, {
      offers: p.offers.map(function (o) {
        return {
          perk: tr(language, o.perk[0], o.perk[1]),
          code: o.code,
          valid: tr(language, o.valid[0], o.valid[1])
        };
      })
    });
  });
  return /*#__PURE__*/React.createElement("section", {
    className: "section tight",
    id: "event-partners"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, tr(language, 'Perks for attendees', '與會者專屬優惠')), /*#__PURE__*/React.createElement("h2", null, tr(language, 'Event partners.', '活動夥伴。')))), /*#__PURE__*/React.createElement("div", {
    className: "ep-grid"
  }, partners.map(function (p, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "ep-card ".concat(p.width || '')
    }, /*#__PURE__*/React.createElement("div", {
      className: "ep-name"
    }, p.logo ? /*#__PURE__*/React.createElement("img", {
      className: "ep-logo",
      src: p.logo,
      alt: p.name
    }) : /*#__PURE__*/React.createElement("span", null, p.name), p.note && /*#__PURE__*/React.createElement("span", {
      className: "ep-batch"
    }, p.note)), p.offers.map(function (o, j) {
      return /*#__PURE__*/React.createElement("div", {
        key: j,
        className: "ep-offer"
      }, /*#__PURE__*/React.createElement("div", {
        className: "ep-perk"
      }, o.perk), /*#__PURE__*/React.createElement("div", {
        className: "ep-meta"
      }, /*#__PURE__*/React.createElement("code", {
        className: "ep-code"
      }, o.code), /*#__PURE__*/React.createElement("span", {
        className: "ep-valid"
      }, o.valid)));
    }));
  }))));
}
window.EventPartners = EventPartners;
function BoothMap(_ref7) {
  var language = _ref7.language;
  // Venue layout comes from BOOTH_MAP in the data file ([name, team id] per
  // booth); renders nothing until the floor plan is set.
  var BM = window.BOOTH_MAP;
  if (!BM) return null;
  var CFG = window.EVENT_CONFIG || {};
  var left = BM.left,
    right = BM.right,
    bottom = BM.bottom;
  // Tap a booth -> scroll to that team's card and flash it.
  var jump = function jump(id) {
    var card = document.getElementById('team-' + id);
    var target = card || document.getElementById('teams');
    if (!target) return;
    var y = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
    if (card) {
      card.classList.add('card-flash');
      setTimeout(function () {
        return card.classList.remove('card-flash');
      }, 1500);
    }
  };
  var booth = function booth(_ref8, cls) {
    var _ref9 = _slicedToArray(_ref8, 2),
      n = _ref9[0],
      id = _ref9[1];
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      className: "bm-booth ".concat(cls),
      onClick: function onClick() {
        return jump(id);
      }
    }, n);
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section tight",
    id: "booth-map"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, tr(language, 'At the venue', '活動現場')), /*#__PURE__*/React.createElement("h2", null, tr(language, 'Booth map.', '攤位地圖。')), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, tr(language, 'Find each team during the open-floor networking.', '交流時間在這裡找到各團隊。')))), /*#__PURE__*/React.createElement("div", {
    className: "bm-scroll"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bm-venue"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bm-stage"
  }, tr(language, 'Stage', '舞台')), /*#__PURE__*/React.createElement("div", {
    className: "bm-mid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bm-col"
  }, left.map(function (n) {
    return booth(n, 'wa');
  })), /*#__PURE__*/React.createElement("div", {
    className: "bm-col"
  }, right.map(function (n) {
    return booth(n, 'aw');
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bm-bottom"
  }, bottom.map(function (n) {
    return booth(n, 'aw');
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bm-legend"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "bm-dot aw"
  }), CFG.batchLabel), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "bm-dot wa"
  }), tr(language, CFG.wistronLabel, CFG.wistronLabelZh)))));
}
window.BoothMap = BoothMap;

/* ─── Intro modal ─── */
function IntroModal(_ref0) {
  var team = _ref0.team,
    onClose = _ref0.onClose;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    copied = _useState2[0],
    setCopied = _useState2[1];
  if (!team) return null;
  var subject = "[AppWorks Demo Day] Intro request \u2014 ".concat(team.name);
  var body = "Hi ".concat(team.name, " team,\n\nI'm connecting after attending ").concat(window.EVENT_CONFIG && window.EVENT_CONFIG.eventName, " in ").concat(window.EVENT_CONFIG && window.EVENT_CONFIG.city || 'Taipei', ". Your pitch \u2014 \"").concat(team.pitch, "\" \u2014 resonated with us, and we'd love to explore working together.\n\nA quick note about us:\n\u2022 Name / Role:\n\u2022 Organisation:\n\u2022 Focus area / Why we're reaching out:\n\nCould we set up a 30-minute chat in the next two weeks?\n\nBest,\n(via AppWorks Demo Day)");
  var mailto = "mailto:".concat(team.email, "?subject=").concat(encodeURIComponent(subject), "&body=").concat(encodeURIComponent(body));
  var copy = function copy() {
    var _navigator$clipboard;
    (_navigator$clipboard = navigator.clipboard) === null || _navigator$clipboard === void 0 || _navigator$clipboard.writeText("To: ".concat(team.email, "\nSubject: ").concat(subject, "\n\n").concat(body));
    setCopied(true);
    setTimeout(function () {
      return setCopied(false);
    }, 1500);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-back",
    onClick: onClose,
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("h3", null, "Connect with ", /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, team.name)), /*#__PURE__*/React.createElement("button", {
    className: "close",
    onClick: onClose,
    "aria-label": "Close"
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "To"), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, team.email)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Subject"), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, subject)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, "Message"), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, body))), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hint"
  }, "Opens your default email client, pre-filled."), /*#__PURE__*/React.createElement("button", {
    className: "btn outline sm",
    onClick: copy,
    "data-track": "contact_copy",
    "data-team": team.id
  }, copied ? 'Copied ✓' : 'Copy to clipboard'), /*#__PURE__*/React.createElement("a", {
    className: "btn primary sm",
    href: mailto,
    "data-track": "contact_email",
    "data-team": team.id
  }, "Open email ", /*#__PURE__*/React.createElement(I.send, null)))));
}
window.IntroModal = IntroModal;
