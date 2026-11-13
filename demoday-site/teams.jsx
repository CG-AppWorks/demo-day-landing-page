// teams.jsx — Teams directory with filters, cards, and density variants

function initials(name) {
  return name.replace(/[^A-Za-z0-9 ]/g,'').split(/\s+/).map(w => w[0]).slice(0,2).join('').toUpperCase();
}

// Flag glyph for the founder's HQ (single character pair, e.g. "KR" → 🇰🇷)
const FLAG = { TW:"🇹🇼", SG:"🇸🇬", KR:"🇰🇷", MY:"🇲🇾", US:"🇺🇸", HK:"🇭🇰", ID:"🇮🇩", JP:"🇯🇵", VN:"🇻🇳", PH:"🇵🇭", AU:"🇦🇺", FR:"🇫🇷", ES:"🇪🇸", AR:"🇦🇷", ARG:"🇦🇷", AE:"🇦🇪", CH:"🇨🇭" };

// Logos and founder portraits come from each team's `logo` / `portrait` field in
// the data file. No logo -> order/initials box; no portrait -> HQ flag glyph.

// Wordmark logos stand alone; icon-only marks (team.logoMark) carry the name beside them.
function LogoRow({ team, sm }) {
  const img = <img className={`card-logo-img${sm ? ' sm' : ''}${team.logoMark ? ' mark' : ''}`} src={team.logo} alt={team.name}/>;
  if (!team.logoMark) return sm ? img : <div className="card-logo-row">{img}</div>;
  return <div className={`card-logo-row with-name${sm ? ' sm' : ''}`}>{img}<h4>{team.name}</h4></div>;
}

function TeamCard({ team, density, favorited, onFav, onIntro, onOpenLive, accentLive, liveTeamId, language }) {
  const sub = tr(language, team.sub, (window.ZH && window.ZH.teamSub && window.ZH.teamSub[team.id]));
  const pitch = tr(language, team.pitch, (window.ZH && window.ZH.teamPitch && window.ZH.teamPitch[team.id]));
  const liveEnabled = !(window.EVENT_CONFIG && window.EVENT_CONFIG.nowOnStage === false);
  const isLive = liveEnabled && team.id === liveTeamId;
  const liveCls = isLive && accentLive ? 'live' : '';
  const tagCls = team.tags[0] ? `tag-${team.tags[0].toLowerCase().replace(/[^a-z0-9]/g,'-')}` : '';
  const orderStr = String(team.speakerOrder).padStart(2,'0');
  const logo = team.logo;
  const portrait = team.portrait;

  if (density === 'compact') {
    return (
      <article id={`team-${team.id}`} className={`team-card ${liveCls} ${tagCls}`} onClick={() => onOpenLive(team)}>
        <div className="logo order">{orderStr}</div>
        <div>
          {logo
            ? <LogoRow team={team} sm/>
            : <h4>{team.name}</h4>}
          <div className="sub" style={{marginTop:2}}>{sub}</div>
        </div>
        <div>
          <p className="pitch" style={{minHeight:0}}>{pitch}</p>
          <div className="badges" style={{marginTop:6}}>
            {team.tags.map(t => <span key={t} className={`badge ${t.toLowerCase().replace(/[^a-z0-9]/g,'-')}`}>{t}</span>)}
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
          <button className={`iconbtn ${favorited ? 'on' : ''}`} onClick={(e) => {e.stopPropagation(); onFav(team.id);}} title="Save to shortlist" data-track="favorite" data-team={team.id} data-x={favorited ? 'remove' : 'add'}>
            {favorited ? <I.heartFill/> : <I.heart/>}
          </button>
          {team.linkedin && <a className="iconbtn" href={team.linkedin} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title={`${team.presenter} on LinkedIn`} data-track="linkedin" data-team={team.id}><I.linkedin/></a>}
          {team.website && <a className="iconbtn" href={team.website} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title="Visit website" data-track="website" data-team={team.id}><I.globe/></a>}
          {team.email && <button className="btn primary sm" onClick={(e)=>{e.stopPropagation(); onIntro(team);}} title={`Email ${team.presenter}`} data-track="contact_open" data-team={team.id}><I.mail/> Contact</button>}
        </div>
      </article>
    );
  }

  if (density === 'editorial') {
    return (
      <article id={`team-${team.id}`} className={`team-card ${liveCls} ${tagCls}`} onClick={() => onOpenLive(team)}>
        <div className="cover">
          <span className="order-tag">{orderStr}</span>
        </div>
        <div className="body">
          {logo
            ? <LogoRow team={team}/>
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
          </div>
          <p className="pitch">{pitch}</p>
          <div className="presenter">
            {portrait
              ? <img className="presenter-avatar" src={portrait} alt={team.presenter}/>
              : <div className="flag">{FLAG[team.hq] || ''}</div>}
            <div className="who">
              <b>{team.presenter}</b>
              <span>{[team.title, team.hq].filter(Boolean).join(' · ')}</span>
            </div>
          </div>
          <div className="foot">
            <div style={{flex:1}}/>
            <div className="actions">
              <button className={`iconbtn ${favorited ? 'on' : ''}`} onClick={(e)=>{e.stopPropagation(); onFav(team.id);}} title="Save to shortlist" data-track="favorite" data-team={team.id} data-x={favorited ? 'remove' : 'add'}>
                {favorited ? <I.heartFill/> : <I.heart/>}
              </button>
              {team.linkedin && <a className="iconbtn" href={team.linkedin} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title={`${team.presenter} on LinkedIn`} data-track="linkedin" data-team={team.id}><I.linkedin/></a>}
              {team.website && <a className="iconbtn" href={team.website} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title="Visit website" data-track="website" data-team={team.id}><I.globe/></a>}
              {team.email && <button className="btn primary sm" onClick={(e)=>{e.stopPropagation(); onIntro(team);}} title={`Email ${team.presenter}`} data-track="contact_open" data-team={team.id}><I.mail/> Contact founder</button>}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // default / comfy
  return (
    <article id={`team-${team.id}`} className={`team-card ${liveCls} ${tagCls}`} onClick={() => onOpenLive(team)}>
      {logo
        ? <LogoRow team={team}/>
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
      </div>
      <p className="pitch">{pitch}</p>
      <div className="presenter">
        {portrait
          ? <img className="presenter-avatar" src={portrait} alt={team.presenter}/>
          : <div className="flag">{FLAG[team.hq] || ''}</div>}
        <div className="who">
          <b>{team.presenter}</b>
          <span>{[team.title, team.hq].filter(Boolean).join(' · ')}</span>
        </div>
      </div>
      <div className="foot">
        <div style={{flex:1}}/>
        <div className="actions">
          <button className={`iconbtn ${favorited ? 'on' : ''}`} onClick={(e)=>{e.stopPropagation(); onFav(team.id);}} title="Save to shortlist" data-track="favorite" data-team={team.id} data-x={favorited ? 'remove' : 'add'}>
            {favorited ? <I.heartFill/> : <I.heart/>}
          </button>
          {team.linkedin && <a className="iconbtn" href={team.linkedin} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title={`${team.presenter} on LinkedIn`} data-track="linkedin" data-team={team.id}><I.linkedin/></a>}
          {team.website && <a className="iconbtn" href={team.website} target="_blank" rel="noopener" onClick={(e)=>e.stopPropagation()} title="Visit website" data-track="website" data-team={team.id}><I.globe/></a>}
          {team.email && <button className="btn primary sm" onClick={(e)=>{e.stopPropagation(); onIntro(team);}} title={`Email ${team.presenter}`} data-track="contact_open" data-team={team.id}><I.mail/> Contact founder</button>}
        </div>
      </div>
    </article>
  );
}

// Category chips: the four RFS first (#1 Manufacturing AI, #2 Defense Tech,
// #3 On-Chain Banking, #4 PQC), then the other groups. Only categories present
// in the list are shown, each with its team count.
const CATEGORY_ORDER = ['Manufacturing AI', 'Defense Tech', 'On-Chain Banking', 'PQC', 'Enterprise AI', 'Semiconductor', 'Health Tech', 'Media'];
const tagSlug = (t) => t.toLowerCase().replace(/[^a-z0-9]/g, '-');

function FilterBar({ filter, setFilter, teams, language }) {
  const counts = {};
  teams.forEach((t) => (t.tags || []).forEach((g) => { counts[g] = (counts[g] || 0) + 1; }));
  const rank = (c) => { const i = CATEGORY_ORDER.indexOf(c); return i < 0 ? 99 : i; };
  const cats = Object.keys(counts).sort((a, b) => rank(a) - rank(b));
  const pick = (tag) => setFilter((f) => ({ ...f, tag }));
  return (
    <div className="filters" role="group" aria-label="Filter teams by category">
      <button className={`chip ${filter.tag === 'All' ? 'on' : ''}`} onClick={() => pick('All')}
        data-track="filter" data-x="all">
        {tr(language, 'All', '全部')} <span className="chip-n">{teams.length}</span>
      </button>
      {cats.map((c) =>
      <button key={c} className={`chip tag-${tagSlug(c)} ${filter.tag === c ? 'on' : ''}`}
        onClick={() => pick(filter.tag === c ? 'All' : c)} data-track="filter" data-x={c}>
          <span className="dot"/>{c} <span className="chip-n">{counts[c]}</span>
        </button>
      )}
      <span className="chip-divider"/>
      <button
        className={`chip ${filter.favoritesOnly ? 'on' : ''}`}
        onClick={() => setFilter(f => ({...f, favoritesOnly: !f.favoritesOnly}))}>
        <I.heart/> {tr(language, 'Favorites', '收藏')}
      </button>
    </div>
  );
}

function TeamsSection({ favorites, onFav, onIntro, onOpenLive, density, accentIntensity, captionLanguage, onCaptionLanguageChange, sessionId, liveTeamId, language }) {
  const [filter, setFilter] = useState({ tag: 'All', batches: [], languages: [], markets: [], favoritesOnly: false });

  // Wistron teams are shown under the Wistron block, not here.
  const listed = TEAMS.filter(t => t.batch !== (window.EVENT_CONFIG || {}).wistronBatch);
  const filtered = listed.filter(t => {
    if (filter.tag !== 'All' && !t.tags.includes(filter.tag)) return false;
    if (filter.batches.length && !filter.batches.includes(t.batch)) return false;
    if (filter.languages.length && !filter.languages.includes((t.language || '').split(' ')[0])) return false;
    if (filter.markets.length && !filter.markets.includes(t.hq)) return false;
    if (filter.favoritesOnly && !favorites.includes(t.id)) return false;
    return true;
  });

  return (
    <section className="section" id="teams">
      <div className="container">
        <div className="section-head">
          <div>
            {(window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false) && <div className="eyebrow">{window.EVENT_CONFIG.batchLabel}</div>}
            <h2>{tr(language, 'Presenting teams.', ZH.teams.heading)}</h2>
            <p className="sub">{tr(language,
              (window.EVENT_CONFIG && window.EVENT_CONFIG.wistron === false)
                ? 'Tap any card to favorite it or request an intro to the founder.'
                : 'Tap any card to favorite it or request an intro.',
              ZH.teams.sub)}</p>
          </div>
        </div>

        <FilterBar filter={filter} setFilter={setFilter} teams={listed} language={language}/>

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
                No teams match these filters. <button className="btn ghost sm" onClick={() => setFilter({tag:'All', batches:[], languages:[], markets:[], favoritesOnly:false})}>Clear filters</button>
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
