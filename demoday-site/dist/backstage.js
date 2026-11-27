// Generated from backstage.jsx by tools/build-jsx.mjs — edit the .jsx, then rebuild.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// backstage.jsx — operator console for running the event live.
// Persists to localStorage so it survives refreshes and is independent of the
// design-time Tweaks panel. Source of truth for: Wordly session ID, event
// phase, and the currently-pitching team.
//
// Open it any of three ways:
//   • Keyboard:  Ctrl/⌘ + Shift + B
//   • URL:       add #backstage to the address and reload
//   • Footer:    the small "Backstage" link in the footer
var _React = React,
  useBkState = _React.useState,
  useBkEffect = _React.useEffect;
var BACKSTAGE_KEY = 'dd33.backstage.' + (window.EVENT_CONFIG && window.EVENT_CONFIG.edition || 'TW') + '.v1';
function useBackstage(defaults) {
  var _useBkState = useBkState(function () {
      try {
        var saved = JSON.parse(localStorage.getItem(BACKSTAGE_KEY) || '{}');
        return _objectSpread(_objectSpread({}, defaults), saved);
      } catch (e) {
        return defaults;
      }
    }),
    _useBkState2 = _slicedToArray(_useBkState, 2),
    state = _useBkState2[0],
    setState = _useBkState2[1];
  var set = function set(patch) {
    return setState(function (prev) {
      var next = _objectSpread(_objectSpread({}, prev), patch);
      try {
        localStorage.setItem(BACKSTAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };
  var reset = function reset() {
    try {
      localStorage.removeItem(BACKSTAGE_KEY);
    } catch (e) {}
    setState(defaults);
  };

  // Cross-tab / cross-device-on-same-browser sync: if the booth has the page
  // open in two tabs, changes propagate.
  useBkEffect(function () {
    var onStorage = function onStorage(e) {
      if (e.key === BACKSTAGE_KEY && e.newValue) {
        try {
          setState(function (s) {
            return _objectSpread(_objectSpread({}, s), JSON.parse(e.newValue));
          });
        } catch (er) {}
      }
    };
    window.addEventListener('storage', onStorage);
    return function () {
      return window.removeEventListener('storage', onStorage);
    };
  }, []);
  return [state, set, reset];
}
window.useBackstage = useBackstage;

// Hook: returns [open, setOpen] and wires keyboard + hash triggers.
function useBackstageToggle() {
  // Never auto-open on load — otherwise a lingering #backstage in the URL
  // re-pops the console on every refresh. Open only via the footer link
  // (#backstage) or ⌘/Ctrl+Shift+B.
  var _useBkState3 = useBkState(false),
    _useBkState4 = _slicedToArray(_useBkState3, 2),
    open = _useBkState4[0],
    setOpen = _useBkState4[1];
  useBkEffect(function () {
    var clearHash = function clearHash() {
      if (window.location.hash.toLowerCase() === '#backstage') {
        try {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch (e) {}
      }
    };
    clearHash(); // strip a stale #backstage left from a previous session
    var onKey = function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'B' || e.key === 'b')) {
        e.preventDefault();
        setOpen(function (o) {
          return !o;
        });
      }
      if (e.key === 'Escape') setOpen(false);
    };
    var onHash = function onHash() {
      if (window.location.hash.toLowerCase() === '#backstage') {
        setOpen(true);
        clearHash();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return function () {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);
  return [open, setOpen];
}
window.useBackstageToggle = useBackstageToggle;

// ── Stage order: batches in the order they appear in TEAMS (AW → WA → CPD),
// then speakerOrder within each batch. ──
function stageOrder() {
  var teams = window.TEAMS || [];
  var rank = {};
  teams.forEach(function (t) {
    if (!(t.batch in rank)) rank[t.batch] = Object.keys(rank).length;
  });
  return _toConsumableArray(teams).sort(function (a, b) {
    return rank[a.batch] - rank[b.batch] || a.speakerOrder - b.speakerOrder;
  });
}
window.stageOrder = stageOrder;
var teamLabel = function teamLabel(t) {
  return t ? "".concat(t.name, " \u2014 ").concat(t.presenter || '').concat(t.title ? ', ' + t.title : '', " \xB7 ").concat(t.sub || '') : '';
};

// Starting glossary for a fresh event: event terms + every team and presenter
// name, kept in English. Cg reviews and saves it; nothing is sent until then.
var CAPTION_EVENT_TERMS = ['AppWorks = keep', 'AppWorks Accelerator = keep', 'Demo Day = keep', 'Compiling the Uncompilable = keep  # AW#33 theme', 'Jamie Lin = 林之晨  # AppWorks chairman, keynote', 'Wistron = 緯創', 'Wistron Accelerator = keep', 'Computing Power Donation = 算力捐贈計畫  # Wistron program', 'Garage+ = keep', 'Google Cloud = keep', 'AWS = keep', 'KKCOMPANY = keep'];
function lineupGlossaryLines() {
  var lines = [].concat(CAPTION_EVENT_TERMS);
  stageOrder().forEach(function (t) {
    lines.push("".concat(t.name, " = keep  # ").concat(t.batch, " team"));
    if (t.presenter && !/TBC/i.test(t.presenter)) lines.push("".concat(t.presenter, " = keep  # ").concat(t.name));
  });
  return lines;
}
// Append lines whose term (left of "=") isn't in the glossary yet.
function mergeGlossary(text, lines) {
  var key = function key(l) {
    return l.replace(/#.*$/, '').split('=')[0].trim().toLowerCase();
  };
  var have = new Set((text || '').split('\n').map(key).filter(Boolean));
  var add = lines.filter(function (l) {
    return !have.has(key(l));
  });
  return [(text || '').trim()].concat(_toConsumableArray(add)).filter(Boolean).join('\n');
}

// ── Caption context editor: what the AI reads before it captions ──
// Saved on the captions server, so it applies to the broadcaster laptop and
// every guest, whatever device you edit it from.
function CaptionContext(_ref) {
  var worker = _ref.worker,
    token = _ref.token,
    onStage = _ref.onStage,
    onLoaded = _ref.onLoaded;
  var teams = stageOrder();
  var _useBkState5 = useBkState(false),
    _useBkState6 = _slicedToArray(_useBkState5, 2),
    loaded = _useBkState6[0],
    setLoaded = _useBkState6[1];
  var _useBkState7 = useBkState({
      instructions: '',
      glossary: ''
    }),
    _useBkState8 = _slicedToArray(_useBkState7, 2),
    general = _useBkState8[0],
    setGeneral = _useBkState8[1];
  var _useBkState9 = useBkState({
      instructions: '',
      glossary: ''
    }),
    _useBkState0 = _slicedToArray(_useBkState9, 2),
    saved = _useBkState0[0],
    setSaved = _useBkState0[1];
  var _useBkState1 = useBkState({}),
    _useBkState10 = _slicedToArray(_useBkState1, 2),
    scripts = _useBkState10[0],
    setScripts = _useBkState10[1];
  var _useBkState11 = useBkState(teams[0] ? teams[0].id : ''),
    _useBkState12 = _slicedToArray(_useBkState11, 2),
    sel = _useBkState12[0],
    setSel = _useBkState12[1];
  var _useBkState13 = useBkState(''),
    _useBkState14 = _slicedToArray(_useBkState13, 2),
    draft = _useBkState14[0],
    setDraft = _useBkState14[1];
  var _useBkState15 = useBkState(''),
    _useBkState16 = _slicedToArray(_useBkState15, 2),
    msg = _useBkState16[0],
    setMsg = _useBkState16[1];
  var _useBkState17 = useBkState(false),
    _useBkState18 = _slicedToArray(_useBkState17, 2),
    busy = _useBkState18[0],
    setBusy = _useBkState18[1];
  var _useBkState19 = useBkState(''),
    _useBkState20 = _slicedToArray(_useBkState19, 2),
    tryText = _useBkState20[0],
    setTryText = _useBkState20[1];
  var _useBkState21 = useBkState(null),
    _useBkState22 = _slicedToArray(_useBkState21, 2),
    tryOut = _useBkState22[0],
    setTryOut = _useBkState22[1];
  var api = function api(path, body) {
    return fetch(worker + path, {
      method: body ? 'POST' : 'GET',
      headers: _objectSpread(_objectSpread({}, body ? {
        'Content-Type': 'application/json'
      } : {}), {}, {
        Authorization: 'Bearer ' + token
      }),
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store'
    }).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok || j.error) throw new Error(j.error || 'HTTP ' + r.status);
        return j;
      });
    });
  };
  var apply = function apply(j) {
    var g = {
      instructions: j.general && j.general.instructions || '',
      glossary: j.general && j.general.glossary || ''
    };
    setSaved(g);
    setScripts(j.teams || {});
    onLoaded && onLoaded(j.onStage || '');
    return g;
  };
  var fail = function fail(what) {
    return function (e) {
      setBusy(false);
      setMsg(what + ' failed: ' + e.message + (/unauthorized/.test(e.message) ? ' — check the admin token' : ''));
    };
  };
  var load = function load() {
    if (!token) {
      setMsg('Enter the admin token above to load the caption context.');
      return;
    }
    setBusy(true);
    setMsg('Loading…');
    api('/api/context').then(function (j) {
      var g = apply(j);
      var fresh = !g.glossary && !g.instructions;
      setGeneral(fresh ? {
        instructions: '',
        glossary: mergeGlossary('', lineupGlossaryLines())
      } : g);
      setLoaded(true);
      setBusy(false);
      setMsg(fresh ? 'Nothing saved yet. The glossary below is pre-filled from the lineup: review it, then Save.' : 'Loaded from the captions server.');
    })["catch"](fail('Load'));
  };
  useBkEffect(function () {
    if (token && !loaded) load();
  }, [token]);
  useBkEffect(function () {
    setDraft(scripts[sel] && scripts[sel].script || '');
    setTryOut(null);
  }, [sel, scripts]);
  var generalDirty = general.instructions !== saved.instructions || general.glossary !== saved.glossary;
  var savedScript = scripts[sel] && scripts[sel].script || '';
  var scriptDirty = draft.trim() !== savedScript;
  var selTeam = teams.find(function (t) {
    return t.id === sel;
  });
  var onStageTeam = teams.find(function (t) {
    return t.id === onStage;
  });
  var nScripts = teams.filter(function (t) {
    return scripts[t.id];
  }).length;
  var saveGeneral = function saveGeneral() {
    setBusy(true);
    api('/api/context', {
      general: general
    }).then(function (j) {
      apply(j);
      setBusy(false);
      setMsg('Style notes + glossary saved. Captions use them from the next line.');
    })["catch"](fail('Save'));
  };
  var saveScript = function saveScript() {
    setBusy(true);
    api('/api/context', {
      team: {
        id: sel,
        label: teamLabel(selTeam),
        script: draft
      }
    }).then(function (j) {
      apply(j);
      setBusy(false);
      setMsg(draft.trim() ? "Script saved for ".concat(selTeam.name, ".") : "Script removed for ".concat(selTeam.name, "."));
    })["catch"](fail('Save'));
  };
  var useNow = function useNow(id) {
    setBusy(true);
    var t = teams.find(function (x) {
      return x.id === id;
    });
    api('/api/context', {
      onStage: id,
      onStageLabel: teamLabel(t)
    }).then(function (j) {
      apply(j);
      setBusy(false);
      setMsg(t ? "Captions now use ".concat(t.name, "'s script.") : 'No team on stage: captions use the style notes + glossary only.');
    })["catch"](fail('Update'));
  };
  var tryLine = function tryLine() {
    if (!tryText.trim()) return;
    setTryOut({
      pending: true
    });
    api('/api/translate', {
      engine: 'gemini',
      text: tryText.trim(),
      team: sel
    }).then(function (j) {
      return setTryOut(j);
    })["catch"](function (e) {
      return setTryOut({
        error: e.message
      });
    });
  };
  if (!token) {
    return /*#__PURE__*/React.createElement("div", {
      className: "bk-hint"
    }, "Enter the admin token above to edit the caption context.");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "bk-ctx"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-sublabel"
  }, "Style notes ", /*#__PURE__*/React.createElement("span", {
    className: "bk-count"
  }, general.instructions.length, " / 4,000")), /*#__PURE__*/React.createElement("textarea", {
    className: "bk-input bk-text",
    rows: 3,
    value: general.instructions,
    disabled: !loaded,
    placeholder: 'e.g. Keep 中文 short and spoken. 新創 not 初創. Money as 萬/億 美元. Keep company + product names in English.',
    onChange: function onChange(e) {
      return setGeneral(_objectSpread(_objectSpread({}, general), {}, {
        instructions: e.target.value
      }));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-sublabel"
  }, "Glossary ", /*#__PURE__*/React.createElement("span", {
    className: "bk-muted"
  }, "one per line \xB7 ", /*#__PURE__*/React.createElement("code", null, "English = \u4E2D\u6587"), " \xB7 ", /*#__PURE__*/React.createElement("code", null, "Name = keep"), " \xB7 # note"), /*#__PURE__*/React.createElement("span", {
    className: "bk-count"
  }, general.glossary.split('\n').filter(function (l) {
    return l.trim();
  }).length, " lines")), /*#__PURE__*/React.createElement("textarea", {
    className: "bk-input bk-text mono-ish",
    rows: 8,
    value: general.glossary,
    disabled: !loaded,
    spellCheck: false,
    onChange: function onChange(e) {
      return setGeneral(_objectSpread(_objectSpread({}, general), {}, {
        glossary: e.target.value
      }));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bk-btn primary",
    disabled: !loaded || busy || !generalDirty,
    onClick: saveGeneral
  }, generalDirty ? 'Save notes + glossary' : 'Saved ✓'), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn",
    disabled: !loaded || busy,
    onClick: function onClick() {
      return setGeneral(_objectSpread(_objectSpread({}, general), {}, {
        glossary: mergeGlossary(general.glossary, lineupGlossaryLines())
      }));
    }
  }, "Add lineup names"), generalDirty && /*#__PURE__*/React.createElement("button", {
    className: "bk-btn ghost",
    onClick: function onClick() {
      return setGeneral(saved);
    }
  }, "Undo")), /*#__PURE__*/React.createElement("div", {
    className: "bk-sublabel",
    style: {
      marginTop: 18
    }
  }, "Pitch scripts ", /*#__PURE__*/React.createElement("span", {
    className: "bk-count"
  }, nScripts, " / ", teams.length, " saved")), /*#__PURE__*/React.createElement("select", {
    className: "bk-input",
    value: sel,
    onChange: function onChange(e) {
      return setSel(e.target.value);
    },
    disabled: !loaded
  }, teams.map(function (t) {
    return /*#__PURE__*/React.createElement("option", {
      key: t.id,
      value: t.id
    }, scripts[t.id] ? '✓ ' : '· ', t.batch, " ", String(t.speakerOrder).padStart(2, '0'), " \xB7 ", t.name, t.id === onStage ? '  (on stage)' : '');
  })), /*#__PURE__*/React.createElement("textarea", {
    className: "bk-input bk-text",
    rows: 8,
    value: draft,
    disabled: !loaded,
    style: {
      marginTop: 8
    },
    placeholder: selTeam ? "Paste ".concat(selTeam.name, "'s pitch script (English, \u4E2D\u6587 or both). The AI uses it to get names, terms and numbers right while this team is on stage.") : '',
    onChange: function onChange(e) {
      return setDraft(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bk-btn primary",
    disabled: !loaded || busy || !scriptDirty,
    onClick: saveScript
  }, scriptDirty ? draft.trim() ? 'Save script' : 'Remove script' : 'Saved ✓'), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn",
    disabled: !loaded || busy || sel === onStage,
    onClick: function onClick() {
      return useNow(sel);
    }
  }, sel === onStage ? 'On stage now ✓' : 'Use for captions now'), /*#__PURE__*/React.createElement("span", {
    className: "bk-count"
  }, draft.length.toLocaleString(), " / 15,000")), /*#__PURE__*/React.createElement("div", {
    className: "bk-live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Captions use:"), /*#__PURE__*/React.createElement("code", null, onStageTeam ? onStageTeam.name : 'notes + glossary only'), onStageTeam && !scripts[onStage] && /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "no script saved"), onStage && /*#__PURE__*/React.createElement("button", {
    className: "bk-btn ghost",
    style: {
      marginLeft: 'auto',
      padding: '4px 8px'
    },
    disabled: busy,
    onClick: function onClick() {
      return useNow('');
    }
  }, "Clear")), /*#__PURE__*/React.createElement("div", {
    className: "bk-hint"
  }, "Follows ", /*#__PURE__*/React.createElement("b", null, "Currently pitching"), " below (in On Air), or set it here. Saved on the captions server, so it reaches the broadcaster laptop."), /*#__PURE__*/React.createElement("div", {
    className: "bk-sublabel",
    style: {
      marginTop: 18
    }
  }, "Try a line ", /*#__PURE__*/React.createElement("span", {
    className: "bk-muted"
  }, "Gemini, with the saved notes, glossary and ", selTeam ? selTeam.name + "'s saved script" : 'script')), /*#__PURE__*/React.createElement("div", {
    className: "bk-id-row"
  }, /*#__PURE__*/React.createElement("input", {
    className: "bk-input",
    value: tryText,
    placeholder: "Type what a speaker might say\u2026",
    disabled: !loaded,
    onChange: function onChange(e) {
      return setTryText(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') tryLine();
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn",
    disabled: !loaded || !tryText.trim(),
    onClick: tryLine
  }, "Translate")), tryOut && /*#__PURE__*/React.createElement("div", {
    className: "bk-try"
  }, tryOut.pending ? 'Translating…' : tryOut.error ? /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "Failed: ", tryOut.error) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, tryOut.en), /*#__PURE__*/React.createElement("div", {
    className: "zh"
  }, tryOut.zh))), msg && /*#__PURE__*/React.createElement("div", {
    className: "bk-hint"
  }, /*#__PURE__*/React.createElement("span", {
    className: /failed|check/i.test(msg) ? 'warn' : ''
  }, msg)));
}
window.CaptionContext = CaptionContext;
function Backstage(_ref2) {
  var open = _ref2.open,
    onClose = _ref2.onClose,
    stage = _ref2.stage,
    setStage = _ref2.setStage,
    reset = _ref2.reset;
  var _useBkState23 = useBkState(stage.sessionId),
    _useBkState24 = _slicedToArray(_useBkState23, 2),
    draftId = _useBkState24[0],
    setDraftId = _useBkState24[1];
  useBkEffect(function () {
    setDraftId(stage.sessionId);
  }, [stage.sessionId]);

  // Password gate — unlocks for this browser session only.
  var _useBkState25 = useBkState(function () {
      try {
        return sessionStorage.getItem('dd33.bk.unlocked') === '1';
      } catch (e) {
        return false;
      }
    }),
    _useBkState26 = _slicedToArray(_useBkState25, 2),
    unlocked = _useBkState26[0],
    setUnlocked = _useBkState26[1];
  var _useBkState27 = useBkState(''),
    _useBkState28 = _slicedToArray(_useBkState27, 2),
    pw = _useBkState28[0],
    setPw = _useBkState28[1];
  var _useBkState29 = useBkState(false),
    _useBkState30 = _slicedToArray(_useBkState29, 2),
    pwErr = _useBkState30[0],
    setPwErr = _useBkState30[1];
  var tryUnlock = function tryUnlock() {
    if (pw === 'il0veT@iwan') {
      setUnlocked(true);
      setPwErr(false);
      try {
        sessionStorage.setItem('dd33.bk.unlocked', '1');
      } catch (e) {}
    } else {
      setPwErr(true);
    }
  };

  // ── Live caption engine switch (server-side; affects all guests) ──
  var captionsWorker = window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker || '';
  var _useBkState31 = useBkState(function () {
      try {
        return localStorage.getItem('ddtw.token') || '';
      } catch (e) {
        return '';
      }
    }),
    _useBkState32 = _slicedToArray(_useBkState31, 2),
    adminToken = _useBkState32[0],
    setAdminToken = _useBkState32[1];
  var _useBkState33 = useBkState(''),
    _useBkState34 = _slicedToArray(_useBkState33, 2),
    liveSource = _useBkState34[0],
    setLiveSource = _useBkState34[1];
  var _useBkState35 = useBkState(''),
    _useBkState36 = _slicedToArray(_useBkState35, 2),
    switchMsg = _useBkState36[0],
    setSwitchMsg = _useBkState36[1];
  useBkEffect(function () {
    if (!captionsWorker || !open) return;
    var stop = false;
    var poll = function poll() {
      return fetch(captionsWorker + '/api/latest?channel=active', {
        cache: 'no-store'
      }).then(function (r) {
        return r.json();
      }).then(function (d) {
        if (!stop) setLiveSource(d.active);
      })["catch"](function () {});
    };
    poll();
    var id = setInterval(poll, 3000);
    return function () {
      stop = true;
      clearInterval(id);
    };
  }, [captionsWorker, open]);
  var clearCaptions = function clearCaptions() {
    var tok = adminToken.trim();
    if (!tok) {
      setSwitchMsg('Enter the admin token first.');
      return;
    }
    setSwitchMsg('Clearing caption history…');
    fetch(captionsWorker + '/api/reset', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + tok
      }
    }).then(function (r) {
      return r.json();
    }).then(function (j) {
      return setSwitchMsg(j && j.ok ? 'Caption history cleared.' : 'Clear failed.');
    })["catch"](function (e) {
      return setSwitchMsg('Clear error: ' + e.message);
    });
  };
  var flipEngine = function flipEngine(eng) {
    var tok = adminToken.trim();
    if (!tok) {
      setSwitchMsg('Enter the admin token first.');
      return;
    }
    try {
      localStorage.setItem('ddtw.token', tok);
    } catch (e) {}
    setSwitchMsg('Switching to ' + eng + '…');
    fetch(captionsWorker + '/api/switch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tok
      },
      body: JSON.stringify({
        active: eng
      })
    }).then(function (r) {
      return r.json().then(function (j) {
        return {
          ok: r.ok,
          j: j
        };
      });
    }).then(function (_ref3) {
      var ok = _ref3.ok,
        j = _ref3.j;
      if (ok && j.ok) {
        setLiveSource(j.active);
        setSwitchMsg('Now live: ' + eng.toUpperCase());
      } else {
        setSwitchMsg('Failed: ' + (j.error || 'error') + (j.error === 'unauthorized' ? ' (check token)' : ''));
      }
    })["catch"](function (e) {
      return setSwitchMsg('Network error: ' + e.message);
    });
  };

  // ── Caption context: which team's script the captions server uses ──
  var _useBkState37 = useBkState(''),
    _useBkState38 = _slicedToArray(_useBkState37, 2),
    ctxOnStage = _useBkState38[0],
    setCtxOnStage = _useBkState38[1];
  var _useBkState39 = useBkState(''),
    _useBkState40 = _slicedToArray(_useBkState39, 2),
    stageSyncMsg = _useBkState40[0],
    setStageSyncMsg = _useBkState40[1];
  var syncOnStage = function syncOnStage(id) {
    var tok = adminToken.trim();
    if (!captionsWorker) return;
    if (!tok) {
      setStageSyncMsg('Not sent to captions: enter the admin token above.');
      return;
    }
    fetch(captionsWorker + '/api/context', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tok
      },
      body: JSON.stringify({
        onStage: id,
        onStageLabel: teamLabel(stageOrder().find(function (t) {
          return t.id === id;
        }))
      })
    }).then(function (r) {
      return r.json().then(function (j) {
        return {
          ok: r.ok,
          j: j
        };
      });
    }).then(function (_ref4) {
      var ok = _ref4.ok,
        j = _ref4.j;
      if (ok && !j.error) {
        setCtxOnStage(j.onStage || '');
        setStageSyncMsg('');
      } else setStageSyncMsg('Captions context not updated: ' + (j.error || 'error'));
    })["catch"](function (e) {
      return setStageSyncMsg('Captions context not updated: ' + e.message);
    });
  };
  // Changing the pitching team also points the captions at that team's script.
  var setLive = function setLive(id) {
    setStage({
      liveTeamId: id
    });
    syncOnStage(id === 'OFF_AIR' ? '' : id);
  };
  if (!open) return null;
  if (!unlocked) {
    return /*#__PURE__*/React.createElement("div", {
      className: "bk-backdrop",
      onClick: onClose,
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Backstage login"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-panel bk-gate",
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bk-title"
    }, "Backstage \xB7 locked"), /*#__PURE__*/React.createElement("button", {
      className: "bk-close",
      onClick: onClose,
      "aria-label": "Close"
    }, "\xD7")), /*#__PURE__*/React.createElement("div", {
      className: "bk-body"
    }, /*#__PURE__*/React.createElement("label", {
      className: "bk-label"
    }, "Enter password"), /*#__PURE__*/React.createElement("input", {
      className: "bk-input ".concat(pwErr ? 'warn' : ''),
      type: "password",
      value: pw,
      autoFocus: true,
      spellCheck: false,
      onChange: function onChange(e) {
        setPw(e.target.value);
        setPwErr(false);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === 'Enter') tryUnlock();
      }
    }), pwErr && /*#__PURE__*/React.createElement("div", {
      className: "bk-hint warn"
    }, "Incorrect password."), /*#__PURE__*/React.createElement("button", {
      className: "bk-btn primary",
      style: {
        marginTop: 12
      },
      onClick: tryUnlock
    }, "Unlock"))));
  }
  var idValid = /^[A-Za-z]{4}-?\d{4}$/.test(draftId.trim());
  var normalizedId = draftId.trim().toUpperCase();
  var commitId = function commitId() {
    if (draftId.trim()) setStage({
      sessionId: normalizedId
    });
  };
  var phases = [{
    value: 'before',
    label: 'Before'
  }, {
    value: 'live',
    label: 'On Air'
  }, {
    value: 'cocktail',
    label: 'Cocktail'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "bk-backdrop",
    onClick: onClose,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Backstage operator console"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-panel",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-dot"
  }), " Backstage", /*#__PURE__*/React.createElement("span", {
    className: "bk-sub"
  }, "Operator console \xB7 saved on this device")), /*#__PURE__*/React.createElement("button", {
    className: "bk-close",
    onClick: onClose,
    "aria-label": "Close"
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "bk-body"
  }, (window.EVENT_CONFIG ? window.EVENT_CONFIG.wordly !== false : true) && /*#__PURE__*/React.createElement("section", {
    className: "bk-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bk-label"
  }, "Wordly session ID"), /*#__PURE__*/React.createElement("div", {
    className: "bk-id-row"
  }, /*#__PURE__*/React.createElement("input", {
    className: "bk-input mono ".concat(draftId && !idValid ? 'warn' : ''),
    value: draftId,
    placeholder: "DXRS-1194",
    spellCheck: false,
    autoCapitalize: "characters",
    onChange: function onChange(e) {
      return setDraftId(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') commitId();
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn primary",
    onClick: commitId,
    disabled: !draftId.trim() || normalizedId === stage.sessionId
  }, normalizedId === stage.sessionId ? 'Saved ✓' : 'Update')), /*#__PURE__*/React.createElement("div", {
    className: "bk-hint"
  }, draftId && !idValid ? /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, "Format looks unusual \u2014 Wordly IDs are 4 letters + 4 digits (e.g. DXRS-1194). Saving anyway is allowed.") : /*#__PURE__*/React.createElement("span", null, "Pushes instantly to the banner, nav button, captions strip & QR codes.")), /*#__PURE__*/React.createElement("div", {
    className: "bk-live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Now live:"), /*#__PURE__*/React.createElement("code", null, stage.sessionId || '—'), /*#__PURE__*/React.createElement("a", {
    href: "https://attend.wordly.ai/join/".concat(stage.sessionId),
    target: "_blank",
    rel: "noopener",
    className: "bk-open"
  }, "Test attendee link \u2192"))), captionsWorker && /*#__PURE__*/React.createElement("section", {
    className: "bk-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bk-label"
  }, "Live captions engine"), /*#__PURE__*/React.createElement("input", {
    className: "bk-input mono",
    type: "password",
    placeholder: "Admin token (ddtw_\u2026)",
    value: adminToken,
    spellCheck: false,
    autoComplete: "off",
    onChange: function onChange(e) {
      return setAdminToken(e.target.value);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-seg",
    style: {
      marginTop: 8
    }
  }, ['gemini', 'openai'].map(function (e) {
    return /*#__PURE__*/React.createElement("button", {
      key: e,
      className: liveSource === e ? 'on' : '',
      onClick: function onClick() {
        return flipEngine(e);
      }
    }, e === 'gemini' ? 'Gemini (GCP)' : 'OpenAI · backup');
  })), /*#__PURE__*/React.createElement("div", {
    className: "bk-hint"
  }, switchMsg ? /*#__PURE__*/React.createElement("span", {
    className: /fail|error|token/i.test(switchMsg) ? 'warn' : ''
  }, switchMsg) : /*#__PURE__*/React.createElement("span", null, "Flips the Captions tab for ", /*#__PURE__*/React.createElement("b", null, "all guests"), ", instantly. ", /*#__PURE__*/React.createElement("b", null, "Gemini"), " is the main engine; OpenAI is the backup.")), /*#__PURE__*/React.createElement("div", {
    className: "bk-live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Now live:"), " ", /*#__PURE__*/React.createElement("code", null, (liveSource || '—').toUpperCase())), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn ghost",
    style: {
      marginTop: 8
    },
    onClick: clearCaptions
  }, "Clear caption history")), captionsWorker && /*#__PURE__*/React.createElement("section", {
    className: "bk-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bk-label"
  }, "Caption context ", /*#__PURE__*/React.createElement("span", {
    className: "bk-muted"
  }, "what the AI reads before it captions")), /*#__PURE__*/React.createElement(CaptionContext, {
    worker: captionsWorker,
    token: adminToken.trim(),
    onStage: ctxOnStage,
    onLoaded: setCtxOnStage
  })), /*#__PURE__*/React.createElement("section", {
    className: "bk-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bk-label"
  }, "Event phase"), /*#__PURE__*/React.createElement("div", {
    className: "bk-seg"
  }, phases.map(function (p) {
    return /*#__PURE__*/React.createElement("button", {
      key: p.value,
      className: stage.phase === p.value ? 'on' : '',
      onClick: function onClick() {
        return setStage({
          phase: p.value
        });
      }
    }, p.label);
  })), /*#__PURE__*/React.createElement("div", {
    className: "bk-hint"
  }, "Controls the \u201CNow on stage\u201D takeover. ", /*#__PURE__*/React.createElement("b", null, "Before"), " = doors-open card \xB7 ", /*#__PURE__*/React.createElement("b", null, "On Air"), " = live team \xB7 ", /*#__PURE__*/React.createElement("b", null, "Cocktail"), " = networking.")), /*#__PURE__*/React.createElement("section", {
    className: "bk-section"
  }, /*#__PURE__*/React.createElement("label", {
    className: "bk-label"
  }, "Currently pitching ", stage.phase !== 'live' && /*#__PURE__*/React.createElement("span", {
    className: "bk-muted"
  }, "(active in On Air)")), /*#__PURE__*/React.createElement("select", {
    className: "bk-input",
    value: stage.liveTeamId,
    disabled: stage.phase !== 'live',
    onChange: function onChange(e) {
      return setLive(e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "OFF_AIR"
  }, "\u2014 Off air / break \u2014"), stageOrder().map(function (t) {
    return /*#__PURE__*/React.createElement("option", {
      key: t.id,
      value: t.id
    }, String(t.speakerOrder).padStart(2, '0'), " \xB7 ", t.name, " (", t.batch, ")");
  })), /*#__PURE__*/React.createElement("div", {
    className: "bk-stepper"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bk-btn",
    disabled: stage.phase !== 'live',
    onClick: function onClick() {
      return stepLive(-1, stage, setLive);
    }
  }, "\u2190 Prev"), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn",
    disabled: stage.phase !== 'live',
    onClick: function onClick() {
      return stepLive(1, stage, setLive);
    }
  }, "Next \u2192"), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn",
    disabled: stage.phase !== 'live',
    onClick: function onClick() {
      return setLive('OFF_AIR');
    }
  }, "Off air")), captionsWorker && /*#__PURE__*/React.createElement("div", {
    className: "bk-hint"
  }, stageSyncMsg ? /*#__PURE__*/React.createElement("span", {
    className: "warn"
  }, stageSyncMsg) : /*#__PURE__*/React.createElement("span", null, "Also sets the caption context to that team's script (now: ", /*#__PURE__*/React.createElement("b", null, (stageOrder().find(function (t) {
    return t.id === ctxOnStage;
  }) || {}).name || 'none'), ").")))), /*#__PURE__*/React.createElement("div", {
    className: "bk-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bk-btn ghost",
    onClick: reset
  }, "Reset to defaults"), /*#__PURE__*/React.createElement("span", {
    className: "bk-kbd"
  }, "\u2318/Ctrl + Shift + B to toggle"))));
}
window.Backstage = Backstage;

// Advance / rewind the live team in stage order (AW → WA → CPD, then pitch
// order). setLive(id) updates the page state and the caption context.
function stepLive(dir, stage, setLive) {
  var ordered = stageOrder();
  var idx = ordered.findIndex(function (t) {
    return t.id === stage.liveTeamId;
  });
  var next;
  if (idx === -1) {
    next = dir > 0 ? ordered[0] : ordered[ordered.length - 1];
  } else {
    var ni = idx + dir;
    if (ni < 0 || ni >= ordered.length) {
      setLive('OFF_AIR');
      return;
    }
    next = ordered[ni];
  }
  setLive(next.id);
}
