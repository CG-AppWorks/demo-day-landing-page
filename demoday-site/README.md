# AppWorks #32 — Demo Day landing pages (Taiwan + Singapore)

Two single-page event sites that share the same components:

- **`index.html`** — **Taiwan** edition. AppWorks #32 + Wistron #10, bilingual (EN/中文),
  with Wordly live AI interpretation and the Accupai photo album.
- **`singapore.html`** — **Singapore** edition. AppWorks #32 only, English-only, no
  Wistron / Wordly / album. Edition differences are driven by `EVENT_CONFIG` in the data file.

Audience-facing: browse the pitching teams, open the founder intro email, and (TW) follow
the live captions + photo album.

## Run it

It's a static site — no build step. Open `index.html` in a browser, or serve the folder:

```bash
# any static server works, e.g.
python3 -m http.server 8000
# then visit http://localhost:8000
```

React + Babel are loaded from a CDN and JSX is transpiled in the browser, so the files
run as-is. An internet connection is required on first load for the CDN scripts and the
embedded Wordly / QR / Accupai resources.

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
| `index.html` | Shell — loads styles, React/Babel, and the component scripts in order |
| `tokens.css` | AppWorks design tokens (color, type, spacing, radius) |
| `styles.css` | All component styles |
| `data.js` | **Taiwan** team directory, agenda, nav tabs + `EVENT_CONFIG` (TW) |
| `data-sg.js` | **Singapore** team directory, agenda, nav tabs + `EVENT_CONFIG` (SG) |
| `chrome.jsx` | Top nav, hero, "Now on stage" card, footer, icons, AppWorks logo |
| `teams.jsx` | Team directory: search + cards (compact / cards / editorial) |
| `live.jsx` | Live panel + Wordly captions feed |
| `sections.jsx` | Agenda, photo album, About, partners, sponsors, intro modal |
| `backstage.jsx` | Operator backstage controls (session ID, on-stage team) |
| `app.jsx` | Top-level app, Tweaks panel, state wiring |
| `tweaks-panel.jsx` | Tweaks UI shell + form controls |
| `assets/` | Key visual, hero background, AppWorks mark (favicon) |

## Event-day setup

- **Wordly session ID** — set in the Tweaks panel (default `DXRS-1194`). Drives the
  caption iframe, QR codes, and attendee links.
- **On-stage team / phase** — operator-controlled via the backstage panel / Tweaks, so
  the page never drifts out of sync with the real schedule.
- **Photo album** — the Accupai link in `sections.jsx` (`Album`) opens the live album.

## Placeholders to replace

- The 4 **Wistron #10 (WA#10)** teams in `data.js` are placeholders — swap in the real
  lineup (same field shape as the AppWorks teams).
- **Sponsor** names (Google Cloud, AWS) are text-set; drop in official logo files if wanted.
