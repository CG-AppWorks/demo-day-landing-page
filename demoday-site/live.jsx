// live.jsx — Live audience panel (chat / Q&A / polls / people)

// Which caption source guests currently see, per the server switch. Polls the
// captions Worker every 3s. Returns 'openai' | 'gemini' | 'wordly' | null.
const CAPTION_SOURCE_LABEL = { openai: 'OpenAI', gemini: 'Gemini', wordly: 'Wordly' };
function useActiveCaptionSource(worker) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (!worker) return;
    let stop = false;
    const poll = () => fetch(worker + '/api/latest?channel=active', { cache: 'no-store' })
      .then((r) => r.json()).then((d) => { if (!stop) setActive(d.active); }).catch(() => {});
    poll();
    const id = setInterval(poll, 3000);
    return () => { stop = true; clearInterval(id); };
  }, [worker]);
  return active;
}

function LivePanel({ captionLanguage = 'en', onCaptionLanguageChange = () => {}, sessionId = 'DXRS-1194' }) {
  const [pane, setPane] = useState('chat');
  const [reactions, setReactions] = useState({ clap: 128, fire: 71, rocket: 54, idea: 42, heart: 33 });
  const [messages, setMessages] = useState([
  { who: 'Sarah H.', role: 'Investor · Sequoia SEA', kind: 'inv', text: "Love the unit economics on slide 4. What's CAC payback looking like?" },
  { who: 'Jamie Chen', role: 'Founder · Formul.ai', kind: 'fnd', text: "Thanks Sarah — 4.8 months blended, 3.1 months on the enterprise cohort. Happy to walk through it after." },
  { who: 'Ray N.', role: 'Media · TechCrunch', kind: 'med', text: "Who's open to on-record interviews in the cocktail hour?" },
  { who: 'Karen Y.', role: 'Corporate · Taiwan Mobile', kind: '', text: "+1 for Formul.ai — would like to explore POC on our helpdesk stack." },
  { who: 'Dilip M.', role: 'Investor · Antler', kind: 'inv', text: "Requesting intro to @KaiLuxe 🙌" }]
  );
  const [draft, setDraft] = useState('');

  const send = (e) => {
    e?.preventDefault?.();
    if (!draft.trim()) return;
    setMessages((m) => [...m, { who: 'You', role: 'Guest', kind: 'you', text: draft.trim() }]);
    setDraft('');
  };

  const bump = (k) => setReactions((r) => ({ ...r, [k]: r[k] + 1 }));

  return (
    <aside className="live-panel" aria-label="Live audience panel">
      <div className="live-head">
        <h3><span className="dot" /> Live room</h3>
        <div className="meta">Now: <b>Formul.ai</b> · <b>184</b> in room</div>
      </div>
      <div className="live-tabs">
        {[
        ['chat', 'Chat'],
        ['qa', 'Q&A'],
        ['polls', 'Polls'],
        ['people', 'People']].
        map(([id, label]) =>
        <button key={id} className={pane === id ? 'on' : ''} onClick={() => setPane(id)}>{label}</button>
        )}
      </div>

      {pane === 'chat' &&
      <div className="live-body fade-in">
          {messages.map((m, i) =>
        <div key={i} className="msg">
              <div className={`avatar ${m.kind}`}>{m.who.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
              <div className="content">
                <div className="who"><b>{m.who}</b>
                  <span className={`role-pill ${m.kind}`}>{m.role}</span>
                </div>
                <div className="bubble">{m.text}</div>
              </div>
            </div>
        )}
        </div>
      }

      {pane === 'qa' &&
      <div className="live-body fade-in">
          {[
        { v: 32, q: "What share of ARR comes from the top 3 customers, and how concentrated is revenue today?", meta: "Investor · 2 min ago · answered soon" },
        { v: 21, q: "Is the moat the proprietary eval pipeline, or the customer-data feedback loop?", meta: "Corporate · 4 min ago" },
        { v: 14, q: "Regional expansion — which GSEA market is next after Taiwan?", meta: "Founder · 6 min ago" },
        { v: 9, q: "How does the agent handle hand-off when escalation is required?", meta: "Investor · 8 min ago" }].
        map((x, i) =>
        <div key={i} className="qa-item">
              <div className="up">
                <button><I.up /></button>
                <span className="n">{x.v}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p>{x.q}</p>
                <div className="meta">{x.meta}</div>
              </div>
            </div>
        )}
        </div>
      }

      {pane === 'polls' &&
      <div className="live-body fade-in">
          <div className="poll">
            <p className="q">Which vertical excites you most this batch?</p>
            {[
          { id: 'a', label: 'Agentic AI', pct: 52 },
          { id: 'b', label: 'Onchain infra', pct: 23 },
          { id: 'c', label: 'GSEA commerce', pct: 17 },
          { id: 'd', label: 'Dev tools', pct: 8 }].
          map((o) =>
          <div key={o.id} className={`opt ${o.id}`}>
                <span className="fill" style={{ width: `${o.pct}%` }} />
                <span className="label">{o.label}</span>
                <span className="pct">{o.pct}%</span>
              </div>
          )}
            <div className="foot">318 votes · closes 14:30</div>
          </div>
          <div className="poll">
            <p className="q">Will you take an intro from any team today?</p>
            {[
          { id: 'a', label: 'Yes — already shortlisted', pct: 68 },
          { id: 'b', label: 'Maybe, exploring', pct: 24 },
          { id: 'c', label: 'Just observing', pct: 8 }].
          map((o) =>
          <div key={o.id} className={`opt ${o.id}`}>
                <span className="fill" style={{ width: `${o.pct}%` }} />
                <span className="label">{o.label}</span>
                <span className="pct">{o.pct}%</span>
              </div>
          )}
            <div className="foot">211 votes · live</div>
          </div>
        </div>
      }

      {pane === 'people' &&
      <div className="live-body fade-in">
          {[
        { who: 'Sarah H.', role: 'Investor', desc: 'Sequoia SEA · Jakarta', kind: 'inv' },
        { who: 'Karen Y.', role: 'Corporate', desc: 'Taiwan Mobile · BD', kind: '' },
        { who: 'Ray N.', role: 'Media', desc: 'TechCrunch · SEA', kind: 'med' },
        { who: 'Dilip M.', role: 'Investor', desc: 'Antler · Singapore', kind: 'inv' },
        { who: 'Mei L.', role: 'Founder', desc: 'KaiLuxe · Hong Kong', kind: 'fnd' }].
        map((p, i) =>
        <div key={i} className="msg">
              <div className={`avatar ${p.kind}`}>{p.who.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
              <div className="content">
                <div className="who"><b>{p.who}</b><span className={`role-pill ${p.kind}`}>{p.role}</span></div>
                <div className="bubble" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <span>{p.desc}</span>
                  <button className="btn outline sm">Say hi</button>
                </div>
              </div>
            </div>
        )}
        </div>
      }

      <div className="reactions">
        <button onClick={() => bump('clap')}>👏 <span className="count">{reactions.clap}</span></button>
        <button onClick={() => bump('fire')}>🔥 <span className="count">{reactions.fire}</span></button>
        <button onClick={() => bump('rocket')}>🚀 <span className="count">{reactions.rocket}</span></button>
        <button onClick={() => bump('idea')}>💡 <span className="count">{reactions.idea}</span></button>
        <button onClick={() => bump('heart')}>❤️ <span className="count">{reactions.heart}</span></button>
      </div>

      <form className="composer" onSubmit={send}>
        <input
          placeholder="Message the room, ask a question, or @tag a team…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </aside>);

}
window.LivePanel = LivePanel;

/* ─── Captions live feed (used inside the live panel) ───
   Embeds the Wordly attendee iframe for the current session, with a QR
   code + session ID card pinned below for audience members who want to
   open captions on their own phone. */
function CaptionsLive({ language, sessionId }) {
  const joinUrl = wordlyJoinUrl(sessionId);
  const frameUrl = wordlyFrameUrl(sessionId, language, { bgcolor: 'FFFFFF', fgcolor: '424F57', fgsize: '1em' });
  return (
    <div className="caption-live-stack">
      <div className="caption-live-frame">
        <iframe
          key={`${sessionId}-${language}`}
          src={frameUrl}
          title="Wordly live captions"
          allow="autoplay"
          loading="lazy" />
      </div>
      <div className="caption-live-footer">
        <div className="qr-thumb">
          <img src={wordlyQrUrl(sessionId, 140)} alt="QR" width="60" height="60" />
        </div>
        <div className="qr-text">
          <div className="k">Listen on your phone</div>
          <div className="v">attend.wordly.ai · <b>{sessionId}</b></div>
        </div>
        <a className="btn outline sm" href={joinUrl} target="_blank" rel="noopener">
          Open <I.arrow />
        </a>
      </div>
    </div>);

}
window.CaptionsLive = CaptionsLive;

/* ─── Floating live-captions widget ───
   A bottom-corner launcher that opens a slide-up caption panel on demand, so
   guests who don't need captions are unaffected. Follows the server switch:
   OpenAI/Gemini stream via the embedded viewer; Wordly via the existing embed.
   Renders nothing unless EVENT_CONFIG.captionsWorker is set. */
function LiveCaptionsWidget({ sessionId = 'DXRS-1194', captionLanguage = 'zh-TW' }) {
  const worker = (window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker) || '';
  const [open, setOpen] = useState(false);
  // Compact ("docked") mode: a slim bottom bar showing the latest line, so the
  // page stays browsable behind it. Tap ▴ to expand back to the full panel.
  const [compact, setCompact] = useState(false);
  const source = useActiveCaptionSource(open ? worker : '') || 'wordly';
  // Let the nav caption buttons open this widget.
  useEffect(() => {
    window.ddOpenCaptions = () => setOpen(true);
    return () => { try { delete window.ddOpenCaptions; } catch (e) {} };
  }, []);
  if (!worker) return null;
  const isWordly = source === 'wordly';
  return (
    <div className={`ddcap ${compact ? 'compact' : ''}`}>
      {open &&
      <div className={`ddcap-panel ${compact ? 'compact' : ''}`} role="dialog" aria-label="Live captions">
        <div className="ddcap-head">
          <span className="ddcap-badge"><span className="ddcap-dot" />{CAPTION_SOURCE_LABEL[source] || 'Wordly'}</span>
          <span className="ddcap-title">即時翻譯 · Live captions</span>
          <button className="ddcap-min" onClick={() => setCompact((c) => !c)}
            aria-label={compact ? 'Expand captions' : 'Shrink to a bar'}
            title={compact ? '放大 Expand' : '縮小成字幕條 Dock'}>{compact ? '▴' : '▾'}</button>
          <button className="ddcap-x" onClick={() => setOpen(false)} aria-label="Close captions">×</button>
        </div>
        <div className="ddcap-body">
          {isWordly ?
          <CaptionsLive language={captionLanguage} sessionId={sessionId} /> :
          <iframe key={source} className="ddcap-frame"
            src={worker + '/viewer?base=' + encodeURIComponent(worker)}
            title="Live captions" allow="autoplay" loading="lazy" />}
        </div>
      </div>}
      <button className={`ddcap-fab ${open ? 'on' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="ddcap-dot" />{open ? '收合 Hide' : '即時翻譯 Captions'}
      </button>
    </div>);

}
window.LiveCaptionsWidget = LiveCaptionsWidget;

/* In-page caption launcher (placed just above Sponsors). Opens the same
   slide-up panel as the floating button. Renders only when configured. */
function CaptionsLauncher({ language = 'en' }) {
  const worker = (window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker) || '';
  if (!worker) return null;
  return (
    <div className="container ddcap-launch">
      <button className="ddcap-launch-btn" onClick={() => window.ddOpenCaptions && window.ddOpenCaptions()}>
        <span className="ddcap-dot" />
        {language === 'zh' ? '即時翻譯 · 開啟 (EN + 中文)' : '即時翻譯 · Open live captions (EN + 中文)'}
      </button>
    </div>);

}
window.CaptionsLauncher = CaptionsLauncher;