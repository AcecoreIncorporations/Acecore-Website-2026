import { useState } from 'react';
import Reveal from '../ui/Reveal';
import {
  productPowercoreAppCopy,
  productPowercoreAppFeatures,
} from '../../data/product';
import phoneImage from '../../assets/images/product/phone.svg';

function AppFeatureStatic({ title, description }) {
  return (
    <article className="powercore-app__feature">
      <h3 className="powercore-app__feature-title">{title}</h3>
      <p className="powercore-app__feature-description">{description}</p>
    </article>
  );
}

function AppFeatureAccordion({ id, title, description, isOpen, onToggle }) {
  return (
    <article
      className={`powercore-app__feature powercore-app__feature--accordion${isOpen ? ' is-open' : ''}`}
    >
      <button
        type="button"
        className="powercore-app__feature-trigger"
        aria-expanded={isOpen}
        aria-controls={`powercore-feature-${id}`}
        onClick={() => onToggle(id)}
      >
        <h3 className="powercore-app__feature-title">{title}</h3>
        <span className="powercore-app__feature-chevron" aria-hidden="true" />
      </button>
      <div
        id={`powercore-feature-${id}`}
        className="powercore-app__feature-panel"
        role="region"
      >
        <div className="powercore-app__feature-panel-inner">
          <p className="powercore-app__feature-description">{description}</p>
        </div>
      </div>
    </article>
  );
}

export default function ProductPowercoreApp() {
  const [openId, setOpenId] = useState(null);

  const leftFeatures = productPowercoreAppFeatures.filter(
    (feature) => feature.side === 'left',
  );
  const rightFeatures = productPowercoreAppFeatures.filter(
    (feature) => feature.side === 'right',
  );
  // Shared order for tablet/mobile: Monitoring → Data Usage → Remote → Historical
  const stackedFeatures = [
    productPowercoreAppFeatures[0],
    productPowercoreAppFeatures[2],
    productPowercoreAppFeatures[1],
    productPowercoreAppFeatures[3],
  ];

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="productPowercoreApp"
      className="powercore-app"
      aria-labelledby="powercore-app-title"
    >
      <div className="powercore-app__inner home-shell">
        <Reveal className="powercore-app__header">
          <p className="powercore-app__eyebrow">{productPowercoreAppCopy.eyebrow}</p>
          <h2 id="powercore-app-title" className="powercore-app__title">
            {productPowercoreAppCopy.title}
          </h2>
          <p className="powercore-app__description">
            {productPowercoreAppCopy.description}
          </p>
        </Reveal>

        <Reveal className="powercore-app__showcase" y={28} delay={0.12}>
          <div className="powercore-app__features powercore-app__features--left">
            {leftFeatures.map((feature) => (
              <AppFeatureStatic key={feature.id} {...feature} />
            ))}
          </div>

          <div className="powercore-app__phone">
            <img
              className="powercore-app__phone-image"
              src={phoneImage}
              width={437}
              height={901}
              alt="Acecore PowerCore app on a phone showing Powercell status, battery level, and controls"
            />
          </div>

          <div className="powercore-app__features powercore-app__features--right">
            {rightFeatures.map((feature) => (
              <AppFeatureStatic key={feature.id} {...feature} />
            ))}
          </div>
        </Reveal>

        <Reveal className="powercore-app__features-tablet" y={20} delay={0.32}>
          {stackedFeatures.map((feature) => (
            <AppFeatureStatic key={`tablet-${feature.id}`} {...feature} />
          ))}
        </Reveal>

        <Reveal className="powercore-app__features-mobile" y={20} delay={0.32}>
          {stackedFeatures.map((feature) => (
            <AppFeatureAccordion
              key={`mobile-${feature.id}`}
              {...feature}
              isOpen={openId === feature.id}
              onToggle={handleToggle}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
