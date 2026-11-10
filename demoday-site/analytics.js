// analytics.js — anonymous page-view + click counts for the Demo Day pages.
// Events go to the StatsHub on the captions Worker (EVENT_CONFIG.analytics);
// read them at <worker>/stats with the admin token.
//
// No cookies and no personal data: one random visitor id in localStorage.
// Clicks are picked up from any element carrying data-track="<event>"
// (+ data-team="<team id>", data-x="<detail>"); code can also call window.ddTrack().
// Staff devices opt out by opening the page once with ?notrack=1 (undo: ?notrack=0).
// On localhost the beacons go to a local `wrangler dev` (:8787), never production.
(function () {
  var CFG = window.EVENT_CONFIG || {};
  var local = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
  var base = local ? 'http://localhost:8787' : CFG.analytics;
  var q = new URLSearchParams(location.search);

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  if (q.has('notrack')) store('dd.notrack', q.get('notrack') === '0' ? '' : '1');
  var off = !base || store('dd.notrack') === '1';

  var vid = store('dd.vid');
  if (!vid || !/^[a-z0-9]{8,40}$/.test(vid)) {
    vid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    store('dd.vid', vid);
  }

  // Traffic source: tagged link first, else the referring site.
  var ref = '';
  try { ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : ''; } catch (e) {}
  if (ref === location.hostname) ref = '';
  // Kept for the browser session, so a reload or in-page jump keeps the original source.
  var src = q.get('utm_source') || q.get('ref') || ref;
  try { if (src) sessionStorage.setItem('dd.src', src); else src = sessionStorage.getItem('dd.src'); } catch (e) {}
  src = src || 'direct';

  function clean(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9._:-]+/g, '-').slice(0, 40); }

  function track(e, team, x) {
    if (off) return;
    var body = JSON.stringify({ ed: CFG.edition, e: e, t: team || '', x: clean(x), v: vid, src: clean(src) });
    var url = base + '/api/track';
    try {
      // text/plain keeps it a "simple" request (no CORS preflight) and survives mailto/outbound navigation.
      if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: 'text/plain' }))) return;
      fetch(url, { method: 'POST', body: body, keepalive: true, mode: 'no-cors' });
    } catch (err) {}
  }
  window.ddTrack = track;

  document.addEventListener('click', function (ev) {
    var el = ev.target && ev.target.closest && ev.target.closest('[data-track]');
    if (el) track(el.getAttribute('data-track'), el.getAttribute('data-team'), el.getAttribute('data-x'));
  }, true);

  track('page_view', '', window.matchMedia && window.matchMedia('(max-width: 768px)').matches ? 'mobile' : 'desktop');
})();
