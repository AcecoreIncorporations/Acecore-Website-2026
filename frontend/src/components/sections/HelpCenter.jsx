import { useId, useState } from 'react';
import Reveal from '../ui/Reveal';
import { helpArticles, helpDownloads, helpHeroCopy, helpTopics } from '../../data/help';

function HelpSearch({ value, onChange }) {
  const inputId = useId();

  return (
    <div className="help-search">
      <label className="visually-hidden" htmlFor={inputId}>
        Search help topics
      </label>
      <input
        id={inputId}
        className="help-search__input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={helpHeroCopy.searchPlaceholder}
        autoComplete="off"
      />
    </div>
  );
}

function HelpSidebar({ topics, activeId, onSelect }) {
  return (
    <nav className="help-sidebar" aria-label="Help topics">
      <ul className="help-sidebar__list">
        {topics.map((topic) => {
          const isActive = topic.id === activeId;
          return (
            <li key={topic.id}>
              <button
                type="button"
                className={`help-sidebar__item${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSelect(topic.id, { scroll: false })}
              >
                {topic.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MobileTopicNavigation({ topics, activeId, activeLabel, onSelect }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const handleSelect = (id) => {
    onSelect(id, { scroll: true });
    setOpen(false);
  };

  return (
    <div className="help-mobile-nav">
      <button
        type="button"
        className={`help-mobile-nav__toggle${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{activeLabel}</span>
        <span className="help-mobile-nav__chevron" aria-hidden="true" />
      </button>

      {open ? (
        <nav id={panelId} className="help-mobile-nav__panel" aria-label="Help topics">
          <ul className="help-mobile-nav__list">
            {topics.map((topic) => {
              const isActive = topic.id === activeId;
              return (
                <li key={topic.id}>
                  <button
                    type="button"
                    className={`help-mobile-nav__item${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => handleSelect(topic.id)}
                  >
                    {topic.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

function HelpArticle({ article }) {
  return (
    <article id="help-article" className="help-article">
      <header className="help-article__header">
        <h2 className="help-article__title">{article.title}</h2>
        {article.subtitle ? (
          <p className="help-article__subtitle">{article.subtitle}</p>
        ) : null}
        {article.intro ? <p className="help-article__intro">{article.intro}</p> : null}
      </header>

      {article.sections.map((section) => (
        <section key={section.id} className="help-article__section" aria-labelledby={`help-${section.id}`}>
          <h3 id={`help-${section.id}`} className="help-article__section-title">
            {section.heading}
          </h3>
          <ul className="help-article__features">
            {section.items.map((item) => (
              <li key={item.title} className="help-article__feature">
                <h4 className="help-article__feature-title">{item.title}</h4>
                <p className="help-article__feature-description">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}

function ArticleNavigation({ previous, next, onNavigate }) {
  return (
    <nav className="help-pager" aria-label="Article navigation">
      {previous ? (
        <button
          type="button"
          className="help-pager__item help-pager__item--prev"
          onClick={() => onNavigate(previous.id, { scroll: true })}
        >
          <span className="help-pager__meta">
            <span className="help-pager__arrow" aria-hidden="true">
              ‹
            </span>
            <span className="help-pager__label">PREVIOUS</span>
          </span>
          <span className="help-pager__value">{previous.label}</span>
        </button>
      ) : (
        <div className="help-pager__item help-pager__item--prev is-disabled" aria-disabled="true">
          <span className="help-pager__meta">
            <span className="help-pager__arrow" aria-hidden="true">
              ‹
            </span>
            <span className="help-pager__label">PREVIOUS</span>
          </span>
          <span className="help-pager__value">---</span>
        </div>
      )}

      {next ? (
        <button
          type="button"
          className="help-pager__item help-pager__item--next"
          onClick={() => onNavigate(next.id, { scroll: true })}
        >
          <span className="help-pager__meta">
            <span className="help-pager__label">NEXT</span>
            <span className="help-pager__arrow" aria-hidden="true">
              ›
            </span>
          </span>
          <span className="help-pager__value">{next.label}</span>
        </button>
      ) : (
        <div className="help-pager__item help-pager__item--next is-disabled" aria-disabled="true">
          <span className="help-pager__meta">
            <span className="help-pager__label">NEXT</span>
            <span className="help-pager__arrow" aria-hidden="true">
              ›
            </span>
          </span>
          <span className="help-pager__value">---</span>
        </div>
      )}
    </nav>
  );
}

export default function HelpCenter() {
  const [activeId, setActiveId] = useState(helpTopics[0].id);
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const filteredTopics = normalizedQuery
    ? helpTopics.filter((topic) => topic.label.toLowerCase().includes(normalizedQuery))
    : helpTopics;

  const activeIndex = helpTopics.findIndex((topic) => topic.id === activeId);
  const activeTopic = helpTopics[activeIndex] ?? helpTopics[0];
  const previous = activeIndex > 0 ? helpTopics[activeIndex - 1] : null;
  const next =
    activeIndex >= 0 && activeIndex < helpTopics.length - 1
      ? helpTopics[activeIndex + 1]
      : null;

  const article = helpArticles[activeId] ?? {
    title: activeTopic.label,
    subtitle: '',
    intro: '',
    sections: [],
  };

  const handleSelect = (id, { scroll = false } = {}) => {
    setActiveId(id);
    if (!scroll) return;
    window.requestAnimationFrame(() => {
      document.getElementById('help-article')?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    });
  };

  const nextLabel =
    next?.id === 'getting-started' ? 'Getting started' : next?.label;

  return (
    <section id="help-center" className="help-center" aria-labelledby="help-center-title">
      <div className="help-center__shell">
        <Reveal className="help-center__hero">
          <p className="help-center__eyebrow">{helpHeroCopy.eyebrow}</p>
          <h2 id="help-center-title" className="help-center__title">
            {helpHeroCopy.title}
          </h2>
          <p className="help-center__description">{helpHeroCopy.description}</p>
          <HelpSearch value={query} onChange={setQuery} />
        </Reveal>

        <Reveal className="help-center__downloads" y={20} delay={0.14}>
          <h2 className="help-center__downloads-title">Downloads</h2>
          <ul className="help-center__downloads-list">
            {helpDownloads.map((item) => (
              <li key={item.id}>
                <a
                  className="help-center__download-card"
                  href={item.href}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="help-center__download-label">{item.label}</span>
                  <span className="help-center__download-desc">{item.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="help-center__docs" y={24} delay={0.24}>
          <MobileTopicNavigation
            topics={filteredTopics}
            activeId={activeId}
            activeLabel={activeTopic.label}
            onSelect={handleSelect}
          />

          <div className="help-center__grid">
            <HelpSidebar
              topics={filteredTopics}
              activeId={activeId}
              onSelect={handleSelect}
            />

            <div className="help-center__main">
              <HelpArticle article={article} />
              <ArticleNavigation
                previous={previous}
                next={next ? { ...next, label: nextLabel } : null}
                onNavigate={handleSelect}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
