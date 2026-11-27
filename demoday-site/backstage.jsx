// backstage.jsx — operator console for running the event live.
// Persists to localStorage so it survives refreshes and is independent of the
// design-time Tweaks panel. Source of truth for: Wordly session ID, event
// phase, and the currently-pitching team.
//
// Open it any of three ways:
//   • Keyboard:  Ctrl/⌘ + Shift + B
//   • URL:       add #backstage to the address and reload
//   • Footer:    the small "Backstage" link in the footer
const { useState: useBkState, useEffect: useBkEffect } = React;

const BACKSTAGE_KEY = 'dd33.backstage.' + ((window.EVENT_CONFIG && window.EVENT_CONFIG.edition) || 'TW') + '.v1';

function useBackstage(defaults) {
  const [state, setState] = useBkState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(BACKSTAGE_KEY) || '{}');
      return { ...defaults, ...saved };
    } catch (e) { return defaults; }
  });

  const set = (patch) => setState(prev => {
    const next = { ...prev, ...patch };
    try { localStorage.setItem(BACKSTAGE_KEY, JSON.stringify(next)); } catch (e) {}
    return next;
  });

  const reset = () => {
    try { localStorage.removeItem(BACKSTAGE_KEY); } catch (e) {}
    setState(defaults);
  };

  // Cross-tab / cross-device-on-same-browser sync: if the booth has the page
  // open in two tabs, changes propagate.
  useBkEffect(() => {
    const onStorage = (e) => {
      if (e.key === BACKSTAGE_KEY && e.newValue) {
        try { setState(s => ({ ...s, ...JSON.parse(e.newValue) })); } catch (er) {}
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return [state, set, reset];
}
window.useBackstage = useBackstage;

// Hook: returns [open, setOpen] and wires keyboard + hash triggers.
function useBackstageToggle() {
  // Never auto-open on load — otherwise a lingering #backstage in the URL
  // re-pops the console on every refresh. Open only via the footer link
  // (#backstage) or ⌘/Ctrl+Shift+B.
  const [open, setOpen] = useBkState(false);
  useBkEffect(() => {
    const clearHash = () => {
      if (window.location.hash.toLowerCase() === '#backstage') {
        try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch (e) {}
      }
    };
    clearHash(); // strip a stale #backstage left from a previous session
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'B' || e.key === 'b')) {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onHash = () => {
      if (window.location.hash.toLowerCase() === '#backstage') { setOpen(true); clearHash(); }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('hashchange', onHash);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hashchange', onHash);
    };
  }, []);
  return [open, setOpen];
}
window.useBackstageToggle = useBackstageToggle;

// ── Stage order: batches in the order they appear in TEAMS (AW → WA → CPD),
// then speakerOrder within each batch. ──
function stageOrder() {
  const teams = window.TEAMS || [];
  const rank = {};
  teams.forEach((t) => { if (!(t.batch in rank)) rank[t.batch] = Object.keys(rank).length; });
  return [...teams].sort((a, b) => (rank[a.batch] - rank[b.batch]) || (a.speakerOrder - b.speakerOrder));
}
window.stageOrder = stageOrder;

const teamLabel = (t) => t ? `${t.name} — ${t.presenter || ''}${t.title ? ', ' + t.title : ''} · ${t.sub || ''}` : '';

// Starting glossary for a fresh event: event terms + every team and presenter
// name, kept in English. Cg reviews and saves it; nothing is sent until then.
const CAPTION_EVENT_TERMS = [
  'AppWorks = keep', 'AppWorks Accelerator = keep', 'Demo Day = keep',
  'Compiling the Uncompilable = keep  # AW#33 theme',
  'Jamie Lin = 林之晨  # AppWorks chairman, keynote',
  'Wistron = 緯創', 'Wistron Accelerator = keep',
  'Computing Power Donation = 算力捐贈計畫  # Wistron program',
  'Garage+ = keep', 'Google Cloud = keep', 'AWS = keep', 'KKCOMPANY = keep',
];
function lineupGlossaryLines() {
  const lines = [...CAPTION_EVENT_TERMS];
  stageOrder().forEach((t) => {
    lines.push(`${t.name} = keep  # ${t.batch} team`);
    if (t.presenter && !/TBC/i.test(t.presenter)) lines.push(`${t.presenter} = keep  # ${t.name}`);
  });
  return lines;
}
// Append lines whose term (left of "=") isn't in the glossary yet.
function mergeGlossary(text, lines) {
  const key = (l) => l.replace(/#.*$/, '').split('=')[0].trim().toLowerCase();
  const have = new Set((text || '').split('\n').map(key).filter(Boolean));
  const add = lines.filter((l) => !have.has(key(l)));
  return [(text || '').trim(), ...add].filter(Boolean).join('\n');
}

// ── Caption context editor: what the AI reads before it captions ──
// Saved on the captions server, so it applies to the broadcaster laptop and
// every guest, whatever device you edit it from.
function CaptionContext({ worker, token, onStage, onLoaded }) {
  const teams = stageOrder();
  const [loaded, setLoaded] = useBkState(false);
  const [general, setGeneral] = useBkState({ instructions: '', glossary: '' });
  const [saved, setSaved] = useBkState({ instructions: '', glossary: '' });
  const [scripts, setScripts] = useBkState({});
  const [sel, setSel] = useBkState(teams[0] ? teams[0].id : '');
  const [draft, setDraft] = useBkState('');
  const [msg, setMsg] = useBkState('');
  const [busy, setBusy] = useBkState(false);
  const [tryText, setTryText] = useBkState('');
  const [tryOut, setTryOut] = useBkState(null);

  const api = (path, body) => fetch(worker + path, {
    method: body ? 'POST' : 'GET',
    headers: { ...(body ? { 'Content-Type': 'application/json' } : {}), Authorization: 'Bearer ' + token },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  }).then((r) => r.json().then((j) => { if (!r.ok || j.error) throw new Error(j.error || ('HTTP ' + r.status)); return j; }));

  const apply = (j) => {
    const g = { instructions: (j.general && j.general.instructions) || '', glossary: (j.general && j.general.glossary) || '' };
    setSaved(g); setScripts(j.teams || {}); onLoaded && onLoaded(j.onStage || '');
    return g;
  };
  const fail = (what) => (e) => { setBusy(false); setMsg(what + ' failed: ' + e.message + (/unauthorized/.test(e.message) ? ' — check the admin token' : '')); };

  const load = () => {
    if (!token) { setMsg('Enter the admin token above to load the caption context.'); return; }
    setBusy(true); setMsg('Loading…');
    api('/api/context').then((j) => {
      const g = apply(j);
      const fresh = !g.glossary && !g.instructions;
      setGeneral(fresh ? { instructions: '', glossary: mergeGlossary('', lineupGlossaryLines()) } : g);
      setLoaded(true); setBusy(false);
      setMsg(fresh ? 'Nothing saved yet. The glossary below is pre-filled from the lineup: review it, then Save.' : 'Loaded from the captions server.');
    }).catch(fail('Load'));
  };
  useBkEffect(() => { if (token && !loaded) load(); }, [token]);
  useBkEffect(() => { setDraft((scripts[sel] && scripts[sel].script) || ''); setTryOut(null); }, [sel, scripts]);

  const generalDirty = general.instructions !== saved.instructions || general.glossary !== saved.glossary;
  const savedScript = (scripts[sel] && scripts[sel].script) || '';
  const scriptDirty = draft.trim() !== savedScript;
  const selTeam = teams.find((t) => t.id === sel);
  const onStageTeam = teams.find((t) => t.id === onStage);
  const nScripts = teams.filter((t) => scripts[t.id]).length;

  const saveGeneral = () => {
    setBusy(true);
    api('/api/context', { general }).then((j) => { apply(j); setBusy(false); setMsg('Style notes + glossary saved. Captions use them from the next line.'); }).catch(fail('Save'));
  };
  const saveScript = () => {
    setBusy(true);
    api('/api/context', { team: { id: sel, label: teamLabel(selTeam), script: draft } }).then((j) => {
      apply(j); setBusy(false);
      setMsg(draft.trim() ? `Script saved for ${selTeam.name}.` : `Script removed for ${selTeam.name}.`);
    }).catch(fail('Save'));
  };
  const useNow = (id) => {
    setBusy(true);
    const t = teams.find((x) => x.id === id);
    api('/api/context', { onStage: id, onStageLabel: teamLabel(t) }).then((j) => {
      apply(j); setBusy(false);
      setMsg(t ? `Captions now use ${t.name}'s script.` : 'No team on stage: captions use the style notes + glossary only.');
    }).catch(fail('Update'));
  };
  const tryLine = () => {
    if (!tryText.trim()) return;
    setTryOut({ pending: true });
    api('/api/translate', { engine: 'gemini', text: tryText.trim(), team: sel })
      .then((j) => setTryOut(j)).catch((e) => setTryOut({ error: e.message }));
  };

  if (!token) {
    return <div className="bk-hint">Enter the admin token above to edit the caption context.</div>;
  }
  return (
    <div className="bk-ctx">
      <div className="bk-sublabel">Style notes <span className="bk-count">{general.instructions.length} / 4,000</span></div>
      <textarea className="bk-input bk-text" rows={3} value={general.instructions} disabled={!loaded}
        placeholder={'e.g. Keep 中文 short and spoken. 新創 not 初創. Money as 萬/億 美元. Keep company + product names in English.'}
        onChange={(e) => setGeneral({ ...general, instructions: e.target.value })}/>
      <div className="bk-sublabel">Glossary <span className="bk-muted">one per line · <code>English = 中文</code> · <code>Name = keep</code> · # note</span>
        <span className="bk-count">{general.glossary.split('\n').filter((l) => l.trim()).length} lines</span></div>
      <textarea className="bk-input bk-text mono-ish" rows={8} value={general.glossary} disabled={!loaded} spellCheck={false}
        onChange={(e) => setGeneral({ ...general, glossary: e.target.value })}/>
      <div className="bk-row">
        <button className="bk-btn primary" disabled={!loaded || busy || !generalDirty} onClick={saveGeneral}>{generalDirty ? 'Save notes + glossary' : 'Saved ✓'}</button>
        <button className="bk-btn" disabled={!loaded || busy} onClick={() => setGeneral({ ...general, glossary: mergeGlossary(general.glossary, lineupGlossaryLines()) })}>Add lineup names</button>
        {generalDirty && <button className="bk-btn ghost" onClick={() => setGeneral(saved)}>Undo</button>}
      </div>

      <div className="bk-sublabel" style={{ marginTop: 18 }}>Pitch scripts <span className="bk-count">{nScripts} / {teams.length} saved</span></div>
      <select className="bk-input" value={sel} onChange={(e) => setSel(e.target.value)} disabled={!loaded}>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {scripts[t.id] ? '✓ ' : '· '}{t.batch} {String(t.speakerOrder).padStart(2, '0')} · {t.name}{t.id === onStage ? '  (on stage)' : ''}
          </option>
        ))}
      </select>
      <textarea className="bk-input bk-text" rows={8} value={draft} disabled={!loaded} style={{ marginTop: 8 }}
        placeholder={selTeam ? `Paste ${selTeam.name}'s pitch script (English, 中文 or both). The AI uses it to get names, terms and numbers right while this team is on stage.` : ''}
        onChange={(e) => setDraft(e.target.value)}/>
      <div className="bk-row">
        <button className="bk-btn primary" disabled={!loaded || busy || !scriptDirty} onClick={saveScript}>{scriptDirty ? (draft.trim() ? 'Save script' : 'Remove script') : 'Saved ✓'}</button>
        <button className="bk-btn" disabled={!loaded || busy || sel === onStage} onClick={() => useNow(sel)}>{sel === onStage ? 'On stage now ✓' : 'Use for captions now'}</button>
        <span className="bk-count">{draft.length.toLocaleString()} / 15,000</span>
      </div>

      <div className="bk-live">
        <span className="k">Captions use:</span>
        <code>{onStageTeam ? onStageTeam.name : 'notes + glossary only'}</code>
        {onStageTeam && !scripts[onStage] && <span className="warn">no script saved</span>}
        {onStage && <button className="bk-btn ghost" style={{ marginLeft: 'auto', padding: '4px 8px' }} disabled={busy} onClick={() => useNow('')}>Clear</button>}
      </div>
      <div className="bk-hint">Follows <b>Currently pitching</b> below (in On Air), or set it here. Saved on the captions server, so it reaches the broadcaster laptop.</div>

      <div className="bk-sublabel" style={{ marginTop: 18 }}>Try a line <span className="bk-muted">Gemini, with the saved notes, glossary and {selTeam ? selTeam.name + "'s saved script" : 'script'}</span></div>
      <div className="bk-id-row">
        <input className="bk-input" value={tryText} placeholder="Type what a speaker might say…" disabled={!loaded}
          onChange={(e) => setTryText(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') tryLine(); }}/>
        <button className="bk-btn" disabled={!loaded || !tryText.trim()} onClick={tryLine}>Translate</button>
      </div>
      {tryOut && (
        <div className="bk-try">
          {tryOut.pending ? 'Translating…' : tryOut.error ? <span className="warn">Failed: {tryOut.error}</span> : <>
            <div>{tryOut.en}</div><div className="zh">{tryOut.zh}</div>
          </>}
        </div>
      )}
      {msg && <div className="bk-hint"><span className={/failed|check/i.test(msg) ? 'warn' : ''}>{msg}</span></div>}
    </div>
  );
}
window.CaptionContext = CaptionContext;

function Backstage({ open, onClose, stage, setStage, reset }) {
  const [draftId, setDraftId] = useBkState(stage.sessionId);
  useBkEffect(() => { setDraftId(stage.sessionId); }, [stage.sessionId]);

  // Password gate — unlocks for this browser session only.
  const [unlocked, setUnlocked] = useBkState(() => {
    try { return sessionStorage.getItem('dd33.bk.unlocked') === '1'; } catch (e) { return false; }
  });
  const [pw, setPw] = useBkState('');
  const [pwErr, setPwErr] = useBkState(false);
  const tryUnlock = () => {
    if (pw === 'il0veT@iwan') {
      setUnlocked(true); setPwErr(false);
      try { sessionStorage.setItem('dd33.bk.unlocked', '1'); } catch (e) {}
    } else { setPwErr(true); }
  };

  // ── Live caption engine switch (server-side; affects all guests) ──
  const captionsWorker = (window.EVENT_CONFIG && window.EVENT_CONFIG.captionsWorker) || '';
  const [adminToken, setAdminToken] = useBkState(() => {
    try { return localStorage.getItem('ddtw.token') || ''; } catch (e) { return ''; }
  });
  const [liveSource, setLiveSource] = useBkState('');
  const [switchMsg, setSwitchMsg] = useBkState('');
  useBkEffect(() => {
    if (!captionsWorker || !open) return;
    let stop = false;
    const poll = () => fetch(captionsWorker + '/api/latest?channel=active', { cache: 'no-store' })
      .then((r) => r.json()).then((d) => { if (!stop) setLiveSource(d.active); }).catch(() => {});
    poll();
    const id = setInterval(poll, 3000);
    return () => { stop = true; clearInterval(id); };
  }, [captionsWorker, open]);
  const clearCaptions = () => {
    const tok = adminToken.trim();
    if (!tok) { setSwitchMsg('Enter the admin token first.'); return; }
    setSwitchMsg('Clearing caption history…');
    fetch(captionsWorker + '/api/reset', { method: 'POST', headers: { Authorization: 'Bearer ' + tok } })
      .then((r) => r.json()).then((j) => setSwitchMsg(j && j.ok ? 'Caption history cleared.' : 'Clear failed.'))
      .catch((e) => setSwitchMsg('Clear error: ' + e.message));
  };
  const flipEngine = (eng) => {
    const tok = adminToken.trim();
    if (!tok) { setSwitchMsg('Enter the admin token first.'); return; }
    try { localStorage.setItem('ddtw.token', tok); } catch (e) {}
    setSwitchMsg('Switching to ' + eng + '…');
    fetch(captionsWorker + '/api/switch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + tok },
      body: JSON.stringify({ active: eng }),
    }).then((r) => r.json().then((j) => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (ok && j.ok) { setLiveSource(j.active); setSwitchMsg('Now live: ' + eng.toUpperCase()); }
        else { setSwitchMsg('Failed: ' + (j.error || 'error') + (j.error === 'unauthorized' ? ' (check token)' : '')); }
      }).catch((e) => setSwitchMsg('Network error: ' + e.message));
  };

  // ── Caption context: which team's script the captions server uses ──
  const [ctxOnStage, setCtxOnStage] = useBkState('');
  const [stageSyncMsg, setStageSyncMsg] = useBkState('');
  const syncOnStage = (id) => {
    const tok = adminToken.trim();
    if (!captionsWorker) return;
    if (!tok) { setStageSyncMsg('Not sent to captions: enter the admin token above.'); return; }
    fetch(captionsWorker + '/api/context', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + tok },
      body: JSON.stringify({ onStage: id, onStageLabel: teamLabel(stageOrder().find((t) => t.id === id)) }),
    }).then((r) => r.json().then((j) => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (ok && !j.error) { setCtxOnStage(j.onStage || ''); setStageSyncMsg(''); }
        else setStageSyncMsg('Captions context not updated: ' + (j.error || 'error'));
      }).catch((e) => setStageSyncMsg('Captions context not updated: ' + e.message));
  };
  // Changing the pitching team also points the captions at that team's script.
  const setLive = (id) => { setStage({ liveTeamId: id }); syncOnStage(id === 'OFF_AIR' ? '' : id); };

  if (!open) return null;

  if (!unlocked) {
    return (
      <div className="bk-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Backstage login">
        <div className="bk-panel bk-gate" onClick={(e) => e.stopPropagation()}>
          <div className="bk-head">
            <div className="bk-title">Backstage · locked</div>
            <button className="bk-close" onClick={onClose} aria-label="Close">×</button>
          </div>
          <div className="bk-body">
            <label className="bk-label">Enter password</label>
            <input
              className={`bk-input ${pwErr ? 'warn' : ''}`}
              type="password"
              value={pw}
              autoFocus
              spellCheck={false}
              onChange={(e) => { setPw(e.target.value); setPwErr(false); }}
              onKeyDown={(e) => { if (e.key === 'Enter') tryUnlock(); }}/>
            {pwErr && <div className="bk-hint warn">Incorrect password.</div>}
            <button className="bk-btn primary" style={{ marginTop: 12 }} onClick={tryUnlock}>Unlock</button>
          </div>
        </div>
      </div>);
  }

  const idValid = /^[A-Za-z]{4}-?\d{4}$/.test(draftId.trim());
  const normalizedId = draftId.trim().toUpperCase();
  const commitId = () => { if (draftId.trim()) setStage({ sessionId: normalizedId }); };

  const phases = [
    { value:'before',   label:'Before' },
    { value:'live',     label:'On Air' },
    { value:'cocktail', label:'Cocktail' },
  ];

  return (
    <div className="bk-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Backstage operator console">
      <div className="bk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="bk-head">
          <div className="bk-title">
            <span className="bk-dot"/> Backstage
            <span className="bk-sub">Operator console · saved on this device</span>
          </div>
          <button className="bk-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="bk-body">
          {/* Wordly session */}
          {(window.EVENT_CONFIG ? window.EVENT_CONFIG.wordly !== false : true) && (
          <section className="bk-section">
            <label className="bk-label">Wordly session ID</label>
            <div className="bk-id-row">
              <input
                className={`bk-input mono ${draftId && !idValid ? 'warn' : ''}`}
                value={draftId}
                placeholder="DXRS-1194"
                spellCheck={false}
                autoCapitalize="characters"
                onChange={(e) => setDraftId(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') commitId(); }}/>
              <button className="bk-btn primary" onClick={commitId} disabled={!draftId.trim() || normalizedId === stage.sessionId}>
                {normalizedId === stage.sessionId ? 'Saved ✓' : 'Update'}
              </button>
            </div>
            <div className="bk-hint">
              {draftId && !idValid
                ? <span className="warn">Format looks unusual — Wordly IDs are 4 letters + 4 digits (e.g. DXRS-1194). Saving anyway is allowed.</span>
                : <span>Pushes instantly to the banner, nav button, captions strip & QR codes.</span>}
            </div>
            <div className="bk-live">
              <span className="k">Now live:</span>
              <code>{stage.sessionId || '—'}</code>
              <a href={`https://attend.wordly.ai/join/${stage.sessionId}`} target="_blank" rel="noopener" className="bk-open">Test attendee link →</a>
            </div>
          </section>
          )}

          {/* Live caption engine switch */}
          {captionsWorker && (
          <section className="bk-section">
            <label className="bk-label">Live captions engine</label>
            <input
              className="bk-input mono"
              type="password"
              placeholder="Admin token (ddtw_…)"
              value={adminToken}
              spellCheck={false}
              autoComplete="off"
              onChange={(e) => setAdminToken(e.target.value)}/>
            <div className="bk-seg" style={{ marginTop: 8 }}>
              {['gemini', 'openai'].map((e) => (
                <button key={e} className={liveSource === e ? 'on' : ''} onClick={() => flipEngine(e)}>
                  {e === 'gemini' ? 'Gemini (GCP)' : 'OpenAI · backup'}
                </button>
              ))}
            </div>
            <div className="bk-hint">
              {switchMsg
                ? <span className={/fail|error|token/i.test(switchMsg) ? 'warn' : ''}>{switchMsg}</span>
                : <span>Flips the Captions tab for <b>all guests</b>, instantly. <b>Gemini</b> is the main engine; OpenAI is the backup.</span>}
            </div>
            <div className="bk-live"><span className="k">Now live:</span> <code>{(liveSource || '—').toUpperCase()}</code></div>
            <button className="bk-btn ghost" style={{ marginTop: 8 }} onClick={clearCaptions}>Clear caption history</button>
          </section>
          )}

          {/* Caption context: style notes, glossary, pitch scripts */}
          {captionsWorker && (
          <section className="bk-section">
            <label className="bk-label">Caption context <span className="bk-muted">what the AI reads before it captions</span></label>
            <CaptionContext worker={captionsWorker} token={adminToken.trim()} onStage={ctxOnStage} onLoaded={setCtxOnStage}/>
          </section>
          )}

          {/* Event phase */}
          <section className="bk-section">
            <label className="bk-label">Event phase</label>
            <div className="bk-seg">
              {phases.map(p => (
                <button key={p.value}
                  className={stage.phase === p.value ? 'on' : ''}
                  onClick={() => setStage({ phase: p.value })}>{p.label}</button>
              ))}
            </div>
            <div className="bk-hint">Controls the “Now on stage” takeover. <b>Before</b> = doors-open card · <b>On Air</b> = live team · <b>Cocktail</b> = networking.</div>
          </section>

          {/* Currently pitching */}
          <section className="bk-section">
            <label className="bk-label">Currently pitching {stage.phase !== 'live' && <span className="bk-muted">(active in On Air)</span>}</label>
            <select
              className="bk-input"
              value={stage.liveTeamId}
              disabled={stage.phase !== 'live'}
              onChange={(e) => setLive(e.target.value)}>
              <option value="OFF_AIR">— Off air / break —</option>
              {stageOrder().map(t => (
                <option key={t.id} value={t.id}>
                  {String(t.speakerOrder).padStart(2,'0')} · {t.name} ({t.batch})
                </option>
              ))}
            </select>
            <div className="bk-stepper">
              <button className="bk-btn" disabled={stage.phase !== 'live'} onClick={() => stepLive(-1, stage, setLive)}>← Prev</button>
              <button className="bk-btn" disabled={stage.phase !== 'live'} onClick={() => stepLive(1, stage, setLive)}>Next →</button>
              <button className="bk-btn" disabled={stage.phase !== 'live'} onClick={() => setLive('OFF_AIR')}>Off air</button>
            </div>
            {captionsWorker && (
              <div className="bk-hint">
                {stageSyncMsg ? <span className="warn">{stageSyncMsg}</span>
                  : <span>Also sets the caption context to that team's script (now: <b>{(stageOrder().find((t) => t.id === ctxOnStage) || {}).name || 'none'}</b>).</span>}
              </div>
            )}
          </section>
        </div>

        <div className="bk-foot">
          <button className="bk-btn ghost" onClick={reset}>Reset to defaults</button>
          <span className="bk-kbd">⌘/Ctrl + Shift + B to toggle</span>
        </div>
      </div>
    </div>
  );
}
window.Backstage = Backstage;

// Advance / rewind the live team in stage order (AW → WA → CPD, then pitch
// order). setLive(id) updates the page state and the caption context.
function stepLive(dir, stage, setLive) {
  const ordered = stageOrder();
  const idx = ordered.findIndex(t => t.id === stage.liveTeamId);
  let next;
  if (idx === -1) {
    next = dir > 0 ? ordered[0] : ordered[ordered.length - 1];
  } else {
    const ni = idx + dir;
    if (ni < 0 || ni >= ordered.length) { setLive('OFF_AIR'); return; }
    next = ordered[ni];
  }
  setLive(next.id);
}
