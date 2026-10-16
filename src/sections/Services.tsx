import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { SERVICES, wa } from '../data';
import { cardVariants, containerVariants, fadeUp } from '../utils/easings';

export default function Services() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 200, damping: 30 });

  const onScroll = () => {
    const el = track.current!;
    const max = el.scrollWidth - el.clientWidth;
    progress.set(max > 0 ? el.scrollLeft / max : 0);
    const card = el.firstElementChild as HTMLElement | null;
    if (card) setActive(Math.round(el.scrollLeft / (card.offsetWidth + 14)));
  };

  const go = (dir: 1 | -1) => {
    const el = track.current!;
    const card = el.firstElementChild as HTMLElement;
    el.scrollBy({ left: dir * (card.offsetWidth + 14), behavior: 'smooth' });
  };

  return (
    <section className="services" id="servicios">
      <div className="section-head">
        <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Nuestros servicios
        </motion.span>
        <RevealText tag="h2" className="section-title" accent={[3]}>
          Soluciones para cada ruta de tu negocio
        </RevealText>
        <div className="services__nav">
          <span className="services__count">
            <strong>0{Math.min(active + 1, SERVICES.length)}</strong> / 0{SERVICES.length}
          </span>
          <div>
            <button aria-label="Anterior" onClick={() => go(-1)} className="round-btn round-btn--flip"><Icon name="arrow" size={18} /></button>
            <button aria-label="Siguiente" onClick={() => go(1)} className="round-btn"><Icon name="arrow" size={18} /></button>
          </div>
        </div>
      </div>

      <motion.div
        className="services__track"
        ref={track}
        onScroll={onScroll}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {SERVICES.map((s, i) => (
          <motion.article className="service-card" key={s.id} variants={cardVariants}>
            <div className="service-card__media">
              <img src={s.img} alt={s.title} loading="lazy" />
              <span className="service-card__num">0{i + 1}</span>
              <span className="service-card__icon"><Icon name={s.icon} size={22} /></span>
            </div>
            <div className="service-card__body">
              <span className="service-card__kicker">{s.kicker}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul>
                {s.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <a
                className="service-card__link"
                href={wa(`Hola ITP Cargo, me interesa el servicio de ${s.title.toLowerCase()}.`)}
                target="_blank"
                rel="noreferrer"
              >
                Cotizar este servicio <Icon name="arrow" size={16} stroke={2.2} />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <div className="services__progress"><motion.span style={{ scaleX: smooth }} /></div>
    </section>
  );
}
