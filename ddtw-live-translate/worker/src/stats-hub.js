// StatsHub — single Durable Object counting anonymous landing-page events
// (page views and button clicks) for the Demo Day pages (ddtw / ddsg).
//
// One row per event in SQLite. No personal data: `v` is a random visitor id
// the page keeps in localStorage, `cc` is Cloudflare's country code.
// The Worker validates and sanitises every field before it gets here.

import { json } from "./http.js";

const TZ_OFFSET_MS = 8 * 3600_000; // Taipei / Singapore day boundaries

export class StatsHub {
  constructor(state, env) {
    this.state = state;
    this.env = env;
    this.sql = state.storage.sql;
    this.sql.exec(`CREATE TABLE IF NOT EXISTS events (
      ts  INTEGER NOT NULL,
      day TEXT    NOT NULL,
      ed  TEXT    NOT NULL,
      e   TEXT    NOT NULL,
      t   TEXT    NOT NULL DEFAULT '',
      x   TEXT    NOT NULL DEFAULT '',
      v   TEXT    NOT NULL,
      src TEXT    NOT NULL DEFAULT '',
      cc  TEXT    NOT NULL DEFAULT ''
    )`);
    this.sql.exec("CREATE INDEX IF NOT EXISTS events_ed_e ON events (ed, e)");
  }

  async fetch(request) {
    const url = new URL(request.url);
    try {
      switch (url.pathname) {
        case "/api/track":       return await this.handleTrack(request);
        case "/api/stats":       return this.handleStats(url);
        case "/api/stats/reset": return await this.handleReset(request);
        default:                 return json({ error: "not_found" }, { status: 404 });
      }
    } catch (err) {
      return json({ error: "internal", message: String((err && err.message) || err) }, { status: 500 });
    }
  }

  // -- POST /api/track (already validated by the Worker) --------------------
  async handleTrack(request) {
    const r = await request.json();
    const ts = Date.now();
    const day = new Date(ts + TZ_OFFSET_MS).toISOString().slice(0, 10);
    this.sql.exec(
      "INSERT INTO events (ts, day, ed, e, t, x, v, src, cc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      ts, day, r.ed, r.e, r.t, r.x, r.v, r.src, r.cc,
    );
    return new Response(null, { status: 204 });
  }

  // -- GET /api/stats?ed=TW|SG ----------------------------------------------
  // Everything the stats page shows, aggregated in one call.
  handleStats(url) {
    const ed = url.searchParams.get("ed") === "SG" ? "SG" : "TW";
    const all = (q, ...args) => this.sql.exec(q, ed, ...args).toArray();
    const one = (q) => all(q)[0] || {};

    return json({
      ed,
      generatedAt: new Date().toISOString(),
      totals: one(`SELECT COUNT(DISTINCT v) AS visitors,
                          SUM(e = 'page_view') AS pageViews,
                          COUNT(*) AS events,
                          MIN(ts) AS firstTs, MAX(ts) AS lastTs
                   FROM events WHERE ed = ?`),
      byEvent: all(`SELECT e, COUNT(*) AS n, COUNT(DISTINCT v) AS u
                    FROM events WHERE ed = ? GROUP BY e ORDER BY n DESC`),
      byTeam: all(`SELECT t, e, x, COUNT(*) AS n, COUNT(DISTINCT v) AS u
                   FROM events WHERE ed = ? AND t != '' GROUP BY t, e, x`),
      byDetail: all(`SELECT e, x, COUNT(*) AS n, COUNT(DISTINCT v) AS u
                     FROM events WHERE ed = ? AND t = '' AND x != '' AND e != 'page_view'
                     GROUP BY e, x ORDER BY e, n DESC`),
      daily: all(`SELECT day, COUNT(DISTINCT v) AS visitors, SUM(e = 'page_view') AS pageViews,
                         SUM(e = 'contact_open') AS contacts
                  FROM events WHERE ed = ? GROUP BY day ORDER BY day`),
      sources: all(`SELECT src, COUNT(DISTINCT v) AS visitors, COUNT(*) AS pageViews
                    FROM events WHERE ed = ? AND e = 'page_view'
                    GROUP BY src ORDER BY visitors DESC LIMIT 25`),
      countries: all(`SELECT cc, COUNT(DISTINCT v) AS visitors
                      FROM events WHERE ed = ? AND e = 'page_view'
                      GROUP BY cc ORDER BY visitors DESC LIMIT 25`),
      devices: all(`SELECT x AS device, COUNT(DISTINCT v) AS visitors
                    FROM events WHERE ed = ? AND e = 'page_view'
                    GROUP BY x ORDER BY visitors DESC`),
    });
  }

  // -- POST /api/stats/reset {ed} ---------------------------------------------
  // Clears one edition's rows (e.g. staff test clicks before launch).
  async handleReset(request) {
    let b = {};
    try { b = await request.json(); } catch { /* empty body */ }
    const ed = b.ed === "SG" ? "SG" : b.ed === "TW" ? "TW" : null;
    if (!ed) return json({ error: "bad_edition" }, { status: 400 });
    const before = this.sql.exec("SELECT COUNT(*) AS n FROM events WHERE ed = ?", ed).one().n;
    this.sql.exec("DELETE FROM events WHERE ed = ?", ed);
    return json({ ok: true, ed, deleted: before });
  }
}
