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

const BACKSTAGE_KEY = 'dd32.backstage.v1';

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
  const [open, setOpen] = useBkState(() => {
    try { return window.location.hash.toLowerCase() === '#backstage'; } catch (e) { return false; }
  });
  useBkEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'B' || e.key === 'b')) {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onHash = () => {
      if (window.location.hash.toLowerCase() === '#backstage') setOpen(true);
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

function Backstage({ open, onClose, stage, setStage, reset }) {
  const [draftId, setDraftId] = useBkState(stage.sessionId);
  useBkEffect(() => { setDraftId(stage.sessionId); }, [stage.sessionId]);

  if (!open) return null;

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
              onChange={(e) => setStage({ liveTeamId: e.target.value })}>
              <option value="OFF_AIR">— Off air / break —</option>
              {TEAMS.map(t => (
                <option key={t.id} value={t.id}>
                  {String(t.speakerOrder).padStart(2,'0')} · {t.name} ({t.batch})
                </option>
              ))}
            </select>
            <div className="bk-stepper">
              <button className="bk-btn" disabled={stage.phase !== 'live'} onClick={() => stepLive(-1, stage, setStage)}>← Prev</button>
              <button className="bk-btn" disabled={stage.phase !== 'live'} onClick={() => stepLive(1, stage, setStage)}>Next →</button>
              <button className="bk-btn" disabled={stage.phase !== 'live'} onClick={() => setStage({ liveTeamId: 'OFF_AIR' })}>Off air</button>
            </div>
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

// Advance / rewind the live team by pitch order.
function stepLive(dir, stage, setStage) {
  const ordered = [...TEAMS].sort((a,b) => a.speakerOrder - b.speakerOrder);
  const idx = ordered.findIndex(t => t.id === stage.liveTeamId);
  let next;
  if (idx === -1) {
    next = dir > 0 ? ordered[0] : ordered[ordered.length - 1];
  } else {
    const ni = idx + dir;
    if (ni < 0 || ni >= ordered.length) { setStage({ liveTeamId: 'OFF_AIR' }); return; }
    next = ordered[ni];
  }
  setStage({ liveTeamId: next.id });
}
