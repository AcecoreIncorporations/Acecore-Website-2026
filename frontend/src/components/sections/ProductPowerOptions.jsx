import { useEffect, useRef } from 'react';
import Reveal from '../ui/Reveal';
import {
  productPowerOptionsCopy,
  productRuntimeOptions,
} from '../../data/product';
import powerOptsImage from '../../assets/images/product/powerOpts.png';
import homeRuntimeIcon from '../../assets/icons/product/home-runtime.svg';

export default function ProductPowerOptions() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const frame = scrollRef.current;
    if (!frame) return;

    const centerArtwork = () => {
      const maxScroll = frame.scrollWidth - frame.clientWidth;
      if (maxScroll <= 0) return;
      // Start on the center-left / Powercell area of the house
      frame.scrollLeft = maxScroll * 0.28;
    };

    centerArtwork();
    window.addEventListener('resize', centerArtwork);
    return () => window.removeEventListener('resize', centerArtwork);
  }, []);

  return (
    <section
      className="product-power-opts"
      aria-labelledby="product-power-opts-title"
    >
      <div className="product-power-opts__inner home-shell">
        <Reveal className="product-power-opts__header">
          <p className="product-power-opts__eyebrow">
            {productPowerOptionsCopy.eyebrow}
          </p>
          <h2 id="product-power-opts-title" className="product-power-opts__title">
            {productPowerOptionsCopy.title}
          </h2>
          <p className="product-power-opts__description">
            {productPowerOptionsCopy.description}
          </p>
        </Reveal>

        <Reveal className="product-power-opts__visual" y={28} delay={0.12}>
          <p className="product-power-opts__swipe-hint">
            {productPowerOptionsCopy.swipeHint}
          </p>
          <div className="product-power-opts__artwork-scroll" ref={scrollRef}>
            <img
              className="product-power-opts__artwork"
              src={powerOptsImage}
              width={1430}
              height={1156}
              alt="Diagram showing a Powercell supplying household appliances including air conditioner, refrigerator, washing machine, lighting, television, laptop and router."
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <Reveal className="product-power-opts__runtime" y={22} delay={0.18}>
          <p className="product-power-opts__runtime-label">
            {productPowerOptionsCopy.runtimeLabel}
          </p>

          <ul className="product-power-opts__runtime-grid">
            {productRuntimeOptions.map((option) => (
              <li key={option.id} className="product-power-opts__runtime-item">
                <img
                  className="product-power-opts__runtime-icon"
                  src={homeRuntimeIcon}
                  alt=""
                  aria-hidden="true"
                />
                <div className="product-power-opts__runtime-copy">
                  <p className="product-power-opts__runtime-title">{option.title}</p>
                  <p className="product-power-opts__runtime-desc">{option.description}</p>
                  <p className="product-power-opts__runtime-load">
                    Total Load: {option.load}
                  </p>
                </div>
                <div className="product-power-opts__runtime-meta">
                  <span className="product-power-opts__runtime-value">
                    {option.runtime}
                  </span>
                  <span className="product-power-opts__runtime-tag">RUNTIME</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
