// teams.jsx — Teams directory with filters, cards, and density variants

function initials(name) {
  return name.replace(/[^A-Za-z0-9 ]/g,'').split(/\s+/).map(w => w[0]).slice(0,2).join('').toUpperCase();
}

// Flag glyph for the founder's HQ (single character pair, e.g. "KR" → 🇰🇷)
const FLAG = { TW:"🇹🇼", SG:"🇸🇬", KR:"🇰🇷", MY:"🇲🇾", US:"🇺🇸", HK:"🇭🇰", ID:"🇮🇩", JP:"🇯🇵", VN:"🇻🇳", PH:"🇵🇭", AU:"🇦🇺", FR:"🇫🇷", ES:"🇪🇸", AR:"🇦🇷", ARG:"🇦🇷" };

function LangBadge({ language }) {
  const isZh = language && language.toLowerCase().startsWith('mandarin');
  return (
    <span className={`badge lang ${isZh ? 'mandarin' : 'english'}`} title={`Pitch language: ${language}`}>
      {isZh ? "中" : "EN"}
    </span>
  );
}

function TeamCard({ team, density, favorited, onFav, onIntro, onOpenLive, accentLive, liveTeamId }) {
  const isLive = team.id === liveTeamId;
  const liveCls = isLive && accentLive ? 'live' : '';
  const tagCls = team.tags[0] ? `tag-${team.tags[0].toLowerCase().replace(/[^a-z0-9]/g,'-')}` : '';
  const orderStr = String(team.speakerOrder).padStart(2,'0');

  if (density === 'compact') {
    return (
      <article className={`team-card ${liveCls} ${tagCls}`} onClick={() => onOpenLive(team)}>
        <div className="logo order">{orderStr}</div>
        <div>
          <h4>{team.name}</h4>
          <div className="sub" style={{marginTop:2}}>{team.sub}</div>
        </div>
        <div>
          <p className="pitch" style={{minHeight:0}}>{team.pitch}</p>
          <div className="badges" style={{marginTop:6}}>
            {team.tags.map(t => <span key={t} className={`badge ${t.toLowerCase().replace(/[^a-z0-9]/g,'-')}`}>{t}</span>)}
            <LangBadge language={team.language}/>
          </div>
        </div>
        <div className="presenter-mini">
          <div className="who">{FLAG[team.hq] || ''} {team.presenter}</div>
          <div className="role">{team.title}</div>
        </div>
        <div className="compact-actions">
          <button className={`iconbtn ${favorited ? 'on' : ''}`} onClick={(e) => {e.stopPropagation(); onFav(team.id);}} title="Save to shortlist">
            {favorited ? <I.heartFill/> : <I.heart/>}
          </button>
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
          <div className="head">
            <div className="logo">{initials(team.name)}</div>
            <div className="meta">
              <h4>{team.name}</h4>
              <div className="sub">{team.sub}</div>
            </div>
          </div>
          <div className="badges">
            {team.tags.map(t => <span key={t} className={`badge ${t.toLowerCase().replace(/[^a-z0-9]/g,'-')}`}>{t}</span>)}
            <LangBadge language={team.language}/>
          </div>
          <p className="pitch">{team.pitch}</p>
          <div className="presenter">
            <div className="flag">{FLAG[team.hq] || ''}</div>
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
      <div className="head">
        <div className="logo order">{orderStr}</div>
        <div className="meta">
          <h4>{team.name}</h4>
          <div className="sub">{team.sub}</div>
        </div>
      </div>
      <div className="badges">
        {team.tags.map(t => <span key={t} className={`badge ${t.toLowerCase().replace(/[^a-z0-9]/g,'-')}`}>{t}</span>)}
        <LangBadge language={team.language}/>
      </div>
      <p className="pitch">{team.pitch}</p>
      <div className="presenter">
        <div className="flag">{FLAG[team.hq] || ''}</div>
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

function TeamsSection({ favorites, onFav, onIntro, onOpenLive, density, accentIntensity, captionLanguage, onCaptionLanguageChange, sessionId, liveTeamId }) {
  const [filter, setFilter] = useState({ tag: 'All', batches: [], languages: [], markets: [], favoritesOnly: false });
  const [search, setSearch] = useState('');

  const filtered = TEAMS.filter(t => {
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
            <div className="eyebrow">The Cohort · 17 founders · 2 programs</div>
            <h2>Presenting teams.</h2>
            <p className="sub">13 from AppWorks Accelerator #32 + 4 from Wistron Accelerator #10, in pitch order. Tap any card to favorite it or request an intro. 點選團隊可收藏或約約交流。</p>
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
                liveTeamId={liveTeamId}/>
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
