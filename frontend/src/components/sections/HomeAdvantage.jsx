import { useEffect, useRef, useState } from 'react';
import Reveal from '../ui/Reveal';
import { advantageCopy, advantageCards } from '../../data/home';
import impactIcon from '../../assets/icons/home/advantage/impact.svg';
import technologyIcon from '../../assets/icons/home/advantage/technology.svg';
import investmentIcon from '../../assets/icons/home/advantage/investment.svg';
import customIcon from '../../assets/icons/home/advantage/custom.svg';
import savingsIcon from '../../assets/icons/home/advantage/savings.svg';
import backupIcon from '../../assets/icons/home/advantage/backup.svg';
import advantageImage from '../../assets/images/home/advantage.png';

const icons = {
  impact: impactIcon,
  technology: technologyIcon,
  investment: investmentIcon,
  custom: customIcon,
  savings: savingsIcon,
  backup: backupIcon,
};

export default function HomeAdvantage() {
  const trackRef = useRef(null);
  const [activeId, setActiveId] = useState(advantageCards[2]?.id ?? advantageCards[0].id);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();
    media.addEventListener('change', syncMobile);
    return () => media.removeEventListener('change', syncMobile);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const update = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      setProgress(maxScroll > 0 ? track.scrollLeft / maxScroll : 0);

      if (!window.matchMedia('(max-width: 767px)').matches) return;

      const center = track.scrollLeft + track.clientWidth / 2;
      let closestId = advantageCards[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      track.querySelectorAll('[data-advantage-card]').forEach((node) => {
        const el = node;
        const cardCenter = el.offsetLeft + el.offsetWidth / 2;
        const distance = Math.abs(cardCenter - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = el.getAttribute('data-advantage-card') || closestId;
        }
      });

      setActiveId(closestId);
    };

    const initial = track.querySelector('[data-advantage-card="investment"]');
    if (initial) {
      const styles = getComputedStyle(track);
      const padLeft = Number.parseFloat(styles.paddingLeft) || 0;
      const mobile = window.matchMedia('(max-width: 767px)').matches;
      const left = mobile
        ? initial.offsetLeft - padLeft
        : initial.offsetLeft - (track.clientWidth - initial.offsetWidth) / 2;
      track.scrollLeft = Math.max(0, left);
    }

    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollToCard = (id) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`[data-advantage-card="${id}"]`);
    if (!card) return;
    const styles = getComputedStyle(track);
    const padLeft = Number.parseFloat(styles.paddingLeft) || 0;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const left = mobile
      ? card.offsetLeft - padLeft
      : card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  };

  return (
    <section className="home-advantage" aria-labelledby="home-advantage-title">
      <div className="home-shell">
        <Reveal className="home-section-header">
          <p className="home-section-header__eyebrow">{advantageCopy.eyebrow}</p>
          <h2 id="home-advantage-title" className="home-section-header__title">
            {advantageCopy.title}
          </h2>
          <p className="home-section-header__description">{advantageCopy.description}</p>
        </Reveal>
      </div>

      <Reveal className="home-advantage__stage" y={28}>
        <div className="home-advantage__track" ref={trackRef}>
          {advantageCards.map((card) => {
            const isActive = isMobile && card.id === activeId;
            return (
              <article
                key={card.id}
                data-advantage-card={card.id}
                className={`home-advantage__card${isActive ? ' is-active' : ''}`}
                onClick={() => scrollToCard(card.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    scrollToCard(card.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
              >
                <span className="home-advantage__number">{card.number}</span>
                <span className="home-advantage__icon" aria-hidden="true">
                  <img src={icons[card.icon]} alt="" />
                </span>
                <h3 className="home-advantage__card-title">{card.title}</h3>
                <p className="home-advantage__card-description">{card.description}</p>
              </article>
            );
          })}
        </div>

        <div className="home-advantage__progress" aria-hidden="true">
          <span className="home-advantage__progress-bar">
            <span
              className="home-advantage__progress-fill"
              style={{ left: `${progress * 62}%` }}
            />
          </span>
        </div>
      </Reveal>

      <div className="home-shell">
        <Reveal className="home-advantage__media" y={32}>
          <img
            className="home-advantage__image"
            src={advantageImage}
            alt="Modern home with Acecore solar panels and Powercell energy storage at dusk"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  );
}
