// Generated from app.jsx by tools/build-jsx.mjs — edit the .jsx, then rebuild.
"use strict";

function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// app.jsx — top-level app + Tweaks
var _React = React,
  useStateApp = _React.useState,
  useEffectApp = _React.useEffect,
  useMemo = _React.useMemo;
function App() {
  var TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "heroVariant": "slate",
    "cardDensity": "comfy",
    "language": "zh",
    "accentIntensity": "balanced",
    "showNowOnStage": true,
    "wordlySessionId": "DXRS-1194",
    "eventPhase": "live",
    "liveTeamId": "ailytics"
  } /*EDITMODE-END*/;
  var _useTweaks = useTweaks(TWEAK_DEFAULTS),
    _useTweaks2 = _slicedToArray(_useTweaks, 2),
    tweaks = _useTweaks2[0],
    setTweak = _useTweaks2[1];
  var CFG = window.EVENT_CONFIG || {};
  // English-only editions (e.g. Singapore) ignore the language toggle.
  var lang = CFG.bilingual === false ? 'en' : tweaks.language;

  // Operator-controlled live state (Backstage console). Persists to
  // localStorage; independent of the design-time Tweaks panel.
  var _useBackstage = useBackstage({
      sessionId: TWEAK_DEFAULTS.wordlySessionId,
      phase: TWEAK_DEFAULTS.eventPhase,
      liveTeamId: TWEAK_DEFAULTS.liveTeamId
    }),
    _useBackstage2 = _slicedToArray(_useBackstage, 3),
    stage = _useBackstage2[0],
    setStage = _useBackstage2[1],
    resetStage = _useBackstage2[2];
  var _useBackstageToggle = useBackstageToggle(),
    _useBackstageToggle2 = _slicedToArray(_useBackstageToggle, 2),
    bkOpen = _useBackstageToggle2[0],
    setBkOpen = _useBackstageToggle2[1];
  var _useStateApp = useStateApp('teams'),
    _useStateApp2 = _slicedToArray(_useStateApp, 2),
    activeTab = _useStateApp2[0],
    setActiveTab = _useStateApp2[1];
  var _useStateApp3 = useStateApp([]),
    _useStateApp4 = _slicedToArray(_useStateApp3, 2),
    favorites = _useStateApp4[0],
    setFavorites = _useStateApp4[1];
  var _useStateApp5 = useStateApp(null),
    _useStateApp6 = _slicedToArray(_useStateApp5, 2),
    introTeam = _useStateApp6[0],
    setIntroTeam = _useStateApp6[1];
  var _useStateApp7 = useStateApp(null),
    _useStateApp8 = _slicedToArray(_useStateApp7, 2),
    setOpenedTeam = _useStateApp8[1];
  var _useStateApp9 = useStateApp('zh-TW'),
    _useStateApp0 = _slicedToArray(_useStateApp9, 2),
    captionLanguage = _useStateApp0[0],
    setCaptionLanguage = _useStateApp0[1];
  var sessionId = stage.sessionId || 'DXRS-1194';
  var nav = function nav(id) {
    setActiveTab(id);
    if (id === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    var el = document.getElementById(id);
    if (el) {
      var y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  // section observer for active tab
  useEffectApp(function () {
    var onScroll = function onScroll() {
      var y = window.scrollY + 140;
      var ids = TABS.map(function (x) {
        return x.id;
      });
      var current = 'teams';
      var _iterator = _createForOfIteratorHelper(ids),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var id = _step.value;
          var el = document.getElementById(id);
          if (el && el.offsetTop <= y) current = id;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      setActiveTab(current);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return function () {
      return window.removeEventListener('scroll', onScroll);
    };
  }, []);
  var onFav = function onFav(id) {
    setFavorites(function (f) {
      return f.includes(id) ? f.filter(function (x) {
        return x !== id;
      }) : [].concat(_toConsumableArray(f), [id]);
    });
  };
  var liveTeam = useMemo(function () {
    if (stage.phase !== 'live' || stage.liveTeamId === 'OFF_AIR') return null;
    return TEAMS.find(function (x) {
      return x.id === stage.liveTeamId;
    }) || null;
  }, [stage.phase, stage.liveTeamId]);
  var liveTeamId = liveTeam ? liveTeam.id : null;
  var kpis = {
    teams: TEAMS.length,
    attendees: '600+'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "accent-".concat(tweaks.accentIntensity).concat(CFG.nowOnStage === false ? ' edition-nostage' : '')
  }, /*#__PURE__*/React.createElement(TopNav, {
    activeTab: activeTab,
    onNav: nav,
    language: lang,
    onLanguageChange: function onLanguageChange(v) {
      return setTweak('language', v);
    },
    sessionId: sessionId
  }), /*#__PURE__*/React.createElement(Hero, {
    variant: tweaks.heroVariant,
    language: lang,
    kpis: kpis
  }), tweaks.showNowOnStage && CFG.nowOnStage !== false && /*#__PURE__*/React.createElement(NowOnStage, {
    team: liveTeam,
    phase: stage.phase,
    captionLanguage: captionLanguage,
    onCaptionLanguageChange: setCaptionLanguage,
    sessionId: sessionId
  }), /*#__PURE__*/React.createElement(TeamsSection, {
    favorites: favorites,
    onFav: onFav,
    onIntro: function onIntro(team) {
      return setIntroTeam(team);
    },
    onOpenLive: function onOpenLive(team) {
      return setOpenedTeam(team);
    },
    density: tweaks.cardDensity,
    accentIntensity: tweaks.accentIntensity,
    captionLanguage: captionLanguage,
    onCaptionLanguageChange: setCaptionLanguage,
    sessionId: sessionId,
    liveTeamId: liveTeamId,
    language: lang
  }), /*#__PURE__*/React.createElement(Agenda, {
    language: lang
  }), /*#__PURE__*/React.createElement(About, {
    language: lang
  }), CFG.wistron !== false && /*#__PURE__*/React.createElement(Partners, {
    favorites: favorites,
    onFav: onFav,
    onIntro: function onIntro(team) {
      return setIntroTeam(team);
    },
    onOpenLive: function onOpenLive(team) {
      return setOpenedTeam(team);
    },
    density: tweaks.cardDensity,
    accentIntensity: tweaks.accentIntensity,
    language: lang
  }), CFG.album !== false && /*#__PURE__*/React.createElement(Album, {
    language: lang
  }), /*#__PURE__*/React.createElement(BoothMap, {
    language: lang
  }), /*#__PURE__*/React.createElement(CaptionsLauncher, {
    language: lang
  }), /*#__PURE__*/React.createElement(Sponsors, {
    language: lang
  }), /*#__PURE__*/React.createElement(EventPartners, {
    language: lang
  }), /*#__PURE__*/React.createElement(Footer, {
    language: lang
  }), /*#__PURE__*/React.createElement(IntroModal, {
    team: introTeam,
    onClose: function onClose() {
      return setIntroTeam(null);
    }
  }), /*#__PURE__*/React.createElement(LiveCaptionsWidget, {
    sessionId: sessionId,
    captionLanguage: captionLanguage
  }), /*#__PURE__*/React.createElement(Backstage, {
    open: bkOpen,
    onClose: function onClose() {
      return setBkOpen(false);
    },
    stage: stage,
    setStage: setStage,
    reset: resetStage
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Hero"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Background",
    value: tweaks.heroVariant,
    options: [{
      value: 'slate',
      label: 'Slate'
    }, {
      value: 'bone',
      label: 'Bone'
    }, {
      value: 'orange',
      label: 'Orange'
    }],
    onChange: function onChange(v) {
      return setTweak('heroVariant', v);
    }
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "'Now on stage' takeover",
    value: tweaks.showNowOnStage,
    onChange: function onChange(v) {
      return setTweak('showNowOnStage', v);
    }
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Teams"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Card style",
    value: tweaks.cardDensity,
    options: [{
      value: 'compact',
      label: 'List'
    }, {
      value: 'comfy',
      label: 'Cards'
    }, {
      value: 'editorial',
      label: 'Editorial'
    }],
    onChange: function onChange(v) {
      return setTweak('cardDensity', v);
    }
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Brand"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Accent intensity",
    value: tweaks.accentIntensity,
    options: [{
      value: 'restrained',
      label: 'Quiet'
    }, {
      value: 'balanced',
      label: 'Balanced'
    }, {
      value: 'expressive',
      label: 'Bold'
    }],
    onChange: function onChange(v) {
      return setTweak('accentIntensity', v);
    }
  }), CFG.bilingual !== false && /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Language",
    value: tweaks.language,
    options: [{
      value: 'zh',
      label: '中文'
    }, {
      value: 'en',
      label: 'EN'
    }],
    onChange: function onChange(v) {
      return setTweak('language', v);
    }
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
