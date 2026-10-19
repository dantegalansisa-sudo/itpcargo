import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';
import {
  CARRIERS, GLOBAL_TRACKERS, CONTAINER_RE, AWB_RE, containerCheckOk, detectCarrier, detectKind, wa, type TrackKind,
} from '../data';
import { useLang } from '../i18n';
import { EASINGS } from '../utils/easings';

const KINDS: TrackKind[] = ['itp', 'container', 'air'];
const KIND_ICONS = { itp: 'boxes', container: 'ship', air: 'plane' } as const;

function stageFor(code: string) {
  let h = 0;
  for (const c of code) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return 1 + (h % 5); // entre 1 y 5 etapas completadas
}

async function copy(text: string) {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
}

/**
 * Rastreo en tres modalidades:
 *  - itp: carga consolidada con el código interno de ITP (demo hasta conectar su sistema)
 *  - container: contenedor FCL en la web oficial de la naviera (detectada por prefijo)
 *  - air: guía aérea en un rastreador global
 */
export default function TrackPanel({ request }: { request: { code: string; nonce: number } }) {
  const { t } = useLang();
  const tl = t.tools;
  const [kind, setKind] = useState<TrackKind>('itp');
  const [code, setCode] = useState('');
  const [carrierId, setCarrierId] = useState<string>('auto');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const norm = code.trim().toUpperCase().replace(/\s+/g, '');
  const detected = kind === 'container' ? detectCarrier(norm) : undefined;
  const carrier = carrierId === 'auto' ? detected : CARRIERS.find((c) => c.id === carrierId);
  const checkWarn = kind === 'container' && CONTAINER_RE.test(norm) && !containerCheckOk(norm);

  const runItp = (v: string) => {
    setLoading(true);
    setResult(null);
    window.setTimeout(() => { setLoading(false); setResult(v); }, 1100);
  };

  // Búsqueda desde el hero: se detecta el tipo de número y se ejecuta directo
  useEffect(() => {
    if (request.nonce === 0) return;
    const k = detectKind(request.code);
    setKind(k);
    setCode(request.code.trim().toUpperCase());
    setCarrierId('auto');
    setNotice(null);
    setError(null);
    setResult(null);
    if (k === 'itp') runItp(request.code.trim().toUpperCase() || 'ITP-48213');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request.nonce]);

  const switchKind = (k: TrackKind) => {
    setKind(k); setResult(null); setNotice(null); setError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(null);
    setError(null);
    if (kind === 'itp') return runItp(norm || 'ITP-48213');
    if (!norm) return setError(tl.needNumber);

    const url = kind === 'air'
      ? GLOBAL_TRACKERS.air
      : carrier ? carrier.url(norm) : GLOBAL_TRACKERS.container;
    // Se abre en el mismo gesto del usuario para que el navegador no lo bloquee
    window.open(url, '_blank', 'noopener');
    const value = kind === 'air' ? code.trim() : norm;
    if (await copy(value)) setNotice(tl.copied);
  };

  const stages = tl.stages;
  const done = useMemo(() => (result ? stageFor(result) : 0), [result]);
  const kindIdx = KINDS.indexOf(kind);
  const placeholder = kind === 'itp' ? tl.itpPh : kind === 'container' ? tl.containerPh : tl.awbPh;
  const buttonLabel = kind === 'itp'
    ? tl.trackBtn
    : kind === 'air' ? tl.openAir : carrier ? tl.openCarrier(carrier.name) : tl.openGlobal;

  return (
    <div className="track">
      <div className="track-kinds" role="radiogroup" aria-label={tl.tabs[0]}>
        {KINDS.map((k, i) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={kind === k}
            className={kind === k ? 'is-on' : ''}
            onClick={() => switchKind(k)}
          >
            <Icon name={KIND_ICONS[k]} size={16} /> {tl.trackModes[i]}
          </button>
        ))}
      </div>
      <p className="track-hint">{tl.modeHints[kindIdx]}</p>

      <form className="track-form" onSubmit={submit}>
        <input
          className="field"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(null); setNotice(null); }}
          placeholder={placeholder}
          aria-label={placeholder}
          autoCapitalize="characters"
          spellCheck={false}
        />

        {kind === 'container' && (
          <div className="track-carrier">
            <label htmlFor="t-carrier">{tl.carrier}</label>
            <select id="t-carrier" className="field" value={carrierId} onChange={(e) => setCarrierId(e.target.value)}>
              <option value="auto">{detected ? `${detected.name} ✓` : tl.otherCarrier}</option>
              {CARRIERS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {detected && carrierId === 'auto' && <span className="track-ok"><Icon name="check" size={13} stroke={3} /> {tl.detected(detected.name)}</span>}
            {checkWarn && <span className="track-warn">{tl.badCheck}</span>}
          </div>
        )}

        <button className="btn btn--primary btn--block" type="submit">
          {buttonLabel} <Icon name={kind === 'itp' ? 'search' : 'arrow'} size={18} stroke={2.2} />
        </button>
      </form>

      {kind === 'container' && !carrier && <p className="track-sub">{tl.globalHint}</p>}
      {kind === 'air' && <p className="track-sub">{tl.airHint}</p>}
      {kind === 'air' && code && !AWB_RE.test(code.trim()) && <p className="track-warn">{tl.awbPh}</p>}

      <AnimatePresence>
        {(notice || error) && (
          <motion.p
            className={`track-notice ${error ? 'is-error' : ''}`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Icon name={error ? 'plus' : 'check'} size={15} /> {error ?? notice}
          </motion.p>
        )}
      </AnimatePresence>

      {kind === 'itp' && loading && (
        <div className="track-loading">
          <span className="spinner" /> {tl.loading}
        </div>
      )}

      {kind === 'itp' && result && (
        <motion.div className="track-result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="track-result__head">
            <div>
              <span className="muted">{tl.shipment}</span>
              <strong>{result}</strong>
            </div>
            <span className={`status ${done >= stages.length ? 'status--ok' : ''}`}>
              {done >= stages.length ? tl.delivered : tl.inProgress(done + 1, stages.length)}
            </span>
          </div>
          <div className="track-bar-progress">
            <motion.span initial={{ width: 0 }} animate={{ width: `${(done / stages.length) * 100}%` }} transition={{ duration: 1.2, ease: EASINGS.premium }} />
          </div>
          <ul className="track-steps">
            {stages.map((s, i) => (
              <motion.li
                key={i}
                className={i < done ? 'is-done' : i === done ? 'is-current' : ''}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
              >
                <span className="track-steps__dot">{i < done ? <Icon name="check" size={12} stroke={3} /> : null}</span>
                <div><strong>{s.label}</strong><span>{s.place}</span></div>
              </motion.li>
            ))}
          </ul>
          <a className="btn btn--ghost btn--block track-ask" href={wa(tl.askMsg(result))} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={18} /> {tl.askStatus}
          </a>
          <p className="demo-note">{tl.trackNote}</p>
        </motion.div>
      )}
    </div>
  );
}
