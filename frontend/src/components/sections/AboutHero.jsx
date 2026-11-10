import { useState } from 'react';
import Reveal from '../ui/Reveal';
import { aboutHeroCopy, aboutPrinciples } from '../../data/about';
import heroImage from '../../assets/images/about/hero-img.png';

function PrincipleItem({ index, title, description }) {
  return (
    <>
      <div className="about-principles__heading">
        <span className="about-principles__index">{index}</span>
        <h2 className="about-principles__title">{title}</h2>
      </div>
      <p className="about-principles__description">{description}</p>
    </>
  );
}

function PrincipleAccordion({ id, index, title, description, isOpen, onToggle }) {
  return (
    <li
      className={`about-principles__item about-principles__item--accordion${isOpen ? ' is-open' : ''}`}
    >
      <button
        type="button"
        className="about-principles__trigger"
        aria-expanded={isOpen}
        aria-controls={`about-principle-${id}`}
        onClick={() => onToggle(id)}
      >
        <div className="about-principles__heading">
          <span className="about-principles__index">{index}</span>
          <h2 className="about-principles__title">{title}</h2>
        </div>
        <span className="about-accordion-chevron" aria-hidden="true" />
      </button>
      <div id={`about-principle-${id}`} className="about-accordion-panel">
        <div className="about-accordion-panel-inner">
          <p className="about-principles__description">{description}</p>
        </div>
      </div>
    </li>
  );
}

export default function AboutHero() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className="about-hero" aria-labelledby="about-hero-title">
      <div className="about-hero__inner home-shell">
        <Reveal className="about-hero__intro">
          <p className="about-hero__eyebrow">{aboutHeroCopy.eyebrow}</p>
          <h1 id="about-hero-title" className="about-hero__title">
            {aboutHeroCopy.title}
          </h1>
          <p className="about-hero__description">{aboutHeroCopy.description}</p>
        </Reveal>

        <Reveal className="about-hero__media" y={24} delay={0.12}>
          <img
            className="about-hero__image"
            src={heroImage}
            alt="Solar panels representing Acecore renewable energy solutions"
            fetchPriority="high"
          />
        </Reveal>

        <Reveal className="about-hero__principles" y={20} delay={0.18}>
          <ul className="about-principles about-principles--desktop">
            {aboutPrinciples.map((item) => (
              <li key={item.id} className="about-principles__item">
                <PrincipleItem {...item} />
              </li>
            ))}
          </ul>

          <ul className="about-principles about-principles--mobile">
            {aboutPrinciples.map((item) => (
              <PrincipleAccordion
                key={`mobile-${item.id}`}
                {...item}
                isOpen={openId === item.id}
                onToggle={handleToggle}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
