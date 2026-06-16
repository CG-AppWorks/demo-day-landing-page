// teams.jsx — Teams directory with filters, cards, and density variants

function initials(name) {
  return name.replace(/[^A-Za-z0-9 ]/g,'').split(/\s+/).map(w => w[0]).slice(0,2).join('').toUpperCase();
}

// Flag glyph for the founder's HQ (single character pair, e.g. "KR" → 🇰🇷)
const FLAG = { TW:"🇹🇼", SG:"🇸🇬", KR:"🇰🇷", MY:"🇲🇾", US:"🇺🇸", HK:"🇭🇰", ID:"🇮🇩", JP:"🇯🇵", VN:"🇻🇳", PH:"🇵🇭", AU:"🇦🇺", FR:"🇫🇷", ES:"🇪🇸", AR:"🇦🇷", ARG:"🇦🇷" };

// Team logo lockups, keyed by team id. Missing ids fall back to the order/initials box.
const LOGOS = {
  decisionslab:'assets/logos/decisionslab.png', hyarks:'assets/logos/hyarks.png',
  innowave:'assets/logos/innowave.png',
  krush:'assets/logos/krush.png', lips:'assets/logos/lips.png', notag:'assets/logos/notag.png',
  novo:'assets/logos/novo.png', pathors:'assets/logos/pathors.png', raptor:'assets/logos/raptor.png',
  refundy:'assets/logos/refundy.png', rosary:'assets/logos/rosary.png', shieldbase:'assets/logos/shieldbase.png',
  phasetrum:'assets/logos/phasetrum.png', omniease:'assets/logos/omniease.png',
  notifly:'assets/logos/notifly.png', greenbidz:'assets/logos/greenbidz.jpg',
  cloudstation:'assets/logos/cloudstation.png', arrivl:'assets/logos/arrivl.png',
  ruomei:'assets/logos/ruomei.png', clika:'assets/logos/clika.svg',
  sixsense:'assets/logos/sixsense.jpeg',
};

// Founder portraits, keyed by team id. Missing ids fall back to the HQ flag glyph.
const PORTRAITS = {
  notag:'assets/portraits/notag.jpg', pathors:'assets/portraits/pathors.png',
  shieldbase:'assets/portraits/shieldbase.png', refundy:'assets/portraits/refundy.png',
  hyarks:'assets/portraits/hyarks.jpeg', novo:'assets/portraits/novo.png',
  decisionslab:'assets/portraits/decisionslab.jpg', lips:'assets/portraits/lips.jpeg',
  raptor:'assets/portraits/raptor.png', rosary:'assets/portraits/rosary.png',
  krush:'assets/portraits/krush.jpg',
  phasetrum:'assets/portraits/phasetrum.jpg', omniease:'assets/portraits/omniease.jpg',
  arrivl:'assets/portraits/arrivl.jpg', ruomei:'assets/portraits/ruomei.jpg',
  notifly:'assets/portraits/notifly.jpg', innowave:'assets/portraits/innowave.jpg',
  greenbidz:'assets/portraits/greenbidz.png', cloudstation:'assets/portraits/cloudstation.png',
  sixsense:'assets/portraits/sixsense.jpeg', clika:'assets/portraits/clika.jpg',
};

function LangBadge({ language }) {
  if (window.EVENT_CONFIG && window.EVENT_CONFIG.wordly === false) return null;
  const isZh = language && language.toLowerCase().startsWith('mandarin');
  return (
    <span className={`badge lang ${isZh ? 'mandarin' : 'english'}`} title={`Pitch language: ${language}`}>
      {isZh ? "中" : "EN"}
    </span>
  );
}

function TeamCard({ team, density, favorited, onFav, onIntro, onOpenLive, accentLive, liveTeamId, language }) {
  const sub = tr(language, team.sub, (window.ZH && window.ZH.teamSub && window.ZH.teamSub[team.id]));
  const pitch = tr(language, team.pitch, (window.ZH && window.ZH.teamPitch && window.ZH.teamPitch[team.id]));
  const liveEnabled = !(window.EVENT_CONFIG && window.EVENT_CONFIG.nowOnStage === false);
  const isLive = liveEnabled && team.id === liveTeamId;
  const liveCls = isLive && accentLive ? 'live' : '';
  const tagCls = team.tags[0] ? `tag-${team.tags[0].toLowerCase().replace(/[^a-z0-9]/g,'-')}` : '';
  const orderStr = String(team.speakerOrder).padStart(2,'0');
  const logo = LOGOS[team.id];
  const portrait = PORTRAITS[team.id];

  if (density === 'compact') {
    return (
      <article className={`team-card ${liveCls} ${tagCls}`} onClick={() => onOpenLive(team)}>
        <div className="logo order">{orderStr}</div>
        <div>
          {logo
            ? <img className="card-logo-img sm" src={logo} alt={team.name}/>
            : <h4>{team.name}</h4>}
          <div className="sub" style={{marginTop:2}}>{sub}</div>
        </div>
        <div>
          <p className="pitch" style={{minHeight:0}}>{pitch}</p>
          <div className="badges" style={{marginTop:6}}>
            {team.tags.map(t => <span key={t} className={`badge ${t.toLowerCase().replace(/[^a-z0-9]/g,'-')}`}>{t}</span>)}
            <LangBadge language={team.language}/>
          </div>
        </div>
        <div className="presenter-mini">
          <div className="who">
            {portrait
              ? <img className="presenter-avatar sm" src={portrait} alt={team.presenter}/>
              : <span>{FLAG[team.hq] || ''}</span>} {team.presenter}
          </div>
          <div className="role">{team.title}</div>
        </div>
        <div className="compact-actions">
          <button className={`iconbtn ${favorited ? 'on' : ''}`} onClick={(e) => {e.stopPropagation(); onFav(team.id);}} title="Save to shortlist">
            {favorited ? <I.heartFill/> : <I.heart/>}
          </button>
          {team.linkedin && <a className="iconbtn" href={team.linkedin} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title={`${team.presenter} on LinkedIn`}><I.linkedin/></a>}
          {team.website && <a className="iconbtn" href={team.website} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title="Visit website"><I.globe/></a>}
          <button className="btn primary sm" onClick={(e)=>{e.stopPropagation(); onIntro(team);}} title={`Email ${team.presenter}`}><I.mail/> Contact</button>
        </div>
      </article>
    );
  }

  if (density === 'editorial') {
    return (
      <article className={`team-card ${liveCls} ${tagCls}`} onClick={() => onOpenLive(team)}>
        <div className="cover">
          <span className="order-tag">{orderStr}</span>
        </div>
        <div className="body">
          {logo
            ? <div className="card-logo-row"><img className="card-logo-img" src={logo} alt={team.name}/></div>
            : (
            <div className="head">
              <div className="logo">{initials(team.name)}</div>
              <div className="meta">
                <h4>{team.name}</h4>
              </div>
            </div>
            )}
          <div className="badges">
            {team.tags.map(t => <span key={t} className={`badge ${t.toLowerCase().replace(/[^a-z0-9]/g,'-')}`}>{t}</span>)}
            <LangBadge language={team.language}/>
          </div>
          <p className="pitch">{pitch}</p>
          <div className="presenter">
            {portrait
              ? <img className="presenter-avatar" src={portrait} alt={team.presenter}/>
              : <div className="flag">{FLAG[team.hq] || ''}</div>}
            <div className="who">
              <b>{team.presenter}</b>
              <span>{team.title} · {team.hq}</span>
            </div>
          </div>
          <div className="foot">
            <div style={{flex:1}}/>
            <div className="actions">
              <button className={`iconbtn ${favorited ? 'on' : ''}`} onClick={(e)=>{e.stopPropagation(); onFav(team.id);}} title="Save to shortlist">
                {favorited ? <I.heartFill/> : <I.heart/>}
              </button>
              {team.linkedin && <a className="iconbtn" href={team.linkedin} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title={`${team.presenter} on LinkedIn`}><I.linkedin/></a>}
              {team.website && <a className="iconbtn" href={team.website} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title="Visit website"><I.globe/></a>}
              <button className="btn primary sm" onClick={(e)=>{e.stopPropagation(); onIntro(team);}} title={`Email ${team.presenter}`}><I.mail/> Contact founder</button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // default / comfy
  return (
    <article className={`team-card ${liveCls} ${tagCls}`} onClick={() => onOpenLive(team)}>
      {logo
        ? <div className="card-logo-row"><img className="card-logo-img" src={logo} alt={team.name}/></div>
        : (
        <div className="head">
          <div className="logo order">{orderStr}</div>
          <div className="meta">
            <h4>{team.name}</h4>
          </div>
        </div>
        )}
      <div className="badges">
        {team.tags.map(t => <span key={t} className={`badge ${t.toLowerCase().replace(/[^a-z0-9]/g,'-')}`}>{t}</span>)}
        <LangBadge language={team.language}/>
      </div>
      <p className="pitch">{pitch}</p>
      <div className="presenter">
        {portrait
          ? <img className="presenter-avatar" src={portrait} alt={team.presenter}/>
          : <div className="flag">{FLAG[team.hq] || ''}</div>}
        <div className="who">
          <b>{team.presenter}</b>
          <span>{team.title} · {team.hq}</span>
        </div>
      </div>
      <div className="foot">
        <div style={{flex:1}}/>
        <div className="actions">
          <button className={`iconbtn ${favorited ? 'on' : ''}`} onClick={(e)=>{e.stopPropagation(); onFav(team.id);}} title="Save to shortlist">
            {favorited ? <I.heartFill/> : <I.heart/>}
          </button>
          {team.linkedin && <a className="iconbtn" href={team.linkedin} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title={`${team.presenter} on LinkedIn`}><I.linkedin/></a>}
          {team.website && <a className="iconbtn" href={team.website} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title="Visit website"><I.globe/></a>}
          <button className="btn primary sm" onClick={(e)=>{e.stopPropagation(); onIntro(team);}} title={`Email ${team.presenter}`}><I.mail/> Contact founder</button>
        </div>
      </div>
    </article>
  );
}

function FilterBar({ filter, setFilter, search, setSearch }) {
  return (
    <div className="filters">
      <div className="search">
        <I.search/>
        <input
          placeholder="Search teams, founders, sectors — e.g. 'agentic AI', 'maritime', 'voice'…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search
          ? <button className="search-clear" onClick={() => setSearch('')} aria-label="Clear search">×</button>
          : <span className="kbd">⌘K</span>}
      </div>
      <button
        className={`chip ${filter.favoritesOnly ? 'on' : ''}`}
        onClick={() => setFilter(f => ({...f, favoritesOnly: !f.favoritesOnly}))}>
        <I.heart/> Favorites
      </button>
    </div>
  );
}

function TeamsSection({ favorites, onFav, onIntro, onOpenLive, density, accentIntensity, captionLanguage, onCaptionLanguageChange, sessionId, liveTeamId, language }) {
  const [filter, setFilter] = useState({ tag: 'All', batches: [], languages: [], markets: [], favoritesOnly: false });
  const [search, setSearch] = useState('');

  const filtered = TEAMS.filter(t => {
    if (t.batch === 'WA#10') return false; // shown under the Wistron block
    if (filter.tag !== 'All' && !t.tags.includes(filter.tag)) return false;
    if (filter.batches.length && !filter.batches.includes(t.batch)) return false;
    if (filter.languages.length && !filter.languages.includes((t.language || '').split(' ')[0])) return false;
    if (filter.markets.length && !filter.markets.includes(t.hq)) return false;
    if (filter.favoritesOnly && !favorites.includes(t.id)) return false;
    if (search) {
      const s = search.toLowerCase();
      const hay = [t.name, t.sub, t.pitch, t.presenter, t.title].join(' ').toLowerCase();
      if (!hay.includes(s)) return false;
    }
    return true;
  });

  return (
    <section className="section" id="teams">
      <div className="container">
        <div className="section-head">
          <div>
            {(window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false) && <div className="eyebrow">AppWorks #32</div>}
            <h2>{tr(language, 'Presenting teams.', ZH.teams.heading)}</h2>
            <p className="sub">{tr(language,
              (window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false)
                ? 'Tap any card to favorite it or request an intro to the founder.'
                : 'Tap any card to favorite it or request an intro.',
              ZH.teams.sub)}</p>
          </div>
        </div>

        <FilterBar filter={filter} setFilter={setFilter} search={search} setSearch={setSearch}/>

        <div className="stage">
          <div className={`teams ${density}`}>
            {filtered.map(t =>
              <TeamCard key={t.id} team={t}
                density={density}
                favorited={favorites.includes(t.id)}
                onFav={onFav} onIntro={onIntro} onOpenLive={onOpenLive}
                accentLive={accentIntensity !== 'restrained'}
                liveTeamId={liveTeamId}
                language={language}/>
            )}
            {filtered.length === 0 &&
              <div style={{gridColumn:'1/-1', padding:'48px 24px', textAlign:'center', color:'var(--fg2)'}}>
                No teams match these filters. <button className="btn ghost sm" onClick={() => {setFilter({tag:'All', batches:[], languages:[], markets:[], favoritesOnly:false}); setSearch('');}}>Clear filters</button>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
}
window.TeamsSection = TeamsSection;
window.TeamCard = TeamCard;
