// Generated from chrome.jsx by tools/build-jsx.mjs — edit the .jsx, then rebuild.
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// chrome.jsx — TopNav, Hero, NowOnStage, Footer
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect;

/* ─── Icons (Lucide-style 24x24, 1.5 stroke) ─── */
var I = {
  search: function search(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    }));
  },
  user: function user(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "7",
      r: "4"
    }));
  },
  heart: function heart(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"
    }));
  },
  heartFill: function heartFill(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"
    }));
  },
  deck: function deck(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 2v6h6"
    }));
  },
  arrow: function arrow(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m12 5 7 7-7 7"
    }));
  },
  download: function download(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "7 10 12 15 17 10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "15",
      x2: "12",
      y2: "3"
    }));
  },
  up: function up(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "6 15 12 9 18 15"
    }));
  },
  send: function send(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m22 2-7 20-4-9-9-4Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22 2 11 13"
    }));
  },
  pin: function pin(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    }));
  },
  cal: function cal(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "18",
      rx: "2"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "2",
      x2: "16",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "8",
      y1: "2",
      x2: "8",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "10",
      x2: "21",
      y2: "10"
    }));
  },
  users: function users(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "9",
      cy: "7",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M22 21v-2a4 4 0 0 0-3-3.87"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 3.13a4 4 0 0 1 0 7.75"
    }));
  },
  mic: function mic(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "9",
      y: "2",
      width: "6",
      height: "12",
      rx: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 10a7 7 0 0 1-14 0"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "17",
      x2: "12",
      y2: "22"
    }));
  },
  mail: function mail(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "4",
      width: "20",
      height: "16",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m2 7 10 6 10-6"
    }));
  },
  linkedin: function linkedin(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "currentColor"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.94H5.56v8.4h2.78zM6.95 8.7a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22zM18.45 18.34v-4.6c0-2.42-.52-4.28-3.35-4.28-1.36 0-2.27.75-2.65 1.45h-.04V9.94H9.75v8.4h2.77v-4.16c0-1.1.21-2.16 1.57-2.16 1.34 0 1.36 1.25 1.36 2.23v4.09h2.99z"
    }));
  },
  camera: function camera(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M23 7L16 12 23 17z"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "1",
      y: "5",
      width: "15",
      height: "14",
      rx: "2"
    }));
  },
  eye: function eye(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }));
  },
  star: function star(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 15 9 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 9 12 2"
    }));
  },
  globe: function globe(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "2",
      y1: "12",
      x2: "22",
      y2: "12"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
    }));
  },
  menu: function menu(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "7",
      x2: "20",
      y2: "7"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "12",
      x2: "20",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "17",
      x2: "20",
      y2: "17"
    }));
  },
  x: function x(p) {
    return /*#__PURE__*/React.createElement("svg", _extends({
      className: "icon"
    }, p, {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    }));
  }
};
window.I = I;

/* ─── AppWorks logo (official wordmark, inlined so it recolors via currentColor) ─── */
function Logo(_ref) {
  var _ref$height = _ref.height,
    height = _ref$height === void 0 ? 24 : _ref$height;
  // Real AppWorks wordmark paths (cropped viewBox to the "AppWorks" lettering).
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "162 386 278 68",
    height: height,
    fill: "currentColor",
    "aria-label": "AppWorks",
    role: "img"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M195.58,426.08h-18.04l-4.69,10.23h-6.85l20.85-44.78,20.11,44.78h-6.96l-4.42-10.23ZM192.99,420.1l-6.25-14.33-6.55,14.33h12.8Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M217.19,450.77h-6.14v-41.04h6.14v2.89c2.42-2.42,5.17-3.63,8.24-3.63,3.66,0,6.67,1.35,9.03,4.04,2.4,2.67,3.6,6.05,3.6,10.12s-1.19,7.3-3.57,9.96c-2.37,2.64-5.35,3.96-8.95,3.96-3.11,0-5.89-1.25-8.35-3.74v17.44ZM231.79,423.19c0-2.55-.69-4.62-2.07-6.22-1.4-1.62-3.16-2.43-5.29-2.43-2.26,0-4.08.78-5.48,2.35-1.4,1.56-2.1,3.62-2.1,6.17s.7,4.55,2.1,6.17c1.38,1.58,3.2,2.37,5.46,2.37,2.13,0,3.88-.8,5.27-2.4,1.42-1.6,2.13-3.6,2.13-6Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M250.7,450.77h-6.14v-41.04h6.14v2.89c2.42-2.42,5.17-3.63,8.24-3.63,3.66,0,6.67,1.35,9.03,4.04,2.4,2.67,3.6,6.05,3.6,10.12s-1.19,7.3-3.57,9.96c-2.37,2.64-5.35,3.96-8.95,3.96-3.11,0-5.89-1.25-8.35-3.74v17.44ZM265.29,423.19c0-2.55-.69-4.62-2.07-6.22-1.4-1.62-3.16-2.43-5.29-2.43-2.26,0-4.08.78-5.48,2.35-1.4,1.56-2.1,3.62-2.1,6.17s.7,4.55,2.1,6.17c1.38,1.58,3.2,2.37,5.46,2.37,2.13,0,3.88-.8,5.27-2.4,1.42-1.6,2.13-3.6,2.13-6Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M277.12,394.18l10.97,28.16,11.46-30.2,10.97,30.2,11.65-28.16h6.9l-18.83,44.8-10.83-29.85-11.3,29.88-17.9-44.83h6.9Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M328.42,422.83c0-3.84,1.37-7.1,4.12-9.8,2.75-2.69,6.09-4.04,10.04-4.04s7.33,1.36,10.1,4.07c2.73,2.71,4.09,6.04,4.09,9.99s-1.37,7.32-4.12,10.01c-2.77,2.67-6.16,4.01-10.18,4.01s-7.32-1.36-10.01-4.09c-2.69-2.69-4.04-6.08-4.04-10.15ZM334.69,422.94c0,2.66.71,4.76,2.13,6.3,1.46,1.56,3.37,2.35,5.76,2.35s4.32-.77,5.76-2.32c1.44-1.55,2.16-3.61,2.16-6.19s-.72-4.65-2.16-6.19c-1.45-1.56-3.37-2.35-5.76-2.35s-4.25.78-5.7,2.35c-1.45,1.56-2.18,3.58-2.18,6.06Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M363.26,409.74h6.14v2.37c1.13-1.18,2.13-1.99,3-2.43.89-.45,1.95-.68,3.17-.68,1.62,0,3.31.53,5.07,1.58l-2.81,5.62c-1.16-.84-2.3-1.26-3.41-1.26-3.35,0-5.02,2.53-5.02,7.59v13.78h-6.14v-26.58Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M391.14,390.23v28.1l8.65-8.6h8.24l-11.54,11.16,12.39,15.42h-7.97l-8.79-11.21-.98.98v10.23h-6.14v-46.09h6.14Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M428.28,414.27l-5.08,2.7c-.8-1.64-1.79-2.45-2.97-2.45-.56,0-1.05.19-1.45.56-.4.37-.6.85-.6,1.43,0,1.02,1.18,2.03,3.55,3.03,3.26,1.4,5.45,2.69,6.58,3.87,1.13,1.18,1.69,2.77,1.69,4.77,0,2.57-.95,4.71-2.84,6.44-1.84,1.64-4.06,2.46-6.66,2.46-4.46,0-7.61-2.17-9.47-6.52l5.24-2.43c.73,1.27,1.28,2.08,1.66,2.43.75.69,1.64,1.04,2.67,1.04,2.07,0,3.11-.95,3.11-2.84,0-1.09-.8-2.11-2.4-3.06-.62-.31-1.24-.61-1.86-.9-.62-.29-1.25-.59-1.88-.9-1.78-.87-3.04-1.75-3.77-2.62-.93-1.11-1.39-2.54-1.39-4.29,0-2.31.79-4.22,2.37-5.73,1.62-1.51,3.58-2.26,5.89-2.26,3.4,0,5.93,1.76,7.59,5.27Z"
  }));
}
window.Logo = Logo;

/* ─── Top nav ─── */
function TopNav(_ref2) {
  var activeTab = _ref2.activeTab,
    onNav = _ref2.onNav,
    onLanguageChange = _ref2.onLanguageChange,
    language = _ref2.language,
    sessionId = _ref2.sessionId;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    menuOpen = _useState2[0],
    setMenuOpen = _useState2[1];
  var CFG = window.EVENT_CONFIG || {};
  var captionsUrl = "https://attend.wordly.ai/join/".concat(sessionId || 'DXRS-1194');
  // When the live-caption switch is configured, the nav buttons open the
  // on-page captions widget instead of the external Wordly page.
  var hasLiveCaptions = !!CFG.captionsWorker;
  var openCaptions = function openCaptions(e) {
    if (!hasLiveCaptions) return;
    e.preventDefault();
    setMenuOpen(false);
    if (window.ddOpenCaptions) window.ddOpenCaptions();
  };

  // Lock body scroll while the mobile sheet is open.
  useEffect(function () {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return function () {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);
  var go = function go(id) {
    onNav(id);
    setMenuOpen(false);
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container nav-inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-brand",
    href: "#top",
    onClick: function onClick(e) {
      e.preventDefault();
      go('top');
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    height: 29
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-tabs"
  }, TABS.map(function (t) {
    return /*#__PURE__*/React.createElement("a", {
      key: t.id,
      href: "#".concat(t.id),
      className: activeTab === t.id ? 'active' : '',
      onClick: function onClick(e) {
        e.preventDefault();
        onNav(t.id);
      },
      "data-track": "nav",
      "data-x": t.id
    }, tr(language, t.label, window.ZH && window.ZH.tabs[t.id]));
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-cta"
  }, CFG.bilingual !== false && /*#__PURE__*/React.createElement("button", {
    className: "btn ghost sm",
    onClick: function onClick() {
      onLanguageChange(language === 'zh' ? 'en' : 'zh');
    },
    title: "Toggle language",
    "data-track": "lang",
    "data-x": language === 'zh' ? 'en' : 'zh'
  }, language === 'zh' ? 'EN' : '中文'), CFG.wordly !== false && !hasLiveCaptions && /*#__PURE__*/React.createElement("a", {
    className: "btn outline sm",
    href: captionsUrl,
    target: "_blank",
    rel: "noopener",
    onClick: openCaptions,
    "data-track": "captions",
    "data-x": "nav",
    title: "Open AI live interpretation"
  }, /*#__PURE__*/React.createElement(I.globe, null), " ", language === 'zh' ? '即時翻譯' : 'Live Captions'), CFG.album !== false && /*#__PURE__*/React.createElement("a", {
    className: "btn primary sm",
    href: "#album",
    "data-track": "album",
    "data-x": "nav",
    onClick: function onClick(e) {
      e.preventDefault();
      go('album');
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "live-dot"
  }), " ", language === 'zh' ? '活動相簿' : 'Live Album')), /*#__PURE__*/React.createElement("div", {
    className: "nav-mobile"
  }, CFG.wordly !== false && !hasLiveCaptions && /*#__PURE__*/React.createElement("a", {
    className: "btn primary sm nav-cap-pill",
    href: captionsUrl,
    target: "_blank",
    rel: "noopener",
    onClick: openCaptions,
    "data-track": "captions",
    "data-x": "nav",
    title: "Live interpretation"
  }, /*#__PURE__*/React.createElement(I.globe, null), " ", language === 'zh' ? '即時翻譯' : 'Captions'), /*#__PURE__*/React.createElement("button", {
    className: "nav-burger",
    "aria-label": menuOpen ? 'Close menu' : 'Open menu',
    "aria-expanded": menuOpen,
    onClick: function onClick() {
      return setMenuOpen(function (o) {
        return !o;
      });
    }
  }, menuOpen ? /*#__PURE__*/React.createElement(I.x, null) : /*#__PURE__*/React.createElement(I.menu, null)))), /*#__PURE__*/React.createElement("div", {
    className: "nav-sheet ".concat(menuOpen ? 'open' : ''),
    onClick: function onClick() {
      return setMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-sheet-panel",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-sheet-links"
  }, TABS.map(function (t) {
    return /*#__PURE__*/React.createElement("a", {
      key: t.id,
      href: "#".concat(t.id),
      className: activeTab === t.id ? 'active' : '',
      onClick: function onClick(e) {
        e.preventDefault();
        go(t.id);
      },
      "data-track": "nav",
      "data-x": t.id
    }, tr(language, t.label, window.ZH && window.ZH.tabs[t.id]));
  })), /*#__PURE__*/React.createElement("div", {
    className: "nav-sheet-actions"
  }, CFG.wordly !== false && !hasLiveCaptions && /*#__PURE__*/React.createElement("a", {
    className: "btn primary",
    href: captionsUrl,
    target: "_blank",
    rel: "noopener",
    onClick: openCaptions,
    "data-track": "captions",
    "data-x": "nav"
  }, /*#__PURE__*/React.createElement(I.globe, null), " ", language === 'zh' ? '即時翻譯' : 'Live Captions'), CFG.album !== false && /*#__PURE__*/React.createElement("a", {
    className: "btn outline",
    href: "#album",
    "data-track": "album",
    "data-x": "nav",
    onClick: function onClick(e) {
      e.preventDefault();
      go('album');
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "live-dot",
    style: {
      background: 'var(--accent)'
    }
  }), " ", language === 'zh' ? '活動相簿' : 'Live Photo Album'), CFG.bilingual !== false && /*#__PURE__*/React.createElement("button", {
    className: "btn ghost",
    onClick: function onClick() {
      onLanguageChange(language === 'zh' ? 'en' : 'zh');
      setMenuOpen(false);
    },
    "data-track": "lang",
    "data-x": language === 'zh' ? 'en' : 'zh'
  }, /*#__PURE__*/React.createElement(I.globe, null), " ", language === 'zh' ? 'Switch to English' : '切換為中文')))));
}
window.TopNav = TopNav;

/* Render data-file copy: **bold** -> <b>, newline -> <br/>. */
function rich(text) {
  return String(text || '').split('\n').map(function (line, i, lines) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, line.split('**').map(function (part, j) {
      return j % 2 ? /*#__PURE__*/React.createElement("b", {
        key: j
      }, part) : part;
    }), i < lines.length - 1 && /*#__PURE__*/React.createElement(React.Fragment, null, ' ', /*#__PURE__*/React.createElement("br", null)));
  });
}
window.rich = rich;

/* ─── Hero ─── */
function Hero(_ref3) {
  var _ref3$variant = _ref3.variant,
    variant = _ref3$variant === void 0 ? 'photo' : _ref3$variant,
    language = _ref3.language,
    kpis = _ref3.kpis;
  var CFG = window.EVENT_CONFIG || {};
  var city = CFG.city || 'Taipei';
  var lede = CFG.heroLede || {};
  // Markets = distinct HQs of the teams on this page, most teams first
  // (placeholder teams have none).
  var hqCount = {};
  TEAMS.forEach(function (t) {
    if (t.hq) hqCount[t.hq] = (hqCount[t.hq] || 0) + 1;
  });
  var markets = Object.keys(hqCount).sort(function (a, b) {
    return hqCount[b] - hqCount[a];
  });
  // A blank line in the data-file copy starts a new paragraph.
  var paras = function paras(text) {
    return String(text || '').split('\n\n');
  };
  var enLede = /*#__PURE__*/React.createElement(React.Fragment, null, CFG.heroTitle && /*#__PURE__*/React.createElement("p", {
    className: "hero-title"
  }, CFG.heroTitle), paras(lede.en).map(function (p, i) {
    return /*#__PURE__*/React.createElement("p", {
      key: i,
      className: "lede center".concat(i ? ' more' : '')
    }, rich(p));
  }));
  return /*#__PURE__*/React.createElement("section", {
    className: "hero photo",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-bg",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "container hero-inner"
  }, CFG.heroEyebrow && /*#__PURE__*/React.createElement("div", {
    className: "eyebrow slate"
  }, CFG.heroEyebrow), /*#__PURE__*/React.createElement("div", {
    className: "hero-headline-block"
  }, CFG.keyVisual ? /*#__PURE__*/React.createElement("img", {
    className: "hero-keyvisual",
    src: CFG.keyVisual,
    alt: CFG.eventName
  }) : CFG.keyVisual === false ? /*#__PURE__*/React.createElement("h1", {
    className: "hero-wordmark"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hw-mark"
  }, CFG.batchLabel), /*#__PURE__*/React.createElement("span", {
    className: "hw-big"
  }, "Demo Day"), /*#__PURE__*/React.createElement("span", {
    className: "hw-city"
  }, city)) :
  /*#__PURE__*/
  // No key visual yet: an empty slot sized like the printed lockup.
  React.createElement("div", {
    className: "hero-kv-slot"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "sr-only"
  }, CFG.eventName, " \xB7 ", city), /*#__PURE__*/React.createElement("span", {
    className: "hero-kv-label"
  }, "Key visual \xB7 coming soon"))), (language === 'en' || language === 'both') && enLede, (language === 'zh' || language === 'both') && /*#__PURE__*/React.createElement("p", {
    className: "lede zh zh-line center"
  }, rich(lede.zh)), CFG.heroGuest && /*#__PURE__*/React.createElement("a", {
    className: "hero-guest",
    href: CFG.heroGuest.url || '#',
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-guest-tag"
  }, "Special Guest Keynote"), /*#__PURE__*/React.createElement("span", {
    className: "hero-guest-name"
  }, CFG.heroGuest.name), /*#__PURE__*/React.createElement("span", {
    className: "hero-guest-role"
  }, CFG.heroGuest.role)), /*#__PURE__*/React.createElement("div", {
    className: "hero-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, language === 'zh' ? '日期' : 'Date'), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, tr(language, CFG.heroDate, CFG.heroDateZh), /*#__PURE__*/React.createElement("small", null, tr(language, CFG.heroTime, CFG.heroTimeZh)))), /*#__PURE__*/React.createElement("div", {
    className: "item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, language === 'zh' ? '地點' : 'Venue'), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, tr(language, CFG.heroVenueShort, CFG.heroVenueShortZh), /*#__PURE__*/React.createElement("small", null, tr(language, CFG.heroVenueSub, CFG.heroVenueSubZh)))), /*#__PURE__*/React.createElement("div", {
    className: "item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, tr(language, 'Teams', '團隊')), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, kpis.teams), /*#__PURE__*/React.createElement("small", null, CFG.heroTeamsNote))), /*#__PURE__*/React.createElement("div", {
    className: "item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "k"
  }, tr(language, 'Markets', '市場')), /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, markets.length), /*#__PURE__*/React.createElement("small", null, markets.join(' · ')))))));
}
window.Hero = Hero;

/* Decorative SVG that lives behind the hero — symmetric backdrop */
function HeroDecor(_ref4) {
  var variant = _ref4.variant;
  if (variant === 'orange') return null;
  var ink = variant === 'bone' ? '#424F57' : '#FFFFFF';
  var inkOpacity = variant === 'bone' ? 0.08 : 0.10;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1600 700",
    preserveAspectRatio: "xMidYMid slice",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "0,140 0,700 320,700",
    fill: "#FF6B0F",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "1600,140 1600,700 1280,700",
    fill: "#FF6B0F",
    opacity: "0.85"
  }), /*#__PURE__*/React.createElement("g", {
    stroke: ink,
    strokeWidth: "1",
    fill: "none",
    opacity: inkOpacity
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "120",
    r: "120"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "120",
    cy: "120",
    r: "200"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "1480",
    cy: "120",
    r: "120"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "1480",
    cy: "120",
    r: "200"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: 780,
    cy: 120,
    r: "4",
    fill: "#FF6B0F"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: 820,
    cy: 120,
    r: "4",
    fill: "#FF6B0F"
  }));
}

/* ─ Helpers shared by the operator panel ─── */
function fmtClock(d) {
  var h = String(d.getHours()).padStart(2, '0');
  var m = String(d.getMinutes()).padStart(2, '0');
  return "".concat(h, ":").concat(m);
}
window.fmtClock = fmtClock;

/* ─ Now on stage ─── */
var LANGUAGES = [
// Wordly uses BCP-47-ish codes. en / zh-TW (Traditional, Taiwan).
{
  code: 'en',
  label: 'EN',
  name: 'English'
}, {
  code: 'zh-TW',
  label: '中文',
  name: '繁體中文'
}];
window.LANGUAGES = LANGUAGES;

/* ─── Wordly helpers ───
   Attendee URL: https://attend.wordly.ai/join/SESSION-ID
   iFrame URL:   https://attend.wordly.ai/frame/SESSION-ID?lang=xx&bgcolor=...&fgcolor=...
   Session IDs are formatted LLLL-NNNN (4 letters + 4 numbers).
*/
function wordlyJoinUrl(sessionId) {
  return "https://attend.wordly.ai/join/".concat(encodeURIComponent(sessionId));
}
function wordlyFrameUrl(sessionId, lang) {
  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var params = new URLSearchParams(_objectSpread(_objectSpread({
    lang: lang || 'en',
    bgcolor: opts.bgcolor || 'FFFFFF',
    fgcolor: opts.fgcolor || '424F57'
  }, opts.fgsize ? {
    fgsize: opts.fgsize
  } : {}), opts.key ? {
    key: opts.key
  } : {}));
  return "https://attend.wordly.ai/frame/".concat(encodeURIComponent(sessionId), "?").concat(params.toString());
}
function wordlyQrUrl(sessionId) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 180;
  // qrserver.com is a free QR generator — encodes the attendee URL.
  var target = wordlyJoinUrl(sessionId);
  return "https://api.qrserver.com/v1/create-qr-code/?size=".concat(size, "x").concat(size, "&margin=0&data=").concat(encodeURIComponent(target));
}
window.wordlyJoinUrl = wordlyJoinUrl;
window.wordlyFrameUrl = wordlyFrameUrl;
window.wordlyQrUrl = wordlyQrUrl;
function CaptionsStrip(_ref5) {
  var language = _ref5.language,
    onLanguageChange = _ref5.onLanguageChange,
    sessionId = _ref5.sessionId;
  if (window.EVENT_CONFIG && window.EVENT_CONFIG.wordly === false) return null;
  var worker = window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker || '';
  // Follow the live-caption switch: OpenAI/Gemini stream via the viewer,
  // Wordly via the existing embed.
  var _useState3 = useState('wordly'),
    _useState4 = _slicedToArray(_useState3, 2),
    src = _useState4[0],
    setSrc = _useState4[1];
  useEffect(function () {
    if (!worker) return;
    var stop = false;
    var poll = function poll() {
      return fetch(worker + '/api/latest?channel=active', {
        cache: 'no-store'
      }).then(function (r) {
        return r.json();
      }).then(function (d) {
        if (!stop) setSrc(d.active);
      })["catch"](function () {});
    };
    poll();
    var id = setInterval(poll, 3000);
    return function () {
      stop = true;
      clearInterval(id);
    };
  }, [worker]);
  var ai = worker && src !== 'wordly';
  var srcLabel = ai ? src === 'gemini' ? 'Gemini' : 'OpenAI' : 'Wordly';
  var langs = LANGUAGES;
  var joinUrl = wordlyJoinUrl(sessionId);
  var frameUrl = wordlyFrameUrl(sessionId, language, {
    bgcolor: 'FFFFFF',
    fgcolor: '424F57',
    fgsize: '1.1em'
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "captions",
    "aria-label": "AI live interpretation"
  }, /*#__PURE__*/React.createElement("div", {
    className: "captions-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge-ai"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "AI Live Interpretation"), /*#__PURE__*/React.createElement("span", {
    className: "powered"
  }, "Audience captions \xB7 ", /*#__PURE__*/React.createElement("b", null, srcLabel), ai ? ' · EN + 中文' : /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 Session ", /*#__PURE__*/React.createElement("code", null, sessionId))), !ai && /*#__PURE__*/React.createElement("div", {
    className: "lang-seg",
    role: "radiogroup",
    "aria-label": "Caption language"
  }, langs.map(function (l) {
    return /*#__PURE__*/React.createElement("button", {
      key: l.code,
      className: l.code === language ? 'on' : '',
      onClick: function onClick() {
        return onLanguageChange(l.code);
      },
      "aria-checked": l.code === language,
      title: l.name
    }, l.label);
  }))), ai ? /*#__PURE__*/React.createElement("div", {
    className: "captions-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wordly-frame",
    style: {
      background: '#0b0d10'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    key: src,
    src: worker + '/viewer?base=' + encodeURIComponent(worker),
    title: "Live captions",
    allow: "autoplay",
    loading: "lazy"
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "captions-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wordly-frame"
  }, /*#__PURE__*/React.createElement("iframe", {
    key: "".concat(sessionId, "-").concat(language),
    src: frameUrl,
    title: "Wordly live captions",
    allow: "autoplay",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wordly-fallback"
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, "Captions appear here once the session goes live"), /*#__PURE__*/React.createElement("a", {
    href: joinUrl,
    target: "_blank",
    rel: "noopener",
    className: "btn primary sm"
  }, "Open Wordly attendee page ", /*#__PURE__*/React.createElement(I.arrow, null)))), /*#__PURE__*/React.createElement("div", {
    className: "wordly-qr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qr-eyebrow"
  }, "Scan to listen on your phone"), /*#__PURE__*/React.createElement("div", {
    className: "qr-img"
  }, /*#__PURE__*/React.createElement("img", {
    src: wordlyQrUrl(sessionId, 180),
    alt: "QR code for Wordly session ".concat(sessionId),
    width: "120",
    height: "120"
  })), /*#__PURE__*/React.createElement("div", {
    className: "qr-detail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qr-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "URL"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "attend.wordly.ai")), /*#__PURE__*/React.createElement("div", {
    className: "qr-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Session"), /*#__PURE__*/React.createElement("span", {
    className: "v mono"
  }, sessionId))), /*#__PURE__*/React.createElement("a", {
    href: joinUrl,
    target: "_blank",
    rel: "noopener",
    className: "open-link"
  }, "Open in browser ", /*#__PURE__*/React.createElement(I.arrow, null)))));
}
window.CaptionsStrip = CaptionsStrip;
function NowOnStage(_ref6) {
  var team = _ref6.team,
    phase = _ref6.phase,
    captionLanguage = _ref6.captionLanguage,
    onCaptionLanguageChange = _ref6.onCaptionLanguageChange,
    sessionId = _ref6.sessionId;
  // Wordly live-captions only — the "on stage" team card was removed.
  return /*#__PURE__*/React.createElement("div", {
    className: "container stage-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stage-card captions-only"
  }, /*#__PURE__*/React.createElement(CaptionsStrip, {
    language: captionLanguage,
    onLanguageChange: onCaptionLanguageChange,
    sessionId: sessionId
  })));
}
window.NowOnStage = NowOnStage;

/* ─── Refer-a-founder modal (EVENT_CONFIG.refer) ─── */
function ReferModal(_ref7) {
  var language = _ref7.language,
    onClose = _ref7.onClose;
  var cfg = window.EVENT_CONFIG || {};
  var r = cfg.refer || {};
  var url = r.url || 'https://appworks.tw/accelerator/';
  var num = String(cfg.nextBatch || '').replace(/\D/g, '');
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    name = _useState6[0],
    setName = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    copied = _useState8[0],
    setCopied = _useState8[1];
  useEffect(function () {
    var onKey = function onKey(e) {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return function () {
      return document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);
  var live = !r.deadlineUntil || Date.now() <= new Date(r.deadlineUntil + 'T23:59:59+08:00').getTime();
  var who = name.trim();
  var en = "Hi ".concat(who || 'there', ", AppWorks is now taking applications for Accelerator Batch #").concat(num, ". ") + "They don't take any equity and have a massive founder network across Asia. " + "".concat(live && r.deadline ? r.deadline + ' ' : '', "Worth a look: ").concat(url);
  var zh = "\u55E8".concat(who ? ' ' + who : '', "\uFF0CAppWorks \u4E4B\u521D\u52A0\u901F\u5668\u7B2C ").concat(num, " \u5C46\u73FE\u6B63\u958B\u653E\u7533\u8ACB\u3002") + "\u52A0\u901F\u5668\u4E0D\u62FF\u4EFB\u4F55\u80A1\u6B0A\uFF0C\u9084\u6709\u904D\u5E03\u4E9E\u6D32\u7684\u9F90\u5927\u5275\u696D\u8005\u7DB2\u7D61\u3002" + "".concat(live && r.deadlineZh ? r.deadlineZh : '', "\u503C\u5F97\u4E00\u770B\uFF1A").concat(url);
  var msg = tr(language, en, zh);
  var subject = tr(language, "AppWorks Accelerator ".concat(cfg.nextBatch, " is open"), "AppWorks \u4E4B\u521D\u52A0\u901F\u5668 ".concat(cfg.nextBatch, " \u958B\u653E\u7533\u8ACB"));
  var copy = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var ta, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return navigator.clipboard.writeText(msg);
          case 1:
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
            ta = document.createElement('textarea');
            ta.value = msg;
            ta.setAttribute('readonly', '');
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            try {
              document.execCommand('copy');
            } catch (e2) {/* ignore */}
            ta.remove();
          case 3:
            setCopied(true);
            setTimeout(function () {
              return setCopied(false);
            }, 1800);
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function copy() {
      return _ref8.apply(this, arguments);
    };
  }();
  // Phones get the system share sheet (covers WhatsApp, Telegram, LINE, Messages…);
  // desktops get direct WhatsApp and email links.
  var nativeShare = typeof navigator !== 'undefined' && !!navigator.share && !!window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  var share = function share() {
    navigator.share({
      text: msg
    })["catch"](function () {});
  };
  var wa = "https://wa.me/?text=".concat(encodeURIComponent(msg));
  var mail = "mailto:?subject=".concat(encodeURIComponent(subject), "&body=").concat(encodeURIComponent(msg));
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    className: "modal-back",
    onClick: onClose,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": tr(language, 'Refer a founder', '推薦創業者')
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal refer-modal",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("h3", null, tr(language, 'Refer a founder to ', '推薦創業者加入 '), /*#__PURE__*/React.createElement("span", {
    className: "accent"
  }, cfg.nextBatch)), /*#__PURE__*/React.createElement("button", {
    className: "close",
    onClick: onClose,
    "aria-label": "Close"
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "refer-lede"
  }, tr(language, 'Know a founder who should be in the next AppWorks batch? Add their name, then copy or send this note.', '身邊有適合下一屆 AppWorks 的創業者嗎？填上名字，複製或直接傳送這段訊息。')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "refer-name"
  }, tr(language, "Founder's first name (optional)", '對方名字（選填）')), /*#__PURE__*/React.createElement("input", {
    id: "refer-name",
    className: "refer-name",
    type: "text",
    autoComplete: "off",
    maxLength: 40,
    value: name,
    onChange: function onChange(e) {
      return setName(e.target.value);
    },
    placeholder: tr(language, 'e.g. Alex', '例：小明')
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", null, tr(language, 'Message', '訊息')), /*#__PURE__*/React.createElement("div", {
    className: "field msg"
  }, msg)), /*#__PURE__*/React.createElement("div", {
    className: "refer-apply"
  }, tr(language, 'Applying yourself? ', '想自己申請？'), /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank",
    rel: "noopener",
    "data-track": "apply"
  }, tr(language, "See the ".concat(cfg.nextBatch, " page"), "\u770B ".concat(cfg.nextBatch, " \u62DB\u52DF\u9801")), " ", /*#__PURE__*/React.createElement(I.arrow, null)))), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, nativeShare ? /*#__PURE__*/React.createElement("button", {
    className: "btn outline sm",
    onClick: share,
    "data-track": "refer_share",
    "data-x": "native"
  }, tr(language, 'Share…', '分享…')) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    className: "btn outline sm",
    href: wa,
    target: "_blank",
    rel: "noopener",
    "data-track": "refer_share",
    "data-x": "whatsapp"
  }, "WhatsApp"), /*#__PURE__*/React.createElement("a", {
    className: "btn outline sm",
    href: mail,
    "data-track": "refer_share",
    "data-x": "email"
  }, "Email")), /*#__PURE__*/React.createElement("button", {
    className: "btn primary sm",
    onClick: copy,
    "data-track": "refer_copy"
  }, copied ? tr(language, 'Copied ✓', '已複製 ✓') : tr(language, 'Copy message', '複製訊息'))))), document.body);
}
window.ReferModal = ReferModal;

/* ─── Footer ─── */
function Footer(_ref9) {
  var language = _ref9.language;
  var cfg = window.EVENT_CONFIG || {};
  var refer = !!cfg.refer;
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    referOpen = _useState0[0],
    setReferOpen = _useState0[1];
  return /*#__PURE__*/React.createElement("footer", {
    className: "foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, refer ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "foot-cta",
    onClick: function onClick() {
      return setReferOpen(true);
    },
    "data-track": "refer_open"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-cta-text"
  }, /*#__PURE__*/React.createElement("b", null, tr(language, "Know a founder who should join ".concat(cfg.nextBatch, "?"), "\u8A8D\u8B58\u9069\u5408 ".concat(cfg.nextBatch, " \u7684\u5275\u696D\u8005\u55CE\uFF1F"))), /*#__PURE__*/React.createElement("span", null, tr(language, 'Applications are now open. Send them a ready-made note in one tap.', '現正開放申請，一鍵把介紹訊息傳給他。'))), /*#__PURE__*/React.createElement("span", {
    className: "foot-cta-btn"
  }, tr(language, 'Refer a founder', '推薦創業者'), " ", /*#__PURE__*/React.createElement(I.arrow, null))) : /*#__PURE__*/React.createElement("a", {
    className: "foot-cta",
    href: "https://appworks.tw/accelerator/",
    "data-track": "apply",
    target: "_blank",
    rel: "noopener"
  }, /*#__PURE__*/React.createElement("div", {
    className: "foot-cta-text"
  }, /*#__PURE__*/React.createElement("b", null, tr(language, "".concat(cfg.nextBatch, " is now taking applications!"), ZH.footer.ctaTitle)), /*#__PURE__*/React.createElement("span", null, tr(language, 'Join us — or refer a founder friend.', ZH.footer.ctaSub))), /*#__PURE__*/React.createElement("span", {
    className: "foot-cta-btn"
  }, tr(language, 'Apply / Refer', '申請 / 推薦'), " ", /*#__PURE__*/React.createElement(I.arrow, null))), referOpen && /*#__PURE__*/React.createElement(ReferModal, {
    language: language,
    onClose: function onClose() {
      return setReferOpen(false);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "foot-simple"
  }, /*#__PURE__*/React.createElement(Logo, {
    height: 26
  }), /*#__PURE__*/React.createElement("div", {
    className: "tag"
  }, "By Founders, For Founders."), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, "Helping tech startups disrupt the world since 2009.", /*#__PURE__*/React.createElement("br", null), "Contact us: ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:a@appworks.tw"
  }, "a@appworks.tw")), /*#__PURE__*/React.createElement("a", {
    href: "#backstage",
    className: "foot-backstage",
    "aria-label": "Backstage",
    title: "Backstage"
  }, "\uD83D\uDD12"))));
}
window.Footer = Footer;
