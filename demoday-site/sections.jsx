// sections.jsx — Agenda, Album, About, Partners, Sponsors, IntroModal

function Agenda({ language }) {
  return (
    <section className="section bone" id="agenda">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>{tr(language, 'Agenda.', ZH.agenda.heading)}</h2>
          </div>
        </div>
        <div className={`agenda${window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false ? ' one-col' : ''}`}>
          {AGENDA.map((s, i) =>
          <div key={i} className="slot" style={s.wide ? { gridColumn: '1/-1' } : {}}>
              <div className="t">{s.t}</div>
              <div className="title">{tr(language, s.title, (ZH.agendaTitles || [])[i])}</div>
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
            <div className="eyebrow">{tr(language, 'POWERED BY ACCUPAI', ZH.album.eyebrow)}</div>
            <h2>{tr(language, 'Live photo album.', ZH.album.heading)}</h2>
            <p className="sub">{tr(language, 'Real-time event photography from the floor — view, download, and share on the spot.', ZH.album.sub)}</p>
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
  // Follow the nav language toggle. Non-bilingual editions (e.g. SG) stay English.
  const zh = (window.EVENT_CONFIG ? window.EVENT_CONFIG.bilingual !== false : true) && language === 'zh';
  const cards = [
  {
    title: "AppWorks",
    en: "Founded in 2009, AppWorks is an accelerator built by founders, for founders — which has since expanded into a broader startup community and venture capital platform. Just as the Mobile Internet reshaped entire industries, we believe AI and blockchain are driving the next major paradigm shift. Founders lead the work of building great companies; our role is to support them from the seed stage onward with long-term guidance, capital, and a strong regional network.",
    zh: "2009 年成立，由「創業者」為「創業者」設立的加速器，以及基於加速器發展的新創社群與創投機構，致力協助下世代的創業者抓住數位革命的成長機會。正如 Mobile Internet 曾引發巨大的產業變革，我們相信 AI 與區塊鏈正推動新一波關鍵的典範轉移。創業者是主角，投資人是配角；我們從種子時期開始支持團隊，陪著他們打造區域級、世界級的偉大企業。",
    link: "https://appworks.tw/",
    stats: [
    { v: "663", l: "Startups", num: true },
    { v: "2,189", l: "Founders", num: true },
    { v: <span style={{ color: '#ff6b0f' }}>{zh ? "亞洲跨境" : "Pan-Asia"}</span>, l: "Region" }]

  },
  {
    title: "AppWorks Accelerator",
    en: "Founded in 2010, AppWorks Accelerator selects the most promising teams every six months, helping founders go from 0 to 1 to product–market fit and scale. The ecosystem now spans 663 active startups and 2,189 founders — including 135 AI startups and 144 Web3 startups. Collectively they have raised US$ 8.1B, reached US$ 42.1B in valuation, generate US$ 18.6B in annual revenue, and created 28,256 jobs across 9 markets.",
    zh: "2010 年成立，每半年遴選最具潛力的團隊，協助創業者從 0 到 1 找到 Product-Market Fit、並在成長階段建立可持續且可擴張的商業模式。生態系共有 663 家活躍新創、2,189 位創業者，包含 135 家 AI 新創與 144 家 Web3 新創；合計募得 81 億美元，總市值 421 億美元，年營收 186 億美元，提供 28,581 個工作機會，橫跨台灣、印尼、新加坡、馬來西亞、越南、菲律賓、韓國、日本與香港等九大市場。",
    link: "https://appworks.tw/accelerator/",
    stats: [
    { v: "US$ 8.1B", l: "Total Raised", num: true },
    { v: "US$ 42.1B", l: "Total Valuation", num: true },
    { v: "28,256", l: "Jobs Created", num: true }]

  },
  {
    title: "AppWorks Funds",
    en: "AppWorks manages four venture capital funds totaling US$ 386M. We invest from Seed to Series C, funding 20–30 deals a year, now with 130+ portfolio names — Lalamove, Dapper Labs / Flow, Animoca Brands, 91APP, Figment, Carousell, ShopBack, 17LIVE, KKday — and have produced 6 IPOs, 9 IEOs, 1 hectocorn, 2 decacorns, and 8 unicorns.",
    zh: "管理四支創投基金，總募集金額 3.86 億美元。通常投資種子輪至 C 輪，每年進行 20–30 個投資案，至今已投資超過 130 家新創，如 Lalamove、Dapper Labs / Flow、Animoca Brands、91APP、Figment、Carousell、ShopBack、17LIVE、KKday；並已有 6 個 IPO、9 個 IEO，以及 1 隻百角獸、2 隻十角獸與 8 隻獨角獸。",
    link: "https://appworks.tw/investments/",
    stats: [
    { v: "US$ 386M", l: "AUM", num: true },
    { v: <span style={{ color: '#ff6b0f' }}>6 / 8</span>, l: "IPOs · Unicorns" },
    { v: "130+", l: "Portfolio", num: true }]

  },
  {
    title: "Aiworks",
    en: "Aiworks supports enterprises in advancing AI and automation transformation through consulting and workforce training — from foundational literacy to practical implementation. It has helped Taiwan Mobile, SinoPac, Nanshan Life, Hotai Insurance, and Hanlin Publishing build AI capabilities. As an OpenAI Service Partner, Aiworks has empowered 200+ enterprises and 20,000+ professionals across telecom, finance, retail, publishing, and technology.",
    zh: "專注協助企業推動 AI 與自動化升級，以顧問服務與人才培訓為核心，從素養啟蒙到應用落地。曾協助台灣大哥大、永豐金控、南山人壽、和泰產險、翰林出版等企業建立 AI 與自動化能力；現為 OpenAI 台灣官方合作服務夥伴，截至目前已與超過 200 家企業合作，累計培訓逾 20,000 位學員，服務橫跨電信、金融、零售、出版與科技產業。",
    link: "https://aiworks.tw/",
    stats: [
    { v: "200+", l: "Enterprises", num: true },
    { v: "20,000+", l: "Trained", num: true },
    { v: <span style={{ color: '#ff6b0f' }}>OpenAI</span>, l: "Partner" }]

  }];


  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">SINCE 2009 </div>
            <h2>{zh ? '關於 AppWorks。' : 'About AppWorks.'}</h2>
            <p className="sub">{zh ? '加速器、社群與創投，由創業者，為創業者打造。' : 'An accelerator, a community, and venture capital — built by founders, for founders.'}</p>
          </div>
        </div>
        <div className="about-grid">
          {cards.map((c, i) =>
          <div key={i} className="about-card">
              <h3>{c.title}<span className="dot">.</span></h3>
              <p className={zh ? 'zh' : ''}>{zh ? c.zh : c.en}</p>
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

function Partners({ favorites = [], onFav = () => {}, onIntro = () => {}, onOpenLive = () => {}, density = 'comfy', accentIntensity = 'balanced', language }) {
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
            <p>{tr(language, "A corporate accelerator focused on AI, robotics, sustainability, and next-gen computing — pairing startups with Wistron's global manufacturing network and enterprise customers. Program #10 brings another cohort of teams with commercial POC pathways built in.", ZH.partners.body)}</p>
            <div className="stats-inline">
              <div className="stat"><div className="v"><span className="num">10</span></div><div className="l">{tr(language, 'Programs', ZH.partners.programs)}</div></div>
              <div className="stat"><div className="v"><span className="num">80</span></div><div className="l">{tr(language, 'Alumni', ZH.partners.alumni)}</div></div>
              <div className="stat"><div className="v"><span className="num">4</span></div><div className="l">{tr(language, 'Teams pitching today', ZH.partners.pitching)}</div></div>
            </div>
            <a className="btn outline sm" href="https://appworks.tw/wistron/" target="_blank" rel="noopener">{tr(language, 'More information', '更多資訊')} <I.arrow /></a>
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
          liveTeamId={null} language={language} />
          )}
        </div>
        }
      </div>
    </section>);
}
window.Partners = Partners;

function Sponsors({ language }) {
  // DD#32 sponsors + event partner — logo lockups, shown together.
  const sponsors = [
  { name: 'Google Cloud', src: 'assets/sponsor-google.svg', h: 30 },
  { name: 'AWS', src: 'assets/sponsor-aws.svg', h: 34 },
  { name: 'KKCOMPANY', src: 'assets/sponsor-kkcompany.jpg', h: 40 }];

  return (
    <section className="section tight" id="sponsors">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{tr(language, 'Thank you to our sponsors & partners', ZH.sponsors.eyebrow)}</div>
            <h2>{tr(language, 'Demo Day sponsors.', ZH.sponsors.heading)}</h2>
          </div>
        </div>
        <div className="sponsors three">
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

/* ─── Event partners (attendee perks + promo codes, from the deck) ─── */
function EventPartners({ language }) {
  // Taipei-event perks only — not shown on the Singapore edition.
  if (!window.EVENT_CONFIG || window.EVENT_CONFIG.edition !== 'TW') return null;
  const partners = [
    { name: 'WeMo', logo: 'assets/logos/partner-wemo.png', note: 'AW#11 · #12', offers: [
      { perk: tr(language, 'WeMo PASS · 2-month free trial', 'WeMo PASS 2 個月 0 元體驗'), code: 'APPWORKS32', valid: tr(language, 'Redeem 2026/6/17–7/19', '兌換期限 2026/6/17–7/19') },
      { perk: tr(language, 'WeMo PASS · buy a season, get a season', 'WeMo PASS 買季送季'), code: 'APPWORKS32Q', valid: tr(language, 'Enter on 6/17 only', '限 6/17 當天輸入兌換') },
    ] },
    { name: 'USPACE', logo: 'assets/logos/partner-uspace.png', note: 'AW#18', offers: [
      { perk: tr(language, 'Parking voucher · NT$30 ×1', 'USPACE 停車券 $30 ×1'), code: 'APPWORKS31', valid: tr(language, 'Valid until 12/31', '使用期限至 12/31') },
    ] },
    { name: 'LINE GO', note: '', offers: [
      { perk: tr(language, 'Taxi ride voucher · NT$50', '計程車乘車券 50 元'), code: 'APPWORKS32', valid: tr(language, 'Collect & use on 6/17 only', '限 6/17 當天領取使用') },
    ] },
  ];
  return (
    <section className="section tight" id="event-partners">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">{tr(language, 'Perks for attendees', '與會者專屬優惠')}</div>
            <h2>{tr(language, 'Event partners.', '活動夥伴。')}</h2>
          </div>
        </div>
        <div className="ep-grid">
          {partners.map((p, i) =>
          <div key={i} className="ep-card">
            <div className="ep-name">{p.logo ? <img className="ep-logo" src={p.logo} alt={p.name}/> : <span>{p.name}</span>}{p.note && <span className="ep-batch">{p.note}</span>}</div>
            {p.offers.map((o, j) =>
            <div key={j} className="ep-offer">
              <div className="ep-perk">{o.perk}</div>
              <div className="ep-meta"><code className="ep-code">{o.code}</code><span className="ep-valid">{o.valid}</span></div>
            </div>
            )}
          </div>
          )}
        </div>
      </div>
    </section>);

}
window.EventPartners = EventPartners;

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