import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import AnimatedCounter from '../components/AnimatedCounter';
import Icon from '../components/Icon';
import { ROUTES, WA_DEFAULT } from '../data';
import { EASINGS, cardVariants, containerVariants, fadeUp } from '../utils/easings';
import { useParallax } from '../hooks/useParallax';

const STATS = [
  { n: 28, s: '+', label: 'Años de experiencia' },
  { n: 3, s: '', label: 'Continentes de origen' },
  { n: 4, s: '', label: 'Modalidades de transporte' },
  { n: 1, s: '', label: 'Aliado de punta a punta' },
];

export default function Story() {
  const big = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: big, offset: ['start end', 'end start'] });
  const bigX = useTransform(scrollYProgress, [0, 1], ['8%', '-18%']);
  const p1 = useParallax(30);

  return (
    <section className="story" id="nosotros-intro">
      <div className="marquee" aria-label="Rutas frecuentes">
        <div className="marquee__track">
          {[...ROUTES, ...ROUTES].map((r, i) => (
            <span key={i} className="marquee__item"><Icon name="route" size={16} /> {r}</span>
          ))}
        </div>
      </div>

      <div className="story__inner">
        <div className="story__big" ref={big} aria-hidden="true">
          <motion.span style={{ x: bigX }}>28 años moviendo el comercio nacional ·</motion.span>
        </div>

        <motion.span className="eyebrow eyebrow--dark" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Más que experiencia
        </motion.span>
        <RevealText tag="h2" className="story__title" accent={[0, 1]}>
          Una trayectoria de éxitos, carga tras carga
        </RevealText>

        <motion.div className="story__media" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div
            className="story__img story__img--a"
            ref={p1.ref}
            variants={{
              hidden: { clipPath: 'inset(0% 100% 0% 0%)' },
              visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.2, ease: EASINGS.premium } },
            }}
          >
            <motion.img src="/img/hero.webp" alt="Contenedor ITP Cargo en puerto al atardecer" style={{ y: p1.y, scale: 1.25 }} loading="lazy" />
          </motion.div>
          <motion.div
            className="story__badge"
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.4 }}
          >
            <strong>#1</strong>
            <span>Pioneros puerta a puerta en RD</span>
          </motion.div>
        </motion.div>

        <motion.p className="story__text" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          ITP Cargo es una empresa dominicana de transporte y logística con más de 28 años en el sector. Ofrecemos soluciones
          completas y personalizadas, respaldadas por un equipo altamente capacitado y una amplia red de socios estratégicos
          en todo el mundo.
        </motion.p>

        <div className="story__ctas">
          <MagneticButton href={WA_DEFAULT} external className="btn btn--primary">
            Solicitar cotización <Icon name="arrow" size={18} stroke={2.2} />
          </MagneticButton>
          <MagneticButton href="#nosotros" className="btn btn--ghost-dark">Conocer más</MagneticButton>
        </div>

        <motion.div
          className="stats"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {STATS.map((s) => (
            <motion.div className="stat" key={s.label} variants={cardVariants}>
              <strong><AnimatedCounter target={s.n} suffix={s.s} /></strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
