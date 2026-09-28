import { useState } from 'react';
import Reveal from '../ui/Reveal';
import {
  powerCapabilitiesCopy,
  powerCapabilityModels,
} from '../../data/powerCapabilities';

function CapabilityRow({ name, power, runtime }) {
  return (
    <li className="power-cap__row">
      <span className="power-cap__marker" aria-hidden="true" />
      <div className="power-cap__info">
        <span className="power-cap__name">{name}</span>
        <span className="power-cap__power">({power})</span>
      </div>
      <span className="power-cap__runtime">{runtime}</span>
    </li>
  );
}

function CapabilityBody({ model }) {
  return (
    <>
      <div className="power-cap-card__body">
        <p className="power-cap-card__label">CAN POWER</p>
        <ul className="power-cap__list">
          {model.appliances.map((item) => (
            <CapabilityRow key={item.name} {...item} />
          ))}
        </ul>
      </div>

      <div
        className={`power-cap-card__best${model.accent === 'accent' ? ' power-cap-card__best--accent' : ''}`}
      >
        <p className="power-cap-card__best-label">Best for</p>
        <p className="power-cap-card__best-text">{model.bestFor}</p>
      </div>
    </>
  );
}

function PowerCapabilityCard({ model }) {
  const isFeatured = model.id === 'powercell-prime';

  return (
    <article className={`power-cap-card${isFeatured ? ' power-cap-card--featured' : ''}`}>
      <header className="power-cap-card__header">
        <h3 className="power-cap-card__title">{model.name}</h3>
        <p className="power-cap-card__description">{model.description}</p>
      </header>
      <CapabilityBody model={model} />
    </article>
  );
}

function PowerCapabilityAccordion({ model, isOpen, onToggle }) {
  const panelId = `power-cap-panel-${model.id}`;
  const isFeatured = model.id === 'powercell-prime';

  return (
    <article
      className={`power-cap-card power-cap-card--accordion${isOpen ? ' is-open' : ''}${isFeatured ? ' power-cap-card--featured' : ''}`}
    >
      <button
        type="button"
        className="power-cap-card__trigger"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(model.id)}
      >
        <span className="power-cap-card__trigger-copy">
          <h3 className="power-cap-card__title">{model.name}</h3>
          <p className="power-cap-card__description">{model.description}</p>
        </span>
        <span className="power-cap-card__chevron" aria-hidden="true" />
      </button>

      <div id={panelId} className="power-cap-card__panel">
        <div className="power-cap-card__panel-inner">
          <CapabilityBody model={model} />
        </div>
      </div>
    </article>
  );
}

export default function PowerCapabilitiesSection() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="power-cap" aria-labelledby="power-cap-title">
      <div className="power-cap__inner home-shell">
        <Reveal className="power-cap__intro">
          <p className="power-cap__eyebrow">{powerCapabilitiesCopy.eyebrow}</p>
          <h2 id="power-cap-title" className="power-cap__title">
            {powerCapabilitiesCopy.title}
          </h2>
          <p className="power-cap__description">{powerCapabilitiesCopy.description}</p>
        </Reveal>

        <Reveal className="power-cap__grid power-cap__grid--desktop" y={28} delay={0.12}>
          {powerCapabilityModels.map((model) => (
            <PowerCapabilityCard key={model.id} model={model} />
          ))}
        </Reveal>

        <Reveal className="power-cap__grid power-cap__grid--mobile" y={20} delay={0.12}>
          {powerCapabilityModels.map((model) => (
            <PowerCapabilityAccordion
              key={`mobile-${model.id}`}
              model={model}
              isOpen={openId === model.id}
              onToggle={handleToggle}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
