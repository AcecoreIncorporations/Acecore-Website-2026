import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import { usePricing } from '../../hooks/usePricing';

export default function PricingPlans() {
  const { modes, copy, plans } = usePricing();
  const [mode, setMode] = useState('solar');
  const [openPlanId, setOpenPlanId] = useState(null);
  const activeIndex = Math.max(
    0,
    modes.findIndex((item) => item.id === mode),
  );

  const togglePlan = (planId) => {
    setOpenPlanId((current) => (current === planId ? null : planId));
  };

  return (
    <section className="pricing-plans" aria-labelledby="pricing-plans-title">
      <div className="pricing-plans__inner home-shell">
        <Reveal>
          <header className="pricing-plans__header">
            <p className="pricing-plans__eyebrow">{copy.eyebrow}</p>
            <h1 id="pricing-plans-title" className="pricing-plans__title">
              {copy.title}
            </h1>
            <p className="pricing-plans__description">{copy.description}</p>

            <div
              className="pricing-plans__toggle"
              role="group"
              aria-label="Pricing configuration"
              data-active={activeIndex}
            >
              <span className="pricing-plans__toggle-pill" aria-hidden="true" />
              {modes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`pricing-plans__toggle-btn${mode === item.id ? ' is-active' : ''}`}
                  aria-pressed={mode === item.id}
                  onClick={() => setMode(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </header>
        </Reveal>

        <div className="pricing-plans__grid">
          {plans.map((plan, index) => {
            const isOpen = openPlanId === plan.id;

            return (
              <Reveal key={plan.id} delay={0.1 * index} y={28}>
                <article className={`pricing-card${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="pricing-card__summary"
                    aria-expanded={isOpen}
                    aria-controls={`pricing-details-${plan.id}`}
                    onClick={() => togglePlan(plan.id)}
                  >
                    <div className="pricing-card__summary-copy">
                      <p className="pricing-card__name">{plan.name}</p>
                      <p className="pricing-card__price pricing-card__price--desktop">
                        {plan.prices[mode]}
                      </p>
                      <ul className="pricing-card__specs">
                        {plan.specs.map((spec) => (
                          <li key={spec}>{spec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pricing-card__summary-meta">
                      <p className="pricing-card__price pricing-card__price--mobile">
                        {plan.prices[mode]}
                      </p>
                      <span className="pricing-card__chevron" aria-hidden="true" />
                    </div>
                  </button>

                  <div
                    id={`pricing-details-${plan.id}`}
                    className="pricing-card__details"
                  >
                    <div className="pricing-card__details-inner">
                      <div className="pricing-card__instalments">
                        <p className="pricing-card__instalments-label">
                          {copy.instalmentLabel}
                        </p>
                        <ul className="pricing-card__instalments-list">
                          {plan.instalments.map((row) => (
                            <li key={row.label} className="pricing-card__instalment-row">
                              <span className="pricing-card__instalment-label">{row.label}</span>
                              <span className="pricing-card__instalment-amount">{row.amount}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link
                        to={`/request-quote?model=${plan.id}&config=${mode === 'solar' ? 'solar' : 'powercell'}`}
                        className="pricing-card__cta"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <span className="pricing-card__cta-icon" aria-hidden="true">
                          ↗
                        </span>
                        <span>{copy.cta}</span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
