import { useId, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

function FeatureAccordion({ cards, icons }) {
  const baseId = useId();
  const [openId, setOpenId] = useState(cards[0]?.id ?? null);

  return (
    <div className="home-feature__accordion">
      {cards.map((card) => {
        const isOpen = openId === card.id;
        const panelId = `${baseId}-${card.id}-panel`;
        const buttonId = `${baseId}-${card.id}-trigger`;

        return (
          <div
            key={card.id}
            className={`home-feature__accordion-item${isOpen ? ' is-open' : ''}`}
          >
            <h3 className="home-feature__accordion-heading">
              <button
                id={buttonId}
                type="button"
                className="home-feature__accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : card.id)}
              >
                <span className="home-feature__card-icon" aria-hidden="true">
                  <img src={icons[card.icon]} alt="" />
                </span>
                <span className="home-feature__accordion-title">{card.title}</span>
                <span className="home-feature__accordion-chevron" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="home-feature__accordion-panel"
            >
              <p className="home-feature__card-description">{card.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function HomeFeatureBlock({
  id,
  className = '',
  copy,
  cards,
  icons,
  image,
  imageAlt,
}) {
  const titleId = `${id}-title`;

  return (
    <section className={`home-feature ${className}`.trim()} aria-labelledby={titleId}>
      <div className="home-shell">
        <Reveal className="home-section-header">
          <p className="home-section-header__eyebrow">{copy.eyebrow}</p>
          <h2 id={titleId} className="home-section-header__title">
            {copy.title}
          </h2>
          <p className="home-section-header__description">{copy.description}</p>

          {copy.cta ? (
            <div className="home-feature__cta">
              <Button as={NavLink} to={copy.cta.to} variant="brand">
                {copy.cta.label}
              </Button>
            </div>
          ) : null}
        </Reveal>

        <Reveal className="home-feature__media" y={32}>
          <img
            className="home-feature__image"
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <div className="home-feature__cards">
          {cards.map((card, index) => (
            <Reveal key={card.id} className="home-feature__card" delay={0.12 * index} y={22}>
              <span className="home-feature__card-icon" aria-hidden="true">
                <img src={icons[card.icon]} alt="" loading="lazy" decoding="async" />
              </span>
              <h3 className="home-feature__card-title">{card.title}</h3>
              <p className="home-feature__card-description">{card.description}</p>
            </Reveal>
          ))}
        </div>

        <FeatureAccordion cards={cards} icons={icons} />
      </div>
    </section>
  );
}
