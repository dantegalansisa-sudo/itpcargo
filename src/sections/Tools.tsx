import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import MagneticButton from '../components/MagneticButton';
import { wa } from '../data';
import { EASINGS, fadeUp } from '../utils/easings';

type Tab = 'track' | 'quote';

const ORIGINS = ['China', 'Estados Unidos', 'Europa', 'Otro origen'];
const MODES = ['Marítimo', 'Aéreo', 'Terrestre (nacional)'];
const LOADS = ['Carga consolidada (LCL)', 'Contenedor completo (FCL)', 'Carga suelta / paquetes'];

// Tiempos de tránsito referenciales para la demo
const TRANSIT: Record<string, Record<string, string>> = {
  China: { 'Marítimo': '35–45 días', 'Aéreo': '7–12 días' },
  'Estados Unidos': { 'Marítimo': '7–12 días', 'Aéreo': '3–5 días' },
  Europa: { 'Marítimo': '18–25 días', 'Aéreo': '5–8 días' },
};

const TRACK_STAGES = [
  { label: 'Recogido en origen', place: 'Shenzhen, China' },
  { label: 'Consolidado y embarcado', place: 'Puerto de Yantian' },
  { label: 'En tránsito marítimo', place: 'Océano Pacífico · Canal de Panamá' },
  { label: 'Arribo y despacho aduanero', place: 'Puerto Caucedo, RD' },
  { label: 'Entregado en almacén', place: 'Santo Domingo, RD' },
];

function stageFor(code: string) {
  let h = 0;
  for (const c of code) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return 1 + (h % 5); // entre 1 y 5 etapas completadas
}

export default function Tools({ trackCode, nonce }: { trackCode: string; nonce: number }) {
  const [tab, setTab] = useState<Tab>('track');
  const [code, setCode] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [q, setQ] = useState({ origin: 'China', mode: 'Marítimo', load: LOADS[0], product: '', name: '' });

  const runTrack = (c: string) => {
    const v = c.trim().toUpperCase() || 'ITP-48213';
    setCode(v);
    setTab('track');
    setLoading(true);
    setResult(null);
    window.setTimeout(() => { setLoading(false); setResult(v); }, 1100);
  };

  useEffect(() => {
    if (nonce > 0) runTrack(trackCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce]);

  const done = useMemo(() => (result ? stageFor(result) : 0), [result]);
  const transit = TRANSIT[q.origin]?.[q.mode];

  const quoteMsg =
    `Hola ITP Cargo, quiero cotizar un envío:\n` +
    `• Origen: ${q.origin}\n• Modalidad: ${q.mode}\n• Tipo de carga: ${q.load}\n` +
    (q.product ? `• Producto: ${q.product}\n` : '') +
    (q.name ? `Mi nombre: ${q.name}` : '');

  return (
    <section className="tools" id="herramientas">
      <div className="section-head">
        <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Autoservicio
        </motion.span>
        <RevealText tag="h2" className="section-title" accent={[1, 2]}>
          Rastrea o cotiza tu envío
        </RevealText>
      </div>

      <motion.div
        className="tools__card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASINGS.premium }}
      >
        <div className="tabs" role="tablist">
          {(['track', 'quote'] as Tab[]).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? 'is-active' : ''} onClick={() => setTab(t)}>
              {tab === t && <motion.span layoutId="tab-pill" className="tabs__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="tabs__label"><Icon name={t === 'track' ? 'search' : 'calc'} size={17} /> {t === 'track' ? 'Rastrear' : 'Cotizar'}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'track' ? (
            <motion.div key="track" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <form className="field-row" onSubmit={(e) => { e.preventDefault(); runTrack(code); }}>
                <input className="field" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Número de guía o BL" aria-label="Número de guía" />
                <button className="btn btn--primary btn--sm" type="submit">Rastrear</button>
              </form>

              {loading && (
                <div className="track-loading">
                  <span className="spinner" /> Localizando su carga…
                </div>
              )}

              {result && (
                <motion.div className="track-result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="track-result__head">
                    <div>
                      <span className="muted">Envío</span>
                      <strong>{result}</strong>
                    </div>
                    <span className={`status ${done >= TRACK_STAGES.length ? 'status--ok' : ''}`}>{done >= TRACK_STAGES.length ? 'Entregado' : `En curso · etapa ${done + 1} de ${TRACK_STAGES.length}`}</span>
                  </div>
                  <div className="track-bar-progress"><motion.span initial={{ width: 0 }} animate={{ width: `${(done / TRACK_STAGES.length) * 100}%` }} transition={{ duration: 1.2, ease: EASINGS.premium }} /></div>
                  <ul className="track-steps">
                    {TRACK_STAGES.map((s, i) => (
                      <motion.li
                        key={s.label}
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
                  <p className="demo-note">Vista demo con datos ilustrativos. Se conectará al sistema de rastreo de ITP Cargo.</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div key="quote" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="quote">
                <label className="quote__label">Origen</label>
                <div className="seg">
                  {ORIGINS.map((o) => (
                    <button key={o} className={q.origin === o ? 'is-on' : ''} onClick={() => setQ({ ...q, origin: o })}>{o}</button>
                  ))}
                </div>
                <label className="quote__label">Modalidad</label>
                <div className="seg">
                  {MODES.map((o) => (
                    <button key={o} className={q.mode === o ? 'is-on' : ''} onClick={() => setQ({ ...q, mode: o })}>{o}</button>
                  ))}
                </div>
                <label className="quote__label" htmlFor="q-load">Tipo de carga</label>
                <select id="q-load" className="field" value={q.load} onChange={(e) => setQ({ ...q, load: e.target.value })}>
                  {LOADS.map((l) => <option key={l}>{l}</option>)}
                </select>
                <label className="quote__label" htmlFor="q-prod">¿Qué va a importar?</label>
                <input id="q-prod" className="field" placeholder="Ej. aires acondicionados, cerámica…" value={q.product} onChange={(e) => setQ({ ...q, product: e.target.value })} />
                <label className="quote__label" htmlFor="q-name">Su nombre o empresa</label>
                <input id="q-name" className="field" placeholder="Opcional" value={q.name} onChange={(e) => setQ({ ...q, name: e.target.value })} />

                <AnimatePresence>
                  {transit && (
                    <motion.div className="quote__transit" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <Icon name="clock" size={18} />
                      <span>Tránsito estimado {q.origin} → RD: <strong>{transit}</strong></span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <MagneticButton href={wa(quoteMsg)} external className="btn btn--primary btn--block">
                  <Icon name="whatsapp" size={19} /> Enviar cotización por WhatsApp
                </MagneticButton>
                <p className="demo-note">Tiempos referenciales. Le confirmamos tarifa y fecha exacta.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
