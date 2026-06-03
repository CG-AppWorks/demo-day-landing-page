// chrome.jsx — TopNav, Hero, NowOnStage, Footer
const { useState, useEffect } = React;

/* ─── Icons (Lucide-style 24x24, 1.5 stroke) ─── */
const I = {
  search:    (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  user:      (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  heart:     (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>,
  heartFill: (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>,
  deck:      (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>,
  arrow:     (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  download:  (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  up:        (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 15 12 9 18 15"/></svg>,
  send:      (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>,
  pin:       (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  cal:       (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  users:     (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  mic:       (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10a7 7 0 0 1-14 0"/><line x1="12" y1="17" x2="12" y2="22"/></svg>,
  mail:      (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>,
  camera:    (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7L16 12 23 17z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  eye:       (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>,
  star:      (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 9 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 9 12 2"/></svg>,
  globe:     (p) => <svg className="icon" {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
};
window.I = I;

/* ─── AppWorks logo (official wordmark, inlined so it recolors via currentColor) ─── */
function Logo({ height = 24 }) {
  // Real AppWorks wordmark paths (cropped viewBox to the "AppWorks" lettering).
  return (
    <svg viewBox="162 386 278 68" height={height} fill="currentColor" aria-label="AppWorks" role="img">
      <path d="M195.58,426.08h-18.04l-4.69,10.23h-6.85l20.85-44.78,20.11,44.78h-6.96l-4.42-10.23ZM192.99,420.1l-6.25-14.33-6.55,14.33h12.8Z"/>
      <path d="M217.19,450.77h-6.14v-41.04h6.14v2.89c2.42-2.42,5.17-3.63,8.24-3.63,3.66,0,6.67,1.35,9.03,4.04,2.4,2.67,3.6,6.05,3.6,10.12s-1.19,7.3-3.57,9.96c-2.37,2.64-5.35,3.96-8.95,3.96-3.11,0-5.89-1.25-8.35-3.74v17.44ZM231.79,423.19c0-2.55-.69-4.62-2.07-6.22-1.4-1.62-3.16-2.43-5.29-2.43-2.26,0-4.08.78-5.48,2.35-1.4,1.56-2.1,3.62-2.1,6.17s.7,4.55,2.1,6.17c1.38,1.58,3.2,2.37,5.46,2.37,2.13,0,3.88-.8,5.27-2.4,1.42-1.6,2.13-3.6,2.13-6Z"/>
      <path d="M250.7,450.77h-6.14v-41.04h6.14v2.89c2.42-2.42,5.17-3.63,8.24-3.63,3.66,0,6.67,1.35,9.03,4.04,2.4,2.67,3.6,6.05,3.6,10.12s-1.19,7.3-3.57,9.96c-2.37,2.64-5.35,3.96-8.95,3.96-3.11,0-5.89-1.25-8.35-3.74v17.44ZM265.29,423.19c0-2.55-.69-4.62-2.07-6.22-1.4-1.62-3.16-2.43-5.29-2.43-2.26,0-4.08.78-5.48,2.35-1.4,1.56-2.1,3.62-2.1,6.17s.7,4.55,2.1,6.17c1.38,1.58,3.2,2.37,5.46,2.37,2.13,0,3.88-.8,5.27-2.4,1.42-1.6,2.13-3.6,2.13-6Z"/>
      <path d="M277.12,394.18l10.97,28.16,11.46-30.2,10.97,30.2,11.65-28.16h6.9l-18.83,44.8-10.83-29.85-11.3,29.88-17.9-44.83h6.9Z"/>
      <path d="M328.42,422.83c0-3.84,1.37-7.1,4.12-9.8,2.75-2.69,6.09-4.04,10.04-4.04s7.33,1.36,10.1,4.07c2.73,2.71,4.09,6.04,4.09,9.99s-1.37,7.32-4.12,10.01c-2.77,2.67-6.16,4.01-10.18,4.01s-7.32-1.36-10.01-4.09c-2.69-2.69-4.04-6.08-4.04-10.15ZM334.69,422.94c0,2.66.71,4.76,2.13,6.3,1.46,1.56,3.37,2.35,5.76,2.35s4.32-.77,5.76-2.32c1.44-1.55,2.16-3.61,2.16-6.19s-.72-4.65-2.16-6.19c-1.45-1.56-3.37-2.35-5.76-2.35s-4.25.78-5.7,2.35c-1.45,1.56-2.18,3.58-2.18,6.06Z"/>
      <path d="M363.26,409.74h6.14v2.37c1.13-1.18,2.13-1.99,3-2.43.89-.45,1.95-.68,3.17-.68,1.62,0,3.31.53,5.07,1.58l-2.81,5.62c-1.16-.84-2.3-1.26-3.41-1.26-3.35,0-5.02,2.53-5.02,7.59v13.78h-6.14v-26.58Z"/>
      <path d="M391.14,390.23v28.1l8.65-8.6h8.24l-11.54,11.16,12.39,15.42h-7.97l-8.79-11.21-.98.98v10.23h-6.14v-46.09h6.14Z"/>
      <path d="M428.28,414.27l-5.08,2.7c-.8-1.64-1.79-2.45-2.97-2.45-.56,0-1.05.19-1.45.56-.4.37-.6.85-.6,1.43,0,1.02,1.18,2.03,3.55,3.03,3.26,1.4,5.45,2.69,6.58,3.87,1.13,1.18,1.69,2.77,1.69,4.77,0,2.57-.95,4.71-2.84,6.44-1.84,1.64-4.06,2.46-6.66,2.46-4.46,0-7.61-2.17-9.47-6.52l5.24-2.43c.73,1.27,1.28,2.08,1.66,2.43.75.69,1.64,1.04,2.67,1.04,2.07,0,3.11-.95,3.11-2.84,0-1.09-.8-2.11-2.4-3.06-.62-.31-1.24-.61-1.86-.9-.62-.29-1.25-.59-1.88-.9-1.78-.87-3.04-1.75-3.77-2.62-.93-1.11-1.39-2.54-1.39-4.29,0-2.31.79-4.22,2.37-5.73,1.62-1.51,3.58-2.26,5.89-2.26,3.4,0,5.93,1.76,7.59,5.27Z"/>
    </svg>
  );
}
window.Logo = Logo;

/* ─── Top nav ─── */
function TopNav({ activeTab, onNav, onLanguageChange, language, sessionId }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#top" onClick={(e)=>{e.preventDefault(); onNav('top');}}>
          <Logo height={29}/>
        </a>
        <div className="nav-tabs">
          {TABS.map(t => (
            <a key={t.id} href={`#${t.id}`} className={activeTab === t.id ? 'active' : ''}
               onClick={(e)=>{e.preventDefault(); onNav(t.id);}}>{t.label}</a>
          ))}
        </div>
        <div className="nav-cta">
          <button className="btn ghost sm" onClick={() => {
            onLanguageChange(language === 'zh' ? 'en' : 'zh');
          }} title="Toggle language">
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          <a className="btn outline sm" href={`https://attend.wordly.ai/join/${sessionId || 'DXRS-1194'}`} target="_blank" rel="noopener" title="Open AI live interpretation">
            <I.globe/> Live Captions <span style={{color:'var(--fg2)', fontWeight:500, marginLeft:2}}>即時口譯</span>
          </a>
          <a className="btn primary sm" href="#album" onClick={(e)=>{e.preventDefault(); onNav('album');}}>
            <span className="live-dot"/> Live Album
          </a>
        </div>
      </div>
    </nav>
  );
}
window.TopNav = TopNav;

/* ─── Hero ─── */
function Hero({ variant = 'photo', language, kpis }) {
  return (
    <section className="hero photo" id="top">
      <div className="hero-bg" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="eyebrow slate">
          Wed 17 June 2026 · Taipei Marriott Hotel · 5F Grand Ballroom
        </div>

        <div className="hero-headline-block">
          <img className="hero-keyvisual" src="assets/dd-keyvisual.png"
               alt="AppWorks Demo Day #32 · Wistron Demo Day #10"/>
        </div>
        {(language === 'en' || language === 'both') && (
          <p className="lede center">
            <b>17 select startups, one room.</b> 13 from <b>AppWorks Accelerator #32</b> + 4 from <b>Wistron Accelerator #10</b> — founders from Taiwan, Singapore, Korea, Malaysia, Hong Kong and the US, working at the forefront of <b>Enterprise AI</b>, <b>Manufacturing AI</b> and <b>Dual-Use Tech</b>.
          </p>
        )}
        {(language === 'zh' || language === 'both') && (
          <p className="lede zh zh-line center">
            一場專屬於 AI 與 GSEA 新創的盛會 — 17 組精選潛力團隊登台，包含 13 組 AppWorks Accelerator #32 與 4 組 Wistron Accelerator #10，跳出台北、連接全球。
          </p>
        )}
        <div className="hero-meta">
          <div className="item">
            <div className="k">Date · 日期</div>
            <div className="v">17 Jun<small>Wed · 12:00–16:30</small></div>
          </div>
          <div className="item">
            <div className="k">Venue · 地點</div>
            <div className="v">Marriott<small>5F Grand Ballroom · 台北</small></div>
          </div>
          <div className="item">
            <div className="k">Teams</div>
            <div className="v"><span className="num">{kpis.teams}</span><small>13 AW · 4 WA</small></div>
          </div>
          <div className="item">
            <div className="k">Markets</div>
            <div className="v"><span className="num">6</span><small>TW · SG · KR · MY · US · HK</small></div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;

/* Decorative SVG that lives behind the hero — symmetric backdrop */
function HeroDecor({ variant }) {
  if (variant === 'orange') return null;
  const ink = variant === 'bone' ? '#424F57' : '#FFFFFF';
  const inkOpacity = variant === 'bone' ? 0.08 : 0.10;
  return (
    <svg viewBox="0 0 1600 700" preserveAspectRatio="xMidYMid slice" style={{position:'absolute', inset:0, width:'100%', height:'100%'}}>
      {/* Two orange triangles flanking the centered content */}
      <polygon points="0,140 0,700 320,700" fill="#FF6B0F" opacity="0.85"/>
      <polygon points="1600,140 1600,700 1280,700" fill="#FF6B0F" opacity="0.85"/>
      {/* Faint concentric rings on each side */}
      <g stroke={ink} strokeWidth="1" fill="none" opacity={inkOpacity}>
        <circle cx="120" cy="120" r="120"/>
        <circle cx="120" cy="120" r="200"/>
        <circle cx="1480" cy="120" r="120"/>
        <circle cx="1480" cy="120" r="200"/>
      </g>
      {/* Two orange accent dots top-center to anchor the eye */}
      <circle cx={780} cy={120} r="4" fill="#FF6B0F"/>
      <circle cx={820} cy={120} r="4" fill="#FF6B0F"/>
    </svg>
  );
}

/* ─ Helpers shared by the operator panel ─── */
function fmtClock(d) {
  const h = String(d.getHours()).padStart(2,'0');
  const m = String(d.getMinutes()).padStart(2,'0');
  return `${h}:${m}`;
}
window.fmtClock = fmtClock;

/* ─ Now on stage ─── */
const LANGUAGES = [
  // Wordly uses BCP-47-ish codes. en / zh-TW (Traditional, Taiwan) / id / vi
  // map directly to its supported languages.
  { code:'en',    label:'EN',  name:'English'    },
  { code:'zh-TW', label:'中文', name:'繁體中文'    },
  { code:'id',    label:'ID',  name:'Bahasa'     },
  { code:'vi',    label:'VI',  name:'Tiếng Việt' },
];
window.LANGUAGES = LANGUAGES;

/* ─── Wordly helpers ───
   Attendee URL: https://attend.wordly.ai/join/SESSION-ID
   iFrame URL:   https://attend.wordly.ai/frame/SESSION-ID?lang=xx&bgcolor=...&fgcolor=...
   Session IDs are formatted LLLL-NNNN (4 letters + 4 numbers).
*/
function wordlyJoinUrl(sessionId) {
  return `https://attend.wordly.ai/join/${encodeURIComponent(sessionId)}`;
}
function wordlyFrameUrl(sessionId, lang, opts = {}) {
  const params = new URLSearchParams({
    lang: lang || 'en',
    bgcolor: opts.bgcolor || 'FFFFFF',
    fgcolor: opts.fgcolor || '424F57',
    ...(opts.fgsize ? { fgsize: opts.fgsize } : {}),
    ...(opts.key ? { key: opts.key } : {}),
  });
  return `https://attend.wordly.ai/frame/${encodeURIComponent(sessionId)}?${params.toString()}`;
}
function wordlyQrUrl(sessionId, size = 180) {
  // qrserver.com is a free QR generator — encodes the attendee URL.
  const target = wordlyJoinUrl(sessionId);
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=0&data=${encodeURIComponent(target)}`;
}
window.wordlyJoinUrl = wordlyJoinUrl;
window.wordlyFrameUrl = wordlyFrameUrl;
window.wordlyQrUrl = wordlyQrUrl;

function CaptionsStrip({ language, onLanguageChange, sessionId }) {
  const langs = LANGUAGES;
  const joinUrl = wordlyJoinUrl(sessionId);
  const frameUrl = wordlyFrameUrl(sessionId, language, { bgcolor: 'FFFFFF', fgcolor: '424F57', fgsize: '1.1em' });

  return (
    <div className="captions" aria-label="AI live interpretation">
      <div className="captions-header">
        <span className="badge-ai"><span className="dot"/>AI Live Interpretation</span>
        <span className="powered">Audience captions · <b>Wordly</b> · Session <code>{sessionId}</code></span>
        <div className="lang-seg" role="radiogroup" aria-label="Caption language">
          {langs.map(l => (
            <button key={l.code}
              className={l.code === language ? 'on' : ''}
              onClick={() => onLanguageChange(l.code)}
              aria-checked={l.code === language}
              title={l.name}>{l.label}</button>
          ))}
        </div>
      </div>
      <div className="captions-body">
        <div className="wordly-frame">
          <iframe
            key={`${sessionId}-${language}`}
            src={frameUrl}
            title="Wordly live captions"
            allow="autoplay"
            loading="lazy"/>
          <div className="wordly-fallback">
            <div className="head">Captions appear here once the session goes live</div>
            <a href={joinUrl} target="_blank" rel="noopener" className="btn primary sm">
              Open Wordly attendee page <I.arrow/>
            </a>
          </div>
        </div>
        <div className="wordly-qr">
          <div className="qr-eyebrow">Scan to listen on your phone</div>
          <div className="qr-img">
            <img src={wordlyQrUrl(sessionId, 180)} alt={`QR code for Wordly session ${sessionId}`} width="120" height="120"/>
          </div>
          <div className="qr-detail">
            <div className="qr-row"><span className="k">URL</span><span className="v">attend.wordly.ai</span></div>
            <div className="qr-row"><span className="k">Session</span><span className="v mono">{sessionId}</span></div>
          </div>
          <a href={joinUrl} target="_blank" rel="noopener" className="open-link">
            Open in browser <I.arrow/>
          </a>
        </div>
      </div>
    </div>
  );
}
window.CaptionsStrip = CaptionsStrip;

function NowOnStage({ team, phase, captionLanguage, onCaptionLanguageChange, sessionId }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // ─── BEFORE: pre-show takeover, lineup preview ───
  if (phase === 'before') {
    return (
      <div className="container stage-strip">
        <div className="stage-card phase-before">
          <div className="stage-photo phase">
            <div className="live-badge phase"><I.cal/> DOORS OPEN</div>
          </div>
          <div className="stage-info">
            <div className="eyebrow">Pre-Show · 17 June 2026</div>
            <h2>Doors open. Find your seat.</h2>
            <p className="sub">Pitches begin at <b>13:20</b> with Jamie's opening remarks at <b>13:00</b>.</p>
            <p className="pitch">Grab a coffee, check the lineup, drop yourself on the live captions — the team will get started right on time.</p>
          </div>
          <div className="stage-side">
            <div className="timer">
              <span className="label">First pitch</span>
              13:20
            </div>
            <div className="pos">
              <I.cal/> <span><b>{fmtClock(new Date(now))}</b> Taipei time</span>
            </div>
            <a className="btn primary sm" href="#teams">Browse the lineup <I.arrow/></a>
          </div>
          <CaptionsStrip language={captionLanguage} onLanguageChange={onCaptionLanguageChange} sessionId={sessionId}/>
        </div>
      </div>
    );
  }

  // ─── COCKTAIL: post-pitches networking takeover ───
  if (phase === 'cocktail') {
    return (
      <div className="container stage-strip">
        <div className="stage-card phase-cocktail">
          <div className="stage-photo phase">
            <div className="live-badge phase">🥂 COCKTAIL</div>
          </div>
          <div className="stage-info">
            <div className="eyebrow">Open Floor · Until 16:30</div>
            <h2>Cocktail networking.</h2>
            <p className="sub">All 18 founders are on the floor and ready to chat.</p>
            <p className="pitch">Use the team directory below to favorite the founders you want to meet — tap <b>Request intro</b> to send a pre-written email straight to them.</p>
          </div>
          <div className="stage-side">
            <div className="timer">
              <span className="label">Open until</span>
              16:30
            </div>
            <div className="pos">
              <I.cal/> <span><b>{fmtClock(new Date(now))}</b> Taipei time</span>
            </div>
            <a className="btn primary sm" href="#teams">Open team directory <I.arrow/></a>
          </div>
          <CaptionsStrip language={captionLanguage} onLanguageChange={onCaptionLanguageChange} sessionId={sessionId}/>
        </div>
      </div>
    );
  }

  // ─── LIVE: a team is on stage ───
  // If operator picked "off air" while phase is live, show an intermission state.
  if (!team) {
    return (
      <div className="container stage-strip">
        <div className="stage-card phase-break">
          <div className="stage-photo phase">
            <div className="live-badge phase">INTERMISSION</div>
          </div>
          <div className="stage-info">
            <div className="eyebrow">Stage paused</div>
            <h2>Short break.</h2>
            <p className="sub">Back in a moment.</p>
          </div>
          <div className="stage-side">
            <div className="pos">
              <I.cal/> <span><b>{fmtClock(new Date(now))}</b> Taipei time</span>
            </div>
          </div>
          <CaptionsStrip language={captionLanguage} onLanguageChange={onCaptionLanguageChange} sessionId={sessionId}/>
        </div>
      </div>
    );
  }

  return (
    <div className="container stage-strip">
      <div className="stage-card">
        <div className="stage-photo">
          <div className="live-badge"><span className="dot"/> ON STAGE</div>
        </div>
        <div className="stage-info">
          <div className="eyebrow">Now Pitching · {team.batch} · #{team.speakerOrder}</div>
          <h2>{team.name}</h2>
          <p className="sub">{team.sub} · {team.market}</p>
          <p className="pitch">{team.pitch}</p>
        </div>
        <div className="stage-side">
          <div className="timer">
            <span className="label">Pitch</span>
            #{team.speakerOrder}
          </div>
          <div className="pos">
            <I.cal/> <span><b>{fmtClock(new Date(now))}</b> Taipei time</span>
          </div>
          <button className="btn primary sm">Request intro <I.arrow/></button>
        </div>
        <CaptionsStrip language={captionLanguage} onLanguageChange={onCaptionLanguageChange} sessionId={sessionId}/>
      </div>
    </div>
  );
}
window.NowOnStage = NowOnStage;

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-simple">
          <Logo height={26}/>
          <div className="tag">By Founders, For Founders.</div>
          <div className="meta">
            © 2026 AppWorks Ventures.<br/>
            Helping tech startups disrupt the world since 2009.<br/>
            Taipei · Singapore · Jakarta · Ho Chi Minh
          </div>
          <a href="#backstage" className="foot-backstage">⚙ Backstage</a>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
