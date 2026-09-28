import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import Reveal from '../ui/Reveal';
import lifestylePoster from '../../assets/images/home/homeframe.png';

const LIFESTYLE_VIDEO_SRC =
  'https://res.cloudinary.com/dznd7vzlb/video/upload/q_auto,f_auto/v1788784782/Website_Section_hh2bfc.mp4';

export default function HomeLifestyle() {
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || reduceMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.15 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !inView || reduceMotion) return;

    node.play().catch(() => {
      // Autoplay can still fail on some browsers; poster remains visible.
    });
  }, [inView, reduceMotion]);

  return (
    <section className="home-lifestyle" aria-label="Acecore in the home">
      <Reveal className="home-lifestyle__frame" y={36}>
        {reduceMotion ? (
          <img
            className="home-lifestyle__image"
            src={lifestylePoster}
            alt="Acecore Powercell installed in a modern living room beside a fireplace"
            width={2400}
            height={1350}
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            className="home-lifestyle__video"
            poster={lifestylePoster}
            muted
            loop
            playsInline
            preload={inView ? 'auto' : 'none'}
            controls={false}
            aria-label="Acecore Powercell in a modern living room"
          >
            {inView ? <source src={LIFESTYLE_VIDEO_SRC} type="video/mp4" /> : null}
          </video>
        )}
      </Reveal>
    </section>
  );
}
