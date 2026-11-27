# AppWorks Demo Day landing pages (Taiwan + Singapore)

Current edition: **DD#33** (SG Tue 17 Nov 2026 · TW Thu 3 Dec 2026). DD#32 lives in git history (`main` before the `dd33-draft` branch).

Two single-page event sites that share the same components:

- **`index.html`** — **Taiwan** edition. AppWorks #33 + Wistron #11, bilingual (EN/中文),
  with live AI captions (our captions Worker on Gemini, OpenAI as backup; Wordly removed Nov 27).
- **`singapore.html`** — **Singapore** edition. AppWorks #33 only, English-only, no
  Wistron / captions / album. (Served at ddsg.appworks.tw from the `demo-day-singapore` repo.) Edition differences are driven by `EVENT_CONFIG` in the data file.

Audience-facing: browse the pitching teams, open the founder intro email, and (TW) follow
the live captions + photo album.

## Run it

It's a static site — no build step. Open `index.html` in a browser, or serve the folder:

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then visit http://localhost:8000
```

The TW page loads React from a CDN and the precompiled `dist/` scripts (see below);
`singapore.html` still transpiles its JSX in the browser. An internet connection is
required for the CDN scripts, the captions Worker and the Accupai album.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo.
2. Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your site goes live at `https://<user>.github.io/<repo>/`.

> Tip: for production you may prefer to convert to a Vite + React build (swap the
> `<script type="text/babel">` tags for real imports). Functionality is identical;
> a bundler just removes the in-browser transpile step.

## File map

| File | Purpose |
|------|---------|
| `index.html` | Shell — loads styles, React (production build) and the precompiled component scripts in `dist/` in order |
| `tokens.css` | AppWorks design tokens (color, type, spacing, radius) |
| `styles.css` | All component styles |
| `data.js` | **Taiwan** team directory, agenda, nav tabs + `EVENT_CONFIG` (TW) |
| `data-sg.js` | **Singapore** team directory, agenda, nav tabs + `EVENT_CONFIG` (SG) |
| `chrome.jsx` | Top nav, hero, "Now on stage" card, footer, icons, AppWorks logo |
| `teams.jsx` | Team directory: search + cards (compact / cards / editorial) |
| `live.jsx` | Live panel + floating 即時翻譯 captions widget (streams from the captions Worker) |
| `sections.jsx` | Agenda, photo album, About, partners, sponsors, intro modal |
| `backstage.jsx` | Operator backstage controls (session ID, on-stage team) |
| `app.jsx` | Top-level app, Tweaks panel, state wiring |
| `tweaks-panel.jsx` | Tweaks UI shell + form controls |
| `assets/` | Key visual, hero background, AppWorks mark (favicon) |
| `dist/` | **Generated** — the `.jsx` files precompiled by `../tools/build-jsx.mjs`. Never edit by hand |

**After editing any `.jsx` file, rebuild before committing:** `node tools/build-jsx.mjs` from the repo root
(`--check` exits 1 if `dist/` is stale). It uses the same Babel build and options the browser used before,
so output is identical; it just runs once instead of on every phone. `singapore.html` still uses in-browser Babel.

## Event-day setup

- **Live captions** — Backstage (footer link or ⌘/Ctrl+Shift+B, then the admin token):
  - *Live captions engine*: Gemini (main) / OpenAI (backup) for all guests.
  - *Caption context*: style notes, a glossary (`English = 中文`, `Name = keep`, `# note`)
    and each team's pitch script, saved on the captions Worker. The Worker sends the notes,
    the glossary and the on-stage team's script with every line it translates.
  - *Currently pitching* (in On Air) also sets which team's script the captions use.
  - The broadcaster laptop runs `<captions Worker>/broadcast` and shows the current context.
- **On-stage team / phase** — operator-controlled via the backstage panel / Tweaks, so
  the page never drifts out of sync with the real schedule.
- **Photo album** — the Accupai link in `sections.jsx` (`Album`) opens the live album.

## Edition config (`EVENT_CONFIG` in the data file)

Everything batch-specific lives in the data file, not the components: `eventName`,
`batchLabel`, `nextBatch` (footer CTA), `wistronBatch` / `wistronLabel` / `wistronPrograms`,
hero date/time/venue (`heroDate`, `heroDateZh`, …), `heroLede` ({en, zh}, `**bold**` + newlines),
`keyVisual` (image path · `false` = text wordmark · `''` = empty placeholder slot),
`album` + `albumUrl`, `captionsWorker`. Team cards take `logo` / `portrait` paths per team.
`window.BOOTH_MAP` and `window.EVENT_PARTNERS` turn on the booth map and perks sections.

## Visitor + click stats

`analytics.js` sends anonymous counts (page views, and every element tagged `data-track`:
contact founder → open email / copy, LinkedIn, website, favorite, nav, language, captions,
Apply) to the captions Worker (`EVENT_CONFIG.analytics`). No cookies or personal data — a random
visitor id in localStorage, plus the link's `utm_source` / referrer and Cloudflare's country.

- **Read them:** `https://ddtw-captions.hsichun.workers.dev/stats` (admin token; SG/TW toggle, per-team
  founder-contact table + CSV).
- **Tag the links you share** with `?utm_source=luma` / `linkedin` / `email` to see which channel works.
- **Staff devices:** open the page once with `?notrack=1` (undo with `?notrack=0`); clear pre-launch
  test clicks with the dashboard's reset button.
- On `localhost` the beacons go to a local `wrangler dev` on :8787, never production.

## Placeholders to replace (DD#33)

- **Key visual** — drop the artwork in `assets/` and set `keyVisual` to its path (both data files).
- **Wistron #11** teams in `data.js` have full cards (Hanomi, ROVEN by Sonice, WayDoSoft, ZiG).
- **Team logos** — none yet (cards fall back to the pitching-order box).
- **Booth map, event-partner perks, photo album** — off until confirmed.
- **Live-caption glossary** (`../ddtw-live-translate/worker/src/glossary.js`) still holds DD#32 +
  IVS terms; rebuild from the DD#33 pitch scripts, then `npx wrangler deploy`.
