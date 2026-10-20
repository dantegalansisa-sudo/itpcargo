import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue,
} from 'framer-motion';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import Icon from '../components/Icon';
import { wa } from '../data';
import { useLang } from '../i18n';
import { EASINGS, fadeUp } from '../utils/easings';

const VIDEOS = ['puerto', 'terminal', 'buque'];
const N = VIDEOS.length;

/**
 * Tarjeta de video apilada. `p` va de 0 a N-1 según el scroll: la tarjeta i entra desde
 * abajo mientras p va de i-1 a i, y luego retrocede (escala y se oscurece) cuando la
 * siguiente la cubre.
 */
function VideoCard({ i, p, active, caption, videoRef }: {
  i: number; p: MotionValue<number>; active: boolean; caption: string;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  const enter = [i - 1, i];
  const y = useTransform(p, [enter[0], enter[1], i + 1], i === 0 ? ['0%', '0%', '-5%'] : ['70%', '0%', '-5%']);
  // Invisible hasta que empieza a entrar: así no tapa el texto mientras espera su turno
  const opacity = useTransform(p, [i - 1, i - 0.55], i === 0 ? [1, 1] : [0, 1]);
  const rotate = useTransform(p, [enter[0], enter[1], i + 1], i === 0 ? [0, 0, -3] : [7, 0, -3]);
  const scale = useTransform(p, [i, i + 1], [1, 0.9]);
  const dim = useTransform(p, [i, i + 1], [0, 0.55]);

  return (
    <motion.div className="ops-card" style={{ y, rotate, scale, opacity, zIndex: i + 1 }}>
      <video
        ref={videoRef}
        src={`/video/${VIDEOS[i]}.mp4`}
        poster={`/video/${VIDEOS[i]}.jpg`}
        muted
        loop
        playsInline
        preload={i === 0 ? 'metadata' : 'none'}
        aria-label={caption}
      />
      <motion.span className="ops-card__dim" style={{ opacity: dim }} />
      <span className={`ops-card__cap ${active ? 'is-live' : ''}`}>
        <span className="ops-card__dot" /> 0{i + 1} · {caption}
      </span>
    </motion.div>
  );
}

export default function Operation() {
  const { t } = useLang();
  const o = t.ops;
  const track = useRef<HTMLDivElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.6 });
  // Tramo final sin cambios para que el último video se lea con calma
  const p = useTransform(smooth, [0, 0.82], [0, N - 1], { clamp: true });
  const bar = useTransform(smooth, [0, 0.82], [0, 1], { clamp: true });

  useMotionValueEvent(p, 'change', (v) => setActive(Math.min(N - 1, Math.max(0, Math.round(v)))));

  // Solo se reproduce el video visible, y solo si la sección está en pantalla
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (inView && i === active) {
        if (v.preload === 'none') v.preload = 'auto';
        v.play().catch(() => { /* autoplay bloqueado: queda el póster */ });
      } else {
        v.pause();
      }
    });
    // Precarga el siguiente para que la transición no se vea en negro
    const next = videos.current[active + 1];
    if (inView && next && next.preload === 'none') next.preload = 'auto';
  }, [active, inView]);

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * 0.82 * (i / (N - 1)) + 2, behavior: 'smooth' });
  };

  const step = o.steps[active];

  return (
    <section className="ops" id="operacion">
      <div className="ops__head">
        <motion.span className="eyebrow eyebrow--dark" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {o.eyebrow}
        </motion.span>
        <RevealText tag="h2" className="ops__title" accent={o.accent}>
          {o.title}
        </RevealText>
      </div>

      <div className="ops__track" ref={track}>
        <div className="ops__sticky">
          <div className="ops__stage">
            <div className="ops__media">
              <div className="ops__ghost ops__ghost--a" aria-hidden="true" />
              <div className="ops__ghost ops__ghost--b" aria-hidden="true" />
              {VIDEOS.map((_, i) => (
                <VideoCard
                  key={i}
                  i={i}
                  p={p}
                  active={i === active}
                  caption={o.captions[i]}
                  videoRef={(el) => { videos.current[i] = el; }}
                />
              ))}
            </div>

            <div className="ops__copy">
              <div className="ops__counter">
                <span><strong>0{active + 1}</strong> / 0{N}</span>
                <div className="ops__bar"><motion.span style={{ scaleX: bar }} /></div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active}-${step.label}`}
                  className={`ops__step ${active === N - 1 ? 'is-final' : ''}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: EASINGS.smooth }}
                >
                  <span className="ops__tag">{step.tag}</span>
                  <h3>{step.label}</h3>
                  <p>{step.text}</p>
                </motion.div>
              </AnimatePresence>

              <div className="ops__dots" role="tablist" aria-label={o.eyebrow}>
                {o.steps.map((s, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === active}
                    className={i === active ? 'is-on' : ''}
                    onClick={() => goTo(i)}
                  >
                    <span>0{i + 1}</span> {s.tag}
                  </button>
                ))}
              </div>

              <div className="ops__cta">
                <MagneticButton href={wa(t.wa.default)} external className="btn btn--primary">
                  {o.cta} <Icon name="arrow" size={18} stroke={2.2} />
                </MagneticButton>
              </div>
            </div>
          </div>
          <span className={`ops__hint ${active > 0 ? 'is-hidden' : ''}`}>{o.scroll} ↓</span>
        </div>
      </div>
    </section>
  );
}
