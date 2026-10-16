import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Icon from './Icon';
import { WA_DEFAULT } from '../data';

export default function FloatingCTA() {
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => {
    const nearEnd = scrollYProgress.get() > 0.94;
    setShow(v > 650 && !nearEnd);
  });

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <AnimatePresence>
        {show && (
          <motion.a
            href={WA_DEFAULT}
            target="_blank"
            rel="noreferrer"
            className="wa-fab"
            aria-label="Escríbenos por WhatsApp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon name="whatsapp" size={26} stroke={1.8} />
            <span className="wa-fab__ping" />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
