import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import MagneticButton from '../components/MagneticButton';
import TrackPanel from '../components/TrackPanel';
import { wa } from '../data';
import { useLang } from '../i18n';
import { EASINGS, fadeUp } from '../utils/easings';

type Tab = 'track' | 'quote';

// Tiempos de tránsito referenciales para la demo — [origen][modalidad], índices de i18n
// origen: 0 China, 1 USA, 2 Europa · modalidad: 0 marítimo, 1 aéreo
const TRANSIT: (string | null)[][] = [
  ['35–45', '7–12'],
  ['7–12', '3–5'],
  ['18–25', '5–8'],
];

export default function Tools({ trackCode, nonce }: { trackCode: string; nonce: number }) {
  const { t } = useLang();
  const tl = t.tools;
  const [tab, setTab] = useState<Tab>('track');

  const [q, setQ] = useState({ origin: 0, mode: 0, load: 0, product: '', name: '' });

  useEffect(() => {
    if (nonce > 0) setTab('track');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce]);

  const transit = TRANSIT[q.origin]?.[q.mode] ?? null;

  const quoteMsg = tl.msg(tl.origins[q.origin], tl.modes[q.mode], tl.loads[q.load], q.product, q.name);

  return (
    <section className="tools" id="herramientas">
      <div className="section-head">
        <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {tl.eyebrow}
        </motion.span>
        <RevealText tag="h2" className="section-title" accent={tl.accent}>
          {tl.title}
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
          {(['track', 'quote'] as Tab[]).map((k, i) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'is-active' : ''} onClick={() => setTab(k)}>
              {tab === k && <motion.span layoutId="tab-pill" className="tabs__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span className="tabs__label"><Icon name={k === 'track' ? 'search' : 'calc'} size={17} /> {tl.tabs[i]}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === 'track' ? (
            <motion.div key="track" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <TrackPanel request={{ code: trackCode, nonce }} />
            </motion.div>
          ) : (
            <motion.div key="quote" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              <div className="quote">
                <label className="quote__label">{tl.origin}</label>
                <div className="seg">
                  {tl.origins.map((o, i) => (
                    <button key={i} className={q.origin === i ? 'is-on' : ''} onClick={() => setQ({ ...q, origin: i })}>{o}</button>
                  ))}
                </div>
                <label className="quote__label">{tl.mode}</label>
                <div className="seg">
                  {tl.modes.map((o, i) => (
                    <button key={i} className={q.mode === i ? 'is-on' : ''} onClick={() => setQ({ ...q, mode: i })}>{o}</button>
                  ))}
                </div>
                <label className="quote__label" htmlFor="q-load">{tl.load}</label>
                <select id="q-load" className="field" value={q.load} onChange={(e) => setQ({ ...q, load: Number(e.target.value) })}>
                  {tl.loads.map((l, i) => <option key={i} value={i}>{l}</option>)}
                </select>
                <label className="quote__label" htmlFor="q-prod">{tl.product}</label>
                <input id="q-prod" className="field" placeholder={tl.productPh} value={q.product} onChange={(e) => setQ({ ...q, product: e.target.value })} />
                <label className="quote__label" htmlFor="q-name">{tl.name}</label>
                <input id="q-name" className="field" placeholder={tl.namePh} value={q.name} onChange={(e) => setQ({ ...q, name: e.target.value })} />

                <AnimatePresence>
                  {transit && (
                    <motion.div className="quote__transit" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      <Icon name="clock" size={18} />
                      <span>{tl.transit} {tl.origins[q.origin]} → {tl.dest}: <strong>{transit} {tl.days}</strong></span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <MagneticButton href={wa(quoteMsg)} external className="btn btn--primary btn--block">
                  <Icon name="whatsapp" size={19} /> {tl.send}
                </MagneticButton>
                <p className="demo-note">{tl.quoteNote}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
