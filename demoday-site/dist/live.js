// Generated from live.jsx by tools/build-jsx.mjs — edit the .jsx, then rebuild.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// live.jsx — Live audience panel (chat / Q&A / polls / people)

// Which caption engine guests currently see, per the server switch. Polls the
// captions Worker every 3s. Returns 'gemini' | 'openai' | null. (Wordly removed Nov 27.)
var CAPTION_SOURCE_LABEL = {
  openai: 'OpenAI',
  gemini: 'Gemini'
};
function useActiveCaptionSource(worker) {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    active = _useState2[0],
    setActive = _useState2[1];
  useEffect(function () {
    if (!worker) return;
    var stop = false;
    var poll = function poll() {
      return fetch(worker + '/api/latest?channel=active', {
        cache: 'no-store'
      }).then(function (r) {
        return r.json();
      }).then(function (d) {
        if (!stop) setActive(d.active);
      })["catch"](function () {});
    };
    poll();
    var id = setInterval(poll, 3000);
    return function () {
      stop = true;
      clearInterval(id);
    };
  }, [worker]);
  return active;
}
function LivePanel(_ref) {
  var _ref$captionLanguage = _ref.captionLanguage,
    captionLanguage = _ref$captionLanguage === void 0 ? 'en' : _ref$captionLanguage,
    _ref$onCaptionLanguag = _ref.onCaptionLanguageChange,
    onCaptionLanguageChange = _ref$onCaptionLanguag === void 0 ? function () {} : _ref$onCaptionLanguag,
    _ref$sessionId = _ref.sessionId,
    sessionId = _ref$sessionId === void 0 ? 'DXRS-1194' : _ref$sessionId;
  var _useState3 = useState('chat'),
    _useState4 = _slicedToArray(_useState3, 2),
    pane = _useState4[0],
    setPane = _useState4[1];
  var _useState5 = useState({
      clap: 128,
      fire: 71,
      rocket: 54,
      idea: 42,
      heart: 33
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    reactions = _useState6[0],
    setReactions = _useState6[1];
  var _useState7 = useState([{
      who: 'Sarah H.',
      role: 'Investor · Sequoia SEA',
      kind: 'inv',
      text: "Love the unit economics on slide 4. What's CAC payback looking like?"
    }, {
      who: 'Jamie Chen',
      role: 'Founder · Formul.ai',
      kind: 'fnd',
      text: "Thanks Sarah — 4.8 months blended, 3.1 months on the enterprise cohort. Happy to walk through it after."
    }, {
      who: 'Ray N.',
      role: 'Media · TechCrunch',
      kind: 'med',
      text: "Who's open to on-record interviews in the cocktail hour?"
    }, {
      who: 'Karen Y.',
      role: 'Corporate · Taiwan Mobile',
      kind: '',
      text: "+1 for Formul.ai — would like to explore POC on our helpdesk stack."
    }, {
      who: 'Dilip M.',
      role: 'Investor · Antler',
      kind: 'inv',
      text: "Requesting intro to @KaiLuxe 🙌"
    }]),
    _useState8 = _slicedToArray(_useState7, 2),
    messages = _useState8[0],
    setMessages = _useState8[1];
  var _useState9 = useState(''),
    _useState0 = _slicedToArray(_useState9, 2),
    draft = _useState0[0],
    setDraft = _useState0[1];
  var send = function send(e) {
    var _e$preventDefault;
    e === null || e === void 0 || (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 || _e$preventDefault.call(e);
    if (!draft.trim()) return;
    setMessages(function (m) {
      return [].concat(_toConsumableArray(m), [{
        who: 'You',
        role: 'Guest',
        kind: 'you',
        text: draft.trim()
      }]);
    });
    setDraft('');
  };
  var bump = function bump(k) {
    return setReactions(function (r) {
      return _objectSpread(_objectSpread({}, r), {}, _defineProperty({}, k, r[k] + 1));
    });
  };
  return /*#__PURE__*/React.createElement("aside", {
    className: "live-panel",
    "aria-label": "Live audience panel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "live-head"
  }, /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " Live room"), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, "Now: ", /*#__PURE__*/React.createElement("b", null, "Formul.ai"), " \xB7 ", /*#__PURE__*/React.createElement("b", null, "184"), " in room")), /*#__PURE__*/React.createElement("div", {
    className: "live-tabs"
  }, [['chat', 'Chat'], ['qa', 'Q&A'], ['polls', 'Polls'], ['people', 'People']].map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      id = _ref3[0],
      label = _ref3[1];
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      className: pane === id ? 'on' : '',
      onClick: function onClick() {
        return setPane(id);
      }
    }, label);
  })), pane === 'chat' && /*#__PURE__*/React.createElement("div", {
    className: "live-body fade-in"
  }, messages.map(function (m, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "msg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "avatar ".concat(m.kind)
    }, m.who.split(' ').map(function (w) {
      return w[0];
    }).slice(0, 2).join('')), /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "who"
    }, /*#__PURE__*/React.createElement("b", null, m.who), /*#__PURE__*/React.createElement("span", {
      className: "role-pill ".concat(m.kind)
    }, m.role)), /*#__PURE__*/React.createElement("div", {
      className: "bubble"
    }, m.text)));
  })), pane === 'qa' && /*#__PURE__*/React.createElement("div", {
    className: "live-body fade-in"
  }, [{
    v: 32,
    q: "What share of ARR comes from the top 3 customers, and how concentrated is revenue today?",
    meta: "Investor · 2 min ago · answered soon"
  }, {
    v: 21,
    q: "Is the moat the proprietary eval pipeline, or the customer-data feedback loop?",
    meta: "Corporate · 4 min ago"
  }, {
    v: 14,
    q: "Regional expansion — which GSEA market is next after Taiwan?",
    meta: "Founder · 6 min ago"
  }, {
    v: 9,
    q: "How does the agent handle hand-off when escalation is required?",
    meta: "Investor · 8 min ago"
  }].map(function (x, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "qa-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "up"
    }, /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement(I.up, null)), /*#__PURE__*/React.createElement("span", {
      className: "n"
    }, x.v)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("p", null, x.q), /*#__PURE__*/React.createElement("div", {
      className: "meta"
    }, x.meta)));
  })), pane === 'polls' && /*#__PURE__*/React.createElement("div", {
    className: "live-body fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "poll"
  }, /*#__PURE__*/React.createElement("p", {
    className: "q"
  }, "Which vertical excites you most this batch?"), [{
    id: 'a',
    label: 'Agentic AI',
    pct: 52
  }, {
    id: 'b',
    label: 'Onchain infra',
    pct: 23
  }, {
    id: 'c',
    label: 'GSEA commerce',
    pct: 17
  }, {
    id: 'd',
    label: 'Dev tools',
    pct: 8
  }].map(function (o) {
    return /*#__PURE__*/React.createElement("div", {
      key: o.id,
      className: "opt ".concat(o.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "fill",
      style: {
        width: "".concat(o.pct, "%")
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "label"
    }, o.label), /*#__PURE__*/React.createElement("span", {
      className: "pct"
    }, o.pct, "%"));
  }), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, "318 votes \xB7 closes 14:30")), /*#__PURE__*/React.createElement("div", {
    className: "poll"
  }, /*#__PURE__*/React.createElement("p", {
    className: "q"
  }, "Will you take an intro from any team today?"), [{
    id: 'a',
    label: 'Yes — already shortlisted',
    pct: 68
  }, {
    id: 'b',
    label: 'Maybe, exploring',
    pct: 24
  }, {
    id: 'c',
    label: 'Just observing',
    pct: 8
  }].map(function (o) {
    return /*#__PURE__*/React.createElement("div", {
      key: o.id,
      className: "opt ".concat(o.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "fill",
      style: {
        width: "".concat(o.pct, "%")
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "label"
    }, o.label), /*#__PURE__*/React.createElement("span", {
      className: "pct"
    }, o.pct, "%"));
  }), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, "211 votes \xB7 live"))), pane === 'people' && /*#__PURE__*/React.createElement("div", {
    className: "live-body fade-in"
  }, [{
    who: 'Sarah H.',
    role: 'Investor',
    desc: 'Sequoia SEA · Jakarta',
    kind: 'inv'
  }, {
    who: 'Karen Y.',
    role: 'Corporate',
    desc: 'Taiwan Mobile · BD',
    kind: ''
  }, {
    who: 'Ray N.',
    role: 'Media',
    desc: 'TechCrunch · SEA',
    kind: 'med'
  }, {
    who: 'Dilip M.',
    role: 'Investor',
    desc: 'Antler · Singapore',
    kind: 'inv'
  }, {
    who: 'Mei L.',
    role: 'Founder',
    desc: 'KaiLuxe · Hong Kong',
    kind: 'fnd'
  }].map(function (p, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "msg"
    }, /*#__PURE__*/React.createElement("div", {
      className: "avatar ".concat(p.kind)
    }, p.who.split(' ').map(function (w) {
      return w[0];
    }).slice(0, 2).join('')), /*#__PURE__*/React.createElement("div", {
      className: "content"
    }, /*#__PURE__*/React.createElement("div", {
      className: "who"
    }, /*#__PURE__*/React.createElement("b", null, p.who), /*#__PURE__*/React.createElement("span", {
      className: "role-pill ".concat(p.kind)
    }, p.role)), /*#__PURE__*/React.createElement("div", {
      className: "bubble",
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", null, p.desc), /*#__PURE__*/React.createElement("button", {
      className: "btn outline sm"
    }, "Say hi"))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "reactions"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return bump('clap');
    }
  }, "\uD83D\uDC4F ", /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, reactions.clap)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return bump('fire');
    }
  }, "\uD83D\uDD25 ", /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, reactions.fire)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return bump('rocket');
    }
  }, "\uD83D\uDE80 ", /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, reactions.rocket)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return bump('idea');
    }
  }, "\uD83D\uDCA1 ", /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, reactions.idea)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return bump('heart');
    }
  }, "\u2764\uFE0F ", /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, reactions.heart))), /*#__PURE__*/React.createElement("form", {
    className: "composer",
    onSubmit: send
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "Message the room, ask a question, or @tag a team\u2026",
    value: draft,
    onChange: function onChange(e) {
      return setDraft(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Send")));
}
window.LivePanel = LivePanel;

/* ─── Floating live-captions widget ───
   A bottom-corner launcher that opens a slide-up caption panel on demand, so
   guests who don't need captions are unaffected. Captions stream through the
   embedded viewer, which follows the server's engine switch (Gemini / OpenAI).
   Renders nothing unless EVENT_CONFIG.captionsWorker is set. */
function LiveCaptionsWidget(_ref4) {
  var _ref4$sessionId = _ref4.sessionId,
    sessionId = _ref4$sessionId === void 0 ? 'DXRS-1194' : _ref4$sessionId,
    _ref4$captionLanguage = _ref4.captionLanguage,
    captionLanguage = _ref4$captionLanguage === void 0 ? 'zh-TW' : _ref4$captionLanguage;
  var worker = window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker || '';
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    open = _useState10[0],
    setOpen = _useState10[1];
  // Compact ("docked") mode: a slim bottom bar showing the latest line, so the
  // page stays browsable behind it. Tap ▴ to expand back to the full panel.
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    compact = _useState12[0],
    setCompact = _useState12[1];
  var source = useActiveCaptionSource(open ? worker : '') || 'gemini';
  // Let the nav caption buttons open this widget.
  useEffect(function () {
    window.ddOpenCaptions = function () {
      return setOpen(true);
    };
    return function () {
      try {
        delete window.ddOpenCaptions;
      } catch (e) {}
    };
  }, []);
  if (!worker) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "ddcap ".concat(compact ? 'compact' : '')
  }, open && /*#__PURE__*/React.createElement("div", {
    className: "ddcap-panel ".concat(compact ? 'compact' : ''),
    role: "dialog",
    "aria-label": "Live captions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ddcap-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ddcap-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ddcap-dot"
  }), CAPTION_SOURCE_LABEL[source] || 'Gemini'), /*#__PURE__*/React.createElement("span", {
    className: "ddcap-title"
  }, "\u5373\u6642\u7FFB\u8B6F \xB7 Live captions"), /*#__PURE__*/React.createElement("button", {
    className: "ddcap-min",
    onClick: function onClick() {
      return setCompact(function (c) {
        return !c;
      });
    },
    "aria-label": compact ? 'Expand captions' : 'Shrink to a bar',
    title: compact ? '放大 Expand' : '縮小成字幕條 Dock'
  }, compact ? '▴' : '▾'), /*#__PURE__*/React.createElement("button", {
    className: "ddcap-x",
    onClick: function onClick() {
      return setOpen(false);
    },
    "aria-label": "Close captions"
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "ddcap-body"
  }, /*#__PURE__*/React.createElement("iframe", {
    key: source,
    className: "ddcap-frame",
    src: worker + '/viewer?base=' + encodeURIComponent(worker),
    title: "Live captions",
    allow: "autoplay",
    loading: "lazy"
  }))), /*#__PURE__*/React.createElement("button", {
    className: "ddcap-fab ".concat(open ? 'on' : ''),
    onClick: function onClick() {
      return setOpen(function (o) {
        return !o;
      });
    },
    "aria-expanded": open,
    "data-track": "captions",
    "data-x": open ? 'close' : 'open'
  }, /*#__PURE__*/React.createElement("span", {
    className: "ddcap-dot"
  }), open ? '收合 Hide' : '即時翻譯 Captions'));
}
window.LiveCaptionsWidget = LiveCaptionsWidget;

/* In-page caption launcher (placed just above Sponsors). Opens the same
   slide-up panel as the floating button. Renders only when configured. */
function CaptionsLauncher(_ref5) {
  var _ref5$language = _ref5.language,
    language = _ref5$language === void 0 ? 'en' : _ref5$language;
  var worker = window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker || '';
  if (!worker) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "container ddcap-launch"
  }, /*#__PURE__*/React.createElement("button", {
    className: "ddcap-launch-btn",
    "data-track": "captions",
    "data-x": "inline",
    onClick: function onClick() {
      return window.ddOpenCaptions && window.ddOpenCaptions();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ddcap-dot"
  }), language === 'zh' ? '即時翻譯 · 開啟 (EN + 中文)' : '即時翻譯 · Open live captions (EN + 中文)'));
}
window.CaptionsLauncher = CaptionsLauncher;
