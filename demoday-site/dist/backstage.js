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
function Backstage(_ref) {
  var open = _ref.open,
    onClose = _ref.onClose,
    stage = _ref.stage,
    setStage = _ref.setStage,
    reset = _ref.reset;
  var _useBkState5 = useBkState(stage.sessionId),
    _useBkState6 = _slicedToArray(_useBkState5, 2),
    draftId = _useBkState6[0],
    setDraftId = _useBkState6[1];
  useBkEffect(function () {
    setDraftId(stage.sessionId);
  }, [stage.sessionId]);

  // Password gate — unlocks for this browser session only.
  var _useBkState7 = useBkState(function () {
      try {
        return sessionStorage.getItem('dd33.bk.unlocked') === '1';
      } catch (e) {
        return false;
      }
    }),
    _useBkState8 = _slicedToArray(_useBkState7, 2),
    unlocked = _useBkState8[0],
    setUnlocked = _useBkState8[1];
  var _useBkState9 = useBkState(''),
    _useBkState0 = _slicedToArray(_useBkState9, 2),
    pw = _useBkState0[0],
    setPw = _useBkState0[1];
  var _useBkState1 = useBkState(false),
    _useBkState10 = _slicedToArray(_useBkState1, 2),
    pwErr = _useBkState10[0],
    setPwErr = _useBkState10[1];
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
  var _useBkState11 = useBkState(function () {
      try {
        return localStorage.getItem('ddtw.token') || '';
      } catch (e) {
        return '';
      }
    }),
    _useBkState12 = _slicedToArray(_useBkState11, 2),
    adminToken = _useBkState12[0],
    setAdminToken = _useBkState12[1];
  var _useBkState13 = useBkState(''),
    _useBkState14 = _slicedToArray(_useBkState13, 2),
    liveSource = _useBkState14[0],
    setLiveSource = _useBkState14[1];
  var _useBkState15 = useBkState(''),
    _useBkState16 = _slicedToArray(_useBkState15, 2),
    switchMsg = _useBkState16[0],
    setSwitchMsg = _useBkState16[1];
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
    }).then(function (_ref2) {
      var ok = _ref2.ok,
        j = _ref2.j;
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
  }, ['openai', 'gemini', 'wordly'].map(function (e) {
    return /*#__PURE__*/React.createElement("button", {
      key: e,
      className: liveSource === e ? 'on' : '',
      onClick: function onClick() {
        return flipEngine(e);
      }
    }, e === 'openai' ? 'OpenAI' : e === 'gemini' ? 'Gemini' : 'Wordly');
  })), /*#__PURE__*/React.createElement("div", {
    className: "bk-hint"
  }, switchMsg ? /*#__PURE__*/React.createElement("span", {
    className: /fail|error|token/i.test(switchMsg) ? 'warn' : ''
  }, switchMsg) : /*#__PURE__*/React.createElement("span", null, "Flips the Captions tab for ", /*#__PURE__*/React.createElement("b", null, "all guests"), ", instantly. ", /*#__PURE__*/React.createElement("b", null, "Wordly"), " = backup.")), /*#__PURE__*/React.createElement("div", {
    className: "bk-live"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Now live:"), " ", /*#__PURE__*/React.createElement("code", null, (liveSource || '—').toUpperCase())), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn ghost",
    style: {
      marginTop: 8
    },
    onClick: clearCaptions
  }, "Clear caption history")), /*#__PURE__*/React.createElement("section", {
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
      return setStage({
        liveTeamId: e.target.value
      });
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "OFF_AIR"
  }, "\u2014 Off air / break \u2014"), TEAMS.map(function (t) {
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
      return stepLive(-1, stage, setStage);
    }
  }, "\u2190 Prev"), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn",
    disabled: stage.phase !== 'live',
    onClick: function onClick() {
      return stepLive(1, stage, setStage);
    }
  }, "Next \u2192"), /*#__PURE__*/React.createElement("button", {
    className: "bk-btn",
    disabled: stage.phase !== 'live',
    onClick: function onClick() {
      return setStage({
        liveTeamId: 'OFF_AIR'
      });
    }
  }, "Off air")))), /*#__PURE__*/React.createElement("div", {
    className: "bk-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "bk-btn ghost",
    onClick: reset
  }, "Reset to defaults"), /*#__PURE__*/React.createElement("span", {
    className: "bk-kbd"
  }, "\u2318/Ctrl + Shift + B to toggle"))));
}
window.Backstage = Backstage;

// Advance / rewind the live team by pitch order.
function stepLive(dir, stage, setStage) {
  var ordered = _toConsumableArray(TEAMS).sort(function (a, b) {
    return a.speakerOrder - b.speakerOrder;
  });
  var idx = ordered.findIndex(function (t) {
    return t.id === stage.liveTeamId;
  });
  var next;
  if (idx === -1) {
    next = dir > 0 ? ordered[0] : ordered[ordered.length - 1];
  } else {
    var ni = idx + dir;
    if (ni < 0 || ni >= ordered.length) {
      setStage({
        liveTeamId: 'OFF_AIR'
      });
      return;
    }
    next = ordered[ni];
  }
  setStage({
    liveTeamId: next.id
  });
}
