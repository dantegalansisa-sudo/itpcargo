import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { STEPS } from '../data';
import { EASINGS, fadeUp } from '../utils/easings';

export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const prog = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const top = useTransform(prog, [0, 1], ['0%', '100%']);

  return (
    <section className="process" id="proceso">
      <div className="section-head">
        <motion.span className="eyebrow" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Cómo trabajamos
        </motion.span>
        <RevealText tag="h2" className="section-title" accent={[3, 4, 5, 6]} breaks={[2]}>
          Desde la fábrica hasta su almacén
        </RevealText>
        <motion.p className="section-sub" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          Un solo equipo coordina cada etapa. Usted se enfoca en vender; nosotros en que su carga llegue.
        </motion.p>
      </div>

      <ol className="timeline" ref={ref}>
        <div className="timeline__rail" aria-hidden="true">
          <motion.div className="timeline__fill" style={{ scaleY: prog }} />
          <motion.div className="timeline__runner" style={{ top }}>
            <img src="/img/container.webp" alt="" />
          </motion.div>
        </div>
        {STEPS.map((s, i) => (
          <motion.li
            key={s.title}
            className="step"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASINGS.premium }}
          >
            <span className="step__dot"><Icon name={s.icon} size={18} /></span>
            <div className="step__card">
              <span className="step__num">Paso 0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
