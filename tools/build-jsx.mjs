// Precompile the TW page's .jsx files so phones don't download and run Babel.
//
// Uses the SAME @babel/standalone build and the SAME options it applies to
// <script type="text/babel"> tags (presets react + env, its three default
// plugins), so the output runs exactly like before — just compiled ahead of time.
//
//   node tools/build-jsx.mjs           → writes demoday-site/dist/*.js
//   node tools/build-jsx.mjs --check   → exits 1 if dist/ is out of date with the .jsx
//
// Run it after editing any .jsx file, and commit dist/ with the change.
// (singapore.html still loads the .jsx files through in-browser Babel.)
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'demoday-site');
const DIST = path.join(SITE, 'dist');
const CACHE = path.join(ROOT, 'tools', '.cache');
const FILES = ['tweaks-panel', 'chrome', 'live', 'teams', 'sections', 'backstage', 'app'];

const BABEL_URL = 'https://unpkg.com/@babel/standalone@7.29.0/babel.min.js';
const BABEL_SRI = 'sha384-m08KidiNqLdpJqLq95G/LEi8Qvjl/xUYll3QILypMoQ65QorJ9Lvtp2RXYGBFj1y';

async function loadBabel() {
  const file = path.join(CACHE, 'babel-standalone-7.29.0.min.js');
  let src = fs.existsSync(file) ? fs.readFileSync(file) : null;
  if (!src) {
    const res = await fetch(BABEL_URL);
    if (!res.ok) throw new Error(`fetch ${BABEL_URL}: ${res.status}`);
    src = Buffer.from(await res.arrayBuffer());
  }
  const sri = 'sha384-' + crypto.createHash('sha384').update(src).digest('base64');
  if (sri !== BABEL_SRI) throw new Error(`Babel integrity mismatch: ${sri}`);
  fs.mkdirSync(CACHE, { recursive: true });
  fs.writeFileSync(file, src);
  const ctx = { window: {}, console };
  ctx.self = ctx.window;
  vm.createContext(ctx);
  vm.runInContext(src.toString('utf8'), ctx);
  return ctx.Babel || ctx.window.Babel;
}

const Babel = await loadBabel();
const check = process.argv.includes('--check');
let stale = 0;
fs.mkdirSync(DIST, { recursive: true });
for (const name of FILES) {
  const code = fs.readFileSync(path.join(SITE, `${name}.jsx`), 'utf8');
  // Mirrors buildBabelOptions() in @babel/standalone for a non-module script tag.
  const out = Babel.transform(code, {
    filename: `${name}.jsx`,
    presets: ['react', 'env'],
    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-flow-strip-types'],
    sourceMaps: false,
  }).code;
  const body = `// Generated from ${name}.jsx by tools/build-jsx.mjs — edit the .jsx, then rebuild.\n${out}\n`;
  const target = path.join(DIST, `${name}.js`);
  const prev = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
  if (prev !== body) {
    stale++;
    if (!check) fs.writeFileSync(target, body);
  }
  console.log(`${prev === body ? 'ok     ' : check ? 'STALE  ' : 'wrote  '} dist/${name}.js (${body.length} bytes)`);
}
if (check && stale) { console.error(`${stale} file(s) out of date: run node tools/build-jsx.mjs`); process.exit(1); }
