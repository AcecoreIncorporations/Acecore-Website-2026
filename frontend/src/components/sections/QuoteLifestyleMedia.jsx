import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import previewPoster from '../../assets/images/pricing/reqQoute-img.png';
import { requestQuoteCopy } from '../../data/requestQuote';

/** Same in-view autoplay pattern as HomeLifestyle. */
export default function QuoteLifestyleMedia({ className = '' }) {
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
      // Autoplay can fail; poster remains visible.
    });
  }, [inView, reduceMotion]);

  return (
    <div className={`request-quote__media ${className}`.trim()}>
      {reduceMotion ? (
        <img
          className="request-quote__image"
          src={previewPoster}
          alt="Acecore Powercell installed in a modern living room"
          width={1600}
          height={900}
          loading="lazy"
        />
      ) : (
        <video
          ref={videoRef}
          className="request-quote__video"
          poster={previewPoster}
          muted
          loop
          playsInline
          preload={inView ? 'auto' : 'none'}
          controls={false}
          aria-label="Acecore Powercell in a modern living room"
        >
          {inView ? (
            <source src={requestQuoteCopy.videoSrc} type="video/mp4" />
          ) : null}
        </video>
      )}
    </div>
  );
}
