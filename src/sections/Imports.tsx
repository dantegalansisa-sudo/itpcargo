import { motion } from 'framer-motion';
import RevealText from '../components/RevealText';
import Icon from '../components/Icon';
import { IMPORTS, wa } from '../data';
import { cardVariants, containerVariants, fadeUp } from '../utils/easings';
import { useParallax } from '../hooks/useParallax';

export default function Imports() {
  const p = useParallax(40);
  return (
    <section className="imports">
      <div className="imports__card">
        <div className="imports__bg" ref={p.ref} aria-hidden="true">
          <motion.img src="/img/maritimo.webp" alt="" style={{ y: p.y, scale: 1.3 }} />
        </div>
        <div className="imports__content">
          <motion.span className="eyebrow eyebrow--dark" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Importa desde China
          </motion.span>
          <RevealText tag="h2" className="section-title section-title--light" accent={[4, 5]}>
            ¿Qué puedes importar con tarifas preferenciales?
          </RevealText>

          <motion.div
            className="imports__grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {IMPORTS.map((it) => (
              <motion.a
                key={it.title}
                className="import-chip"
                variants={cardVariants}
                href={wa(`Hola ITP Cargo, quiero importar ${it.title.toLowerCase()} desde China. ¿Me pueden cotizar?`)}
                target="_blank"
                rel="noreferrer"
                whileTap={{ scale: 0.95 }}
              >
                <span className="import-chip__icon"><Icon name={it.icon} size={22} /></span>
                <span>{it.title}</span>
                <Icon name="arrow" size={15} className="import-chip__arrow" />
              </motion.a>
            ))}
          </motion.div>
          <p className="imports__note">Toca una categoría y te cotizamos por WhatsApp.</p>
        </div>
      </div>
    </section>
  );
}
