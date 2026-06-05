// sections.jsx — Agenda, Album, About, Partners, Sponsors, IntroModal

function Agenda() {
  return (
    <section className="section bone" id="agenda">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Agenda.</h2>
          </div>
        </div>
        <div className={`agenda${(window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false) ? ' one-col' : ''}`}>
          {AGENDA.map((s, i) =>
          <div key={i} className="slot" style={s.wide ? { gridColumn: '1/-1' } : {}}>
              <div className="t">{s.t}</div>
              <div className="title">{s.title}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}
window.Agenda = Agenda;

function Album({ language }) {
  const ALBUM_URL = "https://live.accupai.com/live/54753741?utm_source=DD32TW&utm_medium=website&utm_campaign=demoday";
  const QR = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=0&data=${encodeURIComponent(ALBUM_URL)}`;
  return (
    <section className="section" id="album">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">POWERED BY ACCUPAI</div>
            <h2>Live photo album.</h2>
            <p className="sub">{language === 'zh'
              ? '透過 Accupai 即時觀看活動照片，歡迎分享、轉發。'
              : 'Real-time event photography from the floor — view, download, and share on the spot.'}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a className="btn primary" href={ALBUM_URL} target="_blank" rel="noopener">
              Open live album <I.arrow />
            </a>
          </div>
        </div>
        <a className="album-cta" href={ALBUM_URL} target="_blank" rel="noopener">
          <div className="album-cta-art" aria-hidden="true">
            <span className="lens"><I.camera /></span>
            <div className="frames">
              {Array.from({ length: 5 }).map((_, i) => <span key={i} className={`fr fr-${i}`} />)}
            </div>
          </div>
          <div className="album-cta-body">
            <div className="eyebrow">Accupai · DD#32 live album</div>
            <h3>Tap to open the live photo wall.</h3>
            <p>Hundreds of shots from the floor, uploaded through the event. Browse, download and share straight to your phone — long-press any photo to save.</p>
            <div className="album-cta-actions">
              <span className="btn primary sm">Open album <I.arrow /></span>
              <span className="hint">Opens the Accupai viewer in a new tab</span>
            </div>
          </div>
          <div className="album-cta-qr">
            <img src={QR} alt="Scan to open the live album" width="148" height="148" />
            <div className="k">Scan to open<br />on your phone</div>
          </div>
        </a>
      </div>
    </section>);
}
window.Album = Album;

function About({ language }) {
  const zh = language === 'zh';
  const cards = [
  {
    title: "AppWorks",
    en: "Founded in 2009, AppWorks is an accelerator built by founders, for founders — which has since expanded into a broader startup community and venture capital platform. We believe AI and blockchain are driving the next major paradigm shift, and we stand alongside teams from seed onward.",
    zh: "2009 年成立，由「創業者」為「創業者」設立的加速器，以及基於加速器發展的新創社群與創投機構。",
    link: "https://appworks.tw/",
    stats: [
    { v: "653", l: "Startups", num: true },
    { v: "2,086", l: "Founders", num: true },
    { v: <span style={{ color: '#ff6b0f' }}>{(window.EVENT_CONFIG && window.EVENT_CONFIG.bilingual === false) ? "Pan-Asia" : "亞洲跨境"}</span>, l: "Region" }]

  },
  {
    title: "AppWorks Accelerator",
    en: "Founded in 2010, AppWorks Accelerator selects the most promising teams every six months. 288 AI startups and 156 Web3 startups in the ecosystem. Portfolio raised US$ 7.3B, valued at US$ 37.7B, generating US$ 17.4B in annual revenue across 9 GSEA markets.",
    zh: "於 2010 年創辦，每半年選拔最具潛力的新創團隊。",
    link: "https://appworks.tw/accelerator/",
    stats: [
    { v: "US$ 7.3B", l: "Raised", num: true },
    { v: "US$ 37.7B", l: "Valuation", num: true },
    { v: "9", l: "Markets", num: true }]

  },
  {
    title: "AppWorks Funds",
    en: "Four VC funds totaling US$ 386M. We invest Seed to Series C, 20–30 deals a year, 100+ portfolio names — Lalamove, Dapper Labs / Flow, Animoca Brands, 91APP, Figment, Carousell, ShopBack, 17LIVE, KKday.",
    zh: "四檔基金，總規模 US$ 386M，每年投資 20–30 件早期到成長期案件。",
    link: "https://appworks.tw/investments/",
    stats: [
    { v: "US$ 386M", l: "AUM", num: true },
    { v: <span style={{ color: '#ff6b0f' }}>6 / 8</span>, l: "IPOs · Unicorns" },
    { v: "100+", l: "Portfolio", num: true }]

  },
  {
    title: "Aiworks by AppWorks School",
    en: "Supports enterprises in advancing AI and automation transformation through consulting and workforce training — Taiwan Mobile, SinoPac, Nanshan Life, Hotai Insurance, Hanlin Publishing, and more.",
    zh: "協助企業推動 AI 與自動化轉型，提供顧問與人才培訓服務。",
    link: "https://aiworks.tw/",
    stats: [
    { v: "170+", l: "Enterprises", num: true },
    { v: "10,000+", l: "Trained", num: true },
    { v: <span style={{ color: '#ff6b0f' }}>5 yrs</span>, l: "Operating" }]

  }];


  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">SINCE 2009 </div>
            <h2>About AppWorks.</h2>
            <p className="sub">An accelerator, a community, and venture capital — built by founders, for founders.</p>
          </div>
        </div>
        <div className="about-grid">
          {cards.map((c, i) =>
          <div key={i} className="about-card">
              <h3>{c.title}<span className="dot">.</span></h3>
              <p>{c.en}</p>
              <div className="stats-inline">
                {c.stats.map((s, j) =>
              <div key={j} className="stat">
                    <div className="v">{s.num ? <span className="num">{s.v}</span> : s.v}</div>
                    <div className="l">{s.l}</div>
                  </div>
              )}
              </div>
              <a className="btn outline sm arrow" href={c.link} target="_blank" rel="noopener">
                More information <I.arrow />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>);

}
window.About = About;

function Partners({ favorites = [], onFav = () => {}, onIntro = () => {}, onOpenLive = () => {}, density = 'comfy', accentIntensity = 'balanced' }) {
  const waTeams = (window.TEAMS || []).filter((t) => t.batch === 'WA#10');
  return (
    <section className="section bone" id="partners">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Wistron #10.</h2>
          </div>
        </div>
        <div className="about-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="about-card">
            <h3>Wistron Accelerator<span className="dot">.</span></h3>
            <p>A corporate accelerator focused on AI, robotics, sustainability, and next-gen computing — pairing startups with Wistron's global manufacturing network and enterprise customers. Program #10 brings another cohort of teams with commercial POC pathways built in.</p>
            <div className="stats-inline">
              <div className="stat"><div className="v"><span className="num">10</span></div><div className="l">Programs</div></div>
              <div className="stat"><div className="v"><span className="num">80</span></div><div className="l">Alumni</div></div>
              <div className="stat"><div className="v"><span className="num">4</span></div><div className="l">Teams pitching today</div></div>
            </div>
            <a className="btn outline sm" href="https://appworks.tw/wistron/" target="_blank" rel="noopener">More information <I.arrow /></a>
          </div>
        </div>
        {waTeams.length > 0 && window.TeamCard &&
        <div className={`teams ${density}`} style={{ marginTop: 24 }}>
          {waTeams.map((t) =>
          <window.TeamCard key={t.id} team={t}
            density={density}
            favorited={favorites.includes(t.id)}
            onFav={onFav} onIntro={onIntro} onOpenLive={onOpenLive}
            accentLive={accentIntensity !== 'restrained'}
            liveTeamId={null} />
          )}
        </div>
        }
      </div>
    </section>);
}
window.Partners = Partners;

function Sponsors() {
  // DD#32 cloud sponsors — logo lockups.
  const sponsors = [
  { name: 'Google Cloud', src: 'assets/sponsor-google.svg', h: 38 },
  { name: 'AWS', src: 'assets/sponsor-aws.svg', h: 30 }];

  return (
    <section className="section tight" id="sponsors">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Thank you to our sponsors</div>
            <h2>Demo Day sponsors.</h2>
          </div>
        </div>
        <div className="sponsors two">
          {sponsors.map((s, i) =>
          <div key={i} className="sp">
              <img src={s.src} alt={s.name} style={{ height: s.h + 'px', width: 'auto' }} />
            </div>
          )}
        </div>
      </div>
    </section>);

}
window.Sponsors = Sponsors;

/* ─── Intro modal ─── */
function IntroModal({ team, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!team) return null;

  const subject = `[AppWorks Demo Day] Intro request — ${team.name}`;
  const body =
  `Hi ${team.name} team,

I'm connecting after attending ${window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false ? 'AppWorks #32 Demo Day' : 'AppWorks #32 + Wistron #10 Demo Day'} in ${window.EVENT_CONFIG && window.EVENT_CONFIG.city || 'Taipei'}. Your pitch — "${team.pitch}" — resonated with us, and we'd love to explore working together.

A quick note about us:
• Name / Role:
• Organisation:
• Focus area / Why we're reaching out:

Could we set up a 30-minute chat in the next two weeks?

Best,
(via AppWorks Demo Day)`;

  const mailto = `mailto:${team.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const copy = () => {
    navigator.clipboard?.writeText(`To: ${team.email}\nSubject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="modal-back" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="head">
          <h3>Connect with <span className="accent">{team.name}</span></h3>
          <button className="close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="body">
          <div>
            <label>To</label>
            <div className="field">{team.email}</div>
          </div>
          <div>
            <label>Subject</label>
            <div className="field">{subject}</div>
          </div>
          <div>
            <label>Message</label>
            <div className="field">{body}</div>
          </div>
        </div>
        <div className="foot">
          <span className="hint">Opens your default email client, pre-filled.</span>
          <button className="btn outline sm" onClick={copy}>{copied ? 'Copied ✓' : 'Copy to clipboard'}</button>
          <a className="btn primary sm" href={mailto}>Open email <I.send /></a>
        </div>
      </div>
    </div>);

}
window.IntroModal = IntroModal;