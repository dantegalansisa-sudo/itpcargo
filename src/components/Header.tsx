import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Icon from './Icon';
import { CONTACT, WA_DEFAULT } from '../data';
import { EASINGS } from '../utils/easings';

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#herramientas', label: 'Rastrear / Cotizar' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 24);
    setHidden(v > 420 && v > prev && !open);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.header
        className={`header ${scrolled ? 'is-scrolled' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.45, ease: EASINGS.smooth }}
      >
        <a href="#top" className="header__logo" aria-label="ITP Cargo — inicio">
          <img src="/img/logo.png" alt="ITP Cargo" width={600} height={278} />
        </a>
        <div className="header__actions">
          <a href={WA_DEFAULT} target="_blank" rel="noreferrer" className="header__cta">Cotizar</a>
          <button className="header__menu" aria-label="Abrir menú" onClick={() => setOpen(true)}>
            <Icon name="menu" size={22} stroke={2} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: EASINGS.premium }}
          >
            <div className="menu__top">
              <img src="/img/logo-light.png" alt="ITP Cargo" className="menu__logo" />
              <button className="header__menu header__menu--dark" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
                <Icon name="close" size={22} stroke={2} />
              </button>
            </div>
            <nav className="menu__nav">
              {LINKS.map((l, i) => (
                <div className="reveal-mask" key={l.href}>
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: EASINGS.premium }}
                  >
                    <span className="menu__num">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className="menu__contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a href={WA_DEFAULT} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> {CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`}><Icon name="mail" size={18} /> {CONTACT.email}</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
