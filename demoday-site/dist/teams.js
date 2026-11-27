// Generated from teams.jsx by tools/build-jsx.mjs — edit the .jsx, then rebuild.
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
// teams.jsx — Teams directory with filters, cards, and density variants

function initials(name) {
  return name.replace(/[^A-Za-z0-9 ]/g, '').split(/\s+/).map(function (w) {
    return w[0];
  }).slice(0, 2).join('').toUpperCase();
}

// Flag glyph for the founder's HQ (single character pair, e.g. "KR" → 🇰🇷)
var FLAG = {
  TW: "🇹🇼",
  SG: "🇸🇬",
  KR: "🇰🇷",
  MY: "🇲🇾",
  US: "🇺🇸",
  HK: "🇭🇰",
  ID: "🇮🇩",
  JP: "🇯🇵",
  VN: "🇻🇳",
  PH: "🇵🇭",
  AU: "🇦🇺",
  FR: "🇫🇷",
  ES: "🇪🇸",
  AR: "🇦🇷",
  ARG: "🇦🇷",
  AE: "🇦🇪",
  CH: "🇨🇭"
};

// Logos and founder portraits come from each team's `logo` / `portrait` field in
// the data file. No logo -> order/initials box; no portrait -> HQ flag glyph.

// Wordmark logos stand alone; icon-only marks (team.logoMark) carry the name beside them.
function LogoRow(_ref) {
  var team = _ref.team,
    sm = _ref.sm;
  var img = /*#__PURE__*/React.createElement("img", {
    className: "card-logo-img".concat(sm ? ' sm' : '').concat(team.logoMark ? ' mark' : ''),
    src: team.logo,
    alt: team.name
  });
  if (!team.logoMark) return sm ? img : /*#__PURE__*/React.createElement("div", {
    className: "card-logo-row"
  }, img);
  return /*#__PURE__*/React.createElement("div", {
    className: "card-logo-row with-name".concat(sm ? ' sm' : '')
  }, img, /*#__PURE__*/React.createElement("h4", null, team.name));
}
function TeamCard(_ref2) {
  var team = _ref2.team,
    density = _ref2.density,
    favorited = _ref2.favorited,
    onFav = _ref2.onFav,
    onIntro = _ref2.onIntro,
    onOpenLive = _ref2.onOpenLive,
    accentLive = _ref2.accentLive,
    liveTeamId = _ref2.liveTeamId,
    language = _ref2.language;
  var sub = tr(language, team.sub, window.ZH && window.ZH.teamSub && window.ZH.teamSub[team.id]);
  var pitch = tr(language, team.pitch, window.ZH && window.ZH.teamPitch && window.ZH.teamPitch[team.id]);
  var liveEnabled = !(window.EVENT_CONFIG && window.EVENT_CONFIG.nowOnStage === false);
  var isLive = liveEnabled && team.id === liveTeamId;
  var liveCls = isLive && accentLive ? 'live' : '';
  var tagCls = team.tags[0] ? "tag-".concat(team.tags[0].toLowerCase().replace(/[^a-z0-9]/g, '-')) : '';
  var orderStr = String(team.speakerOrder).padStart(2, '0');
  var logo = team.logo;
  var portrait = team.portrait;
  if (density === 'compact') {
    return /*#__PURE__*/React.createElement("article", {
      id: "team-".concat(team.id),
      className: "team-card ".concat(liveCls, " ").concat(tagCls),
      onClick: function onClick() {
        return onOpenLive(team);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "logo order"
    }, orderStr), /*#__PURE__*/React.createElement("div", null, logo ? /*#__PURE__*/React.createElement(LogoRow, {
      team: team,
      sm: true
    }) : /*#__PURE__*/React.createElement("h4", null, team.name), /*#__PURE__*/React.createElement("div", {
      className: "sub",
      style: {
        marginTop: 2
      }
    }, sub)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "pitch",
      style: {
        minHeight: 0
      }
    }, pitch), /*#__PURE__*/React.createElement("div", {
      className: "badges",
      style: {
        marginTop: 6
      }
    }, team.tags.map(function (t) {
      return /*#__PURE__*/React.createElement("span", {
        key: t,
        className: "badge ".concat(t.toLowerCase().replace(/[^a-z0-9]/g, '-'))
      }, t);
    }))), /*#__PURE__*/React.createElement("div", {
      className: "presenter-mini"
    }, /*#__PURE__*/React.createElement("div", {
      className: "who"
    }, portrait ? /*#__PURE__*/React.createElement("img", {
      className: "presenter-avatar sm",
      src: portrait,
      alt: team.presenter
    }) : /*#__PURE__*/React.createElement("span", null, FLAG[team.hq] || ''), " ", team.presenter), /*#__PURE__*/React.createElement("div", {
      className: "role"
    }, team.title)), /*#__PURE__*/React.createElement("div", {
      className: "compact-actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "iconbtn ".concat(favorited ? 'on' : ''),
      onClick: function onClick(e) {
        e.stopPropagation();
        onFav(team.id);
      },
      title: "Save to shortlist",
      "data-track": "favorite",
      "data-team": team.id,
      "data-x": favorited ? 'remove' : 'add'
    }, favorited ? /*#__PURE__*/React.createElement(I.heartFill, null) : /*#__PURE__*/React.createElement(I.heart, null)), team.linkedin && /*#__PURE__*/React.createElement("a", {
      className: "iconbtn",
      href: team.linkedin,
      target: "_blank",
      rel: "noopener",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      title: "".concat(team.presenter, " on LinkedIn"),
      "data-track": "linkedin",
      "data-team": team.id
    }, /*#__PURE__*/React.createElement(I.linkedin, null)), team.website && /*#__PURE__*/React.createElement("a", {
      className: "iconbtn",
      href: team.website,
      target: "_blank",
      rel: "noopener",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      title: "Visit website",
      "data-track": "website",
      "data-team": team.id
    }, /*#__PURE__*/React.createElement(I.globe, null)), team.email && /*#__PURE__*/React.createElement("button", {
      className: "btn primary sm",
      onClick: function onClick(e) {
        e.stopPropagation();
        onIntro(team);
      },
      title: "Email ".concat(team.presenter),
      "data-track": "contact_open",
      "data-team": team.id
    }, /*#__PURE__*/React.createElement(I.mail, null), " Contact")));
  }
  if (density === 'editorial') {
    return /*#__PURE__*/React.createElement("article", {
      id: "team-".concat(team.id),
      className: "team-card ".concat(liveCls, " ").concat(tagCls),
      onClick: function onClick() {
        return onOpenLive(team);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "cover"
    }, /*#__PURE__*/React.createElement("span", {
      className: "order-tag"
    }, orderStr)), /*#__PURE__*/React.createElement("div", {
      className: "body"
    }, logo ? /*#__PURE__*/React.createElement(LogoRow, {
      team: team
    }) : /*#__PURE__*/React.createElement("div", {
      className: "head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "logo"
    }, initials(team.name)), /*#__PURE__*/React.createElement("div", {
      className: "meta"
    }, /*#__PURE__*/React.createElement("h4", null, team.name))), /*#__PURE__*/React.createElement("div", {
      className: "badges"
    }, team.tags.map(function (t) {
      return /*#__PURE__*/React.createElement("span", {
        key: t,
        className: "badge ".concat(t.toLowerCase().replace(/[^a-z0-9]/g, '-'))
      }, t);
    })), /*#__PURE__*/React.createElement("p", {
      className: "pitch"
    }, pitch), /*#__PURE__*/React.createElement("div", {
      className: "presenter"
    }, portrait ? /*#__PURE__*/React.createElement("img", {
      className: "presenter-avatar",
      src: portrait,
      alt: team.presenter
    }) : /*#__PURE__*/React.createElement("div", {
      className: "flag"
    }, FLAG[team.hq] || ''), /*#__PURE__*/React.createElement("div", {
      className: "who"
    }, /*#__PURE__*/React.createElement("b", null, team.presenter), /*#__PURE__*/React.createElement("span", null, [team.title, team.hq].filter(Boolean).join(' · ')))), /*#__PURE__*/React.createElement("div", {
      className: "foot"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement("button", {
      className: "iconbtn ".concat(favorited ? 'on' : ''),
      onClick: function onClick(e) {
        e.stopPropagation();
        onFav(team.id);
      },
      title: "Save to shortlist",
      "data-track": "favorite",
      "data-team": team.id,
      "data-x": favorited ? 'remove' : 'add'
    }, favorited ? /*#__PURE__*/React.createElement(I.heartFill, null) : /*#__PURE__*/React.createElement(I.heart, null)), team.linkedin && /*#__PURE__*/React.createElement("a", {
      className: "iconbtn",
      href: team.linkedin,
      target: "_blank",
      rel: "noopener",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      title: "".concat(team.presenter, " on LinkedIn"),
      "data-track": "linkedin",
      "data-team": team.id
    }, /*#__PURE__*/React.createElement(I.linkedin, null)), team.website && /*#__PURE__*/React.createElement("a", {
      className: "iconbtn",
      href: team.website,
      target: "_blank",
      rel: "noopener",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      title: "Visit website",
      "data-track": "website",
      "data-team": team.id
    }, /*#__PURE__*/React.createElement(I.globe, null)), team.email && /*#__PURE__*/React.createElement("button", {
      className: "btn primary sm",
      onClick: function onClick(e) {
        e.stopPropagation();
        onIntro(team);
      },
      title: "Email ".concat(team.presenter),
      "data-track": "contact_open",
      "data-team": team.id
    }, /*#__PURE__*/React.createElement(I.mail, null), " Contact founder")))));
  }

  // default / comfy
  return /*#__PURE__*/React.createElement("article", {
    id: "team-".concat(team.id),
    className: "team-card ".concat(liveCls, " ").concat(tagCls),
    onClick: function onClick() {
      return onOpenLive(team);
    }
  }, logo ? /*#__PURE__*/React.createElement(LogoRow, {
    team: team
  }) : /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo order"
  }, orderStr), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("h4", null, team.name))), /*#__PURE__*/React.createElement("div", {
    className: "badges"
  }, team.tags.map(function (t) {
    return /*#__PURE__*/React.createElement("span", {
      key: t,
      className: "badge ".concat(t.toLowerCase().replace(/[^a-z0-9]/g, '-'))
    }, t);
  })), /*#__PURE__*/React.createElement("p", {
    className: "pitch"
  }, pitch), /*#__PURE__*/React.createElement("div", {
    className: "presenter"
  }, portrait ? /*#__PURE__*/React.createElement("img", {
    className: "presenter-avatar",
    src: portrait,
    alt: team.presenter
  }) : /*#__PURE__*/React.createElement("div", {
    className: "flag"
  }, FLAG[team.hq] || ''), /*#__PURE__*/React.createElement("div", {
    className: "who"
  }, /*#__PURE__*/React.createElement("b", null, team.presenter), /*#__PURE__*/React.createElement("span", null, [team.title, team.hq].filter(Boolean).join(' · ')))), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "iconbtn ".concat(favorited ? 'on' : ''),
    onClick: function onClick(e) {
      e.stopPropagation();
      onFav(team.id);
    },
    title: "Save to shortlist",
    "data-track": "favorite",
    "data-team": team.id,
    "data-x": favorited ? 'remove' : 'add'
  }, favorited ? /*#__PURE__*/React.createElement(I.heartFill, null) : /*#__PURE__*/React.createElement(I.heart, null)), team.linkedin && /*#__PURE__*/React.createElement("a", {
    className: "iconbtn",
    href: team.linkedin,
    target: "_blank",
    rel: "noopener",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    title: "".concat(team.presenter, " on LinkedIn"),
    "data-track": "linkedin",
    "data-team": team.id
  }, /*#__PURE__*/React.createElement(I.linkedin, null)), team.website && /*#__PURE__*/React.createElement("a", {
    className: "iconbtn",
    href: team.website,
    target: "_blank",
    rel: "noopener",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    title: "Visit website",
    "data-track": "website",
    "data-team": team.id
  }, /*#__PURE__*/React.createElement(I.globe, null)), team.email && /*#__PURE__*/React.createElement("button", {
    className: "btn primary sm",
    onClick: function onClick(e) {
      e.stopPropagation();
      onIntro(team);
    },
    title: "Email ".concat(team.presenter),
    "data-track": "contact_open",
    "data-team": team.id
  }, /*#__PURE__*/React.createElement(I.mail, null), " Contact founder"))));
}

// Category chips: the four RFS first (#1 Manufacturing AI, #2 Defense Tech,
// #3 On-Chain Banking, #4 PQC), then the other groups. Only categories present
// in the list are shown, each with its team count.
var CATEGORY_ORDER = ['Manufacturing AI', 'Defense Tech', 'On-Chain Banking', 'PQC', 'Enterprise AI', 'Consumer AI', 'Semiconductor', 'Health Tech', 'Media'];
var tagSlug = function tagSlug(t) {
  return t.toLowerCase().replace(/[^a-z0-9]/g, '-');
};
function FilterBar(_ref3) {
  var filter = _ref3.filter,
    setFilter = _ref3.setFilter,
    teams = _ref3.teams,
    language = _ref3.language;
  var counts = {};
  teams.forEach(function (t) {
    return (t.tags || []).forEach(function (g) {
      counts[g] = (counts[g] || 0) + 1;
    });
  });
  var rank = function rank(c) {
    var i = CATEGORY_ORDER.indexOf(c);
    return i < 0 ? 99 : i;
  };
  var cats = Object.keys(counts).sort(function (a, b) {
    return rank(a) - rank(b);
  });
  var pick = function pick(tag) {
    return setFilter(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, {
        tag: tag
      });
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "filters",
    role: "group",
    "aria-label": "Filter teams by category"
  }, /*#__PURE__*/React.createElement("button", {
    className: "chip ".concat(filter.tag === 'All' ? 'on' : ''),
    onClick: function onClick() {
      return pick('All');
    },
    "data-track": "filter",
    "data-x": "all"
  }, tr(language, 'All', '全部'), " ", /*#__PURE__*/React.createElement("span", {
    className: "chip-n"
  }, teams.length)), cats.map(function (c) {
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      className: "chip tag-".concat(tagSlug(c), " ").concat(filter.tag === c ? 'on' : ''),
      onClick: function onClick() {
        return pick(filter.tag === c ? 'All' : c);
      },
      "data-track": "filter",
      "data-x": c
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), c, " ", /*#__PURE__*/React.createElement("span", {
      className: "chip-n"
    }, counts[c]));
  }), /*#__PURE__*/React.createElement("span", {
    className: "chip-divider"
  }), /*#__PURE__*/React.createElement("button", {
    className: "chip ".concat(filter.favoritesOnly ? 'on' : ''),
    onClick: function onClick() {
      return setFilter(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          favoritesOnly: !f.favoritesOnly
        });
      });
    }
  }, /*#__PURE__*/React.createElement(I.heart, null), " ", tr(language, 'Favorites', '收藏')));
}
function TeamsSection(_ref4) {
  var favorites = _ref4.favorites,
    onFav = _ref4.onFav,
    onIntro = _ref4.onIntro,
    onOpenLive = _ref4.onOpenLive,
    density = _ref4.density,
    accentIntensity = _ref4.accentIntensity,
    captionLanguage = _ref4.captionLanguage,
    onCaptionLanguageChange = _ref4.onCaptionLanguageChange,
    sessionId = _ref4.sessionId,
    liveTeamId = _ref4.liveTeamId,
    language = _ref4.language;
  var _useState = useState({
      tag: 'All',
      batches: [],
      languages: [],
      markets: [],
      favoritesOnly: false
    }),
    _useState2 = _slicedToArray(_useState, 2),
    filter = _useState2[0],
    setFilter = _useState2[1];

  // Wistron and Computing Power Donation teams are shown under the Wistron block, not here.
  var CFG = window.EVENT_CONFIG || {};
  var listed = TEAMS.filter(function (t) {
    return t.batch !== CFG.wistronBatch && t.batch !== CFG.donationBatch;
  });
  var filtered = listed.filter(function (t) {
    if (filter.tag !== 'All' && !t.tags.includes(filter.tag)) return false;
    if (filter.batches.length && !filter.batches.includes(t.batch)) return false;
    if (filter.languages.length && !filter.languages.includes((t.language || '').split(' ')[0])) return false;
    if (filter.markets.length && !filter.markets.includes(t.hq)) return false;
    if (filter.favoritesOnly && !favorites.includes(t.id)) return false;
    return true;
  });
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    id: "teams"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false && /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, window.EVENT_CONFIG.batchLabel), /*#__PURE__*/React.createElement("h2", null, tr(language, 'Presenting teams.', ZH.teams.heading)), /*#__PURE__*/React.createElement("p", {
    className: "sub"
  }, tr(language, window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false ? 'Tap any card to favorite it or request an intro to the founder.' : 'Tap any card to favorite it or request an intro.', ZH.teams.sub)))), /*#__PURE__*/React.createElement(FilterBar, {
    filter: filter,
    setFilter: setFilter,
    teams: listed,
    language: language
  }), /*#__PURE__*/React.createElement("div", {
    className: "stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "teams ".concat(density)
  }, filtered.map(function (t) {
    return /*#__PURE__*/React.createElement(TeamCard, {
      key: t.id,
      team: t,
      density: density,
      favorited: favorites.includes(t.id),
      onFav: onFav,
      onIntro: onIntro,
      onOpenLive: onOpenLive,
      accentLive: accentIntensity !== 'restrained',
      liveTeamId: liveTeamId,
      language: language
    });
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1',
      padding: '48px 24px',
      textAlign: 'center',
      color: 'var(--fg2)'
    }
  }, "No teams match these filters. ", /*#__PURE__*/React.createElement("button", {
    className: "btn ghost sm",
    onClick: function onClick() {
      return setFilter({
        tag: 'All',
        batches: [],
        languages: [],
        markets: [],
        favoritesOnly: false
      });
    }
  }, "Clear filters"))))));
}
window.TeamsSection = TeamsSection;
window.TeamCard = TeamCard;
