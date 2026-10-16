import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import Icon from '../components/Icon';
import { CONTACT, WA_DEFAULT } from '../data';

export default function Final() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const cy = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const cr = useTransform(scrollYProgress, [0, 1], [-10, 6]);

  return (
    <>
      <section className="final" ref={ref}>
        <motion.img src="/img/cta.webp" alt="" className="final__bg" style={{ y, scale: 1.3 }} aria-hidden="true" />
        <div className="final__overlay" />
        <div className="final__content">
          <span className="eyebrow eyebrow--dark">Cotiza hoy</span>
          <RevealText tag="h2" className="final__title" accent={[5, 6]}>
            Hagamos que tu próxima ruta sea un gran negocio
          </RevealText>
          <MagneticButton href={WA_DEFAULT} external className="btn btn--primary">
            Solicitar cotización <Icon name="arrow" size={18} stroke={2.2} />
          </MagneticButton>
        </div>
        <motion.img src="/img/container.webp" alt="" className="final__container" style={{ y: cy, rotate: cr }} aria-hidden="true" />
      </section>

      <footer className="footer" id="contacto">
        <img src="/img/logo-light.png" alt="ITP Cargo" className="footer__logo" loading="lazy" />
        <p className="footer__tag">Más de 28 años moviendo el comercio nacional. Desde la fábrica hasta su almacén.</p>

        <div className="footer__contact">
          <span className="footer__label">Contacto comercial</span>
          <strong>{CONTACT.name}</strong>
          <a href={WA_DEFAULT} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> {CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={18} /> {CONTACT.email}</a>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer"><Icon name="instagram" size={18} /> @itpcargo</a>
          <span className="footer__loc"><Icon name="pin" size={18} /> Santo Domingo, República Dominicana</span>
        </div>

        <div className="footer__cols">
          <div>
            <span className="footer__label">Servicios</span>
            <a href="#servicios">Marítimo</a><a href="#servicios">Aéreo</a><a href="#servicios">Terrestre</a>
            <a href="#servicios">Aduanas</a><a href="#servicios">Almacenaje</a>
          </div>
          <div>
            <span className="footer__label">Empresa</span>
            <a href="#nosotros">Nosotros</a><a href="#proceso">Cómo trabajamos</a><a href="#cobertura">Cobertura</a><a href="#herramientas">Rastreo</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} ITP Cargo · ITP Group DR</span>
          <a href="#top">Volver arriba ↑</a>
        </div>
      </footer>
    </>
  );
}
