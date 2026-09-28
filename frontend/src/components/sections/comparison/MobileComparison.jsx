import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import {
  comparisonCopy,
  comparisonProducts,
  comparisonSpecifications,
  defaultComparisonProductId,
} from '../../../data/powercellComparison';
import { comparisonProductToModel } from '../../../data/requestQuote';

export default function MobileComparison() {
  const [selectedId, setSelectedId] = useState(defaultComparisonProductId);
  const selected =
    comparisonProducts.find((product) => product.id === selectedId) ||
    comparisonProducts[0];
  const quoteHref = `/request-quote?model=${comparisonProductToModel(selected.id)}`;

  return (
    <div className="comparison-mobile">
      <div
        className="comparison-mobile__tabs"
        role="tablist"
        aria-label="Powercell models"
      >
        {comparisonProducts.map((product) => {
          const isActive = product.id === selected.id;

          return (
            <button
              key={product.id}
              type="button"
              role="tab"
              id={`comparison-tab-${product.id}`}
              aria-selected={isActive}
              aria-controls={`comparison-panel-${product.id}`}
              className={`comparison-mobile__tab${isActive ? ' is-active' : ''}${
                product.recommended ? ' is-recommended' : ''
              }`}
              onClick={() => setSelectedId(product.id)}
            >
              <span className="comparison-mobile__tab-name">{product.name}</span>
              {product.recommended ? (
                <span className="comparison-mobile__tab-rec">Rec.</span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className={`comparison-mobile__summary${
          selected.recommended ? ' is-recommended' : ''
        }`}
        role="tabpanel"
        id={`comparison-panel-${selected.id}`}
        aria-labelledby={`comparison-tab-${selected.id}`}
      >
        <p className="comparison-mobile__summary-name">{selected.name}</p>
        <p className="comparison-mobile__summary-subtitle">{selected.subtitle}</p>
        {selected.recommended ? (
          <span className="comparison-mobile__summary-badge">Recommended</span>
        ) : null}

        <Button
          as={Link}
          to={quoteHref}
          variant="brand"
          className="comparison-mobile__summary-cta"
        >
          {comparisonCopy.chooseLabel} {selected.name}
        </Button>
      </div>

      <ul className="comparison-mobile__specs">
        {comparisonSpecifications.map((spec) => (
          <li key={spec.id} className="comparison-mobile__spec">
            <span className="comparison-mobile__spec-label">{spec.label}</span>
            <span className="comparison-mobile__spec-value">
              {spec.values[selected.id]}
            </span>
          </li>
        ))}
      </ul>

      <Button
        as={Link}
        to={quoteHref}
        variant="brand"
        className="comparison-mobile__cta"
      >
        {comparisonCopy.chooseLabel} {selected.name}
      </Button>
    </div>
  );
}
