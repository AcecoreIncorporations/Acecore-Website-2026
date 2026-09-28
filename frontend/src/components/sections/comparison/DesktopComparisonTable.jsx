import ComparisonChooseButton from './ComparisonChooseButton';
import {
  comparisonCopy,
  comparisonProducts,
  comparisonSpecifications,
} from '../../../data/powercellComparison';

function CellValue({ value }) {
  return <span className="comparison-table__value">{value}</span>;
}

export default function DesktopComparisonTable() {
  return (
    <div className="comparison-table-wrap">
      <table className="comparison-table">
        <caption className="visually-hidden">
          Powercell model comparison specifications
        </caption>
        <colgroup>
          <col className="comparison-table__col-feature" />
          <col className="comparison-table__col-product" />
          <col className="comparison-table__col-product" />
          <col className="comparison-table__col-product" />
        </colgroup>
        <thead>
          <tr className="comparison-table__product-row">
            <th scope="col" className="comparison-table__feature-head">
              <span className="visually-hidden">{comparisonCopy.featureHeader}</span>
            </th>
            {comparisonProducts.map((product) => (
              <th
                key={product.id}
                scope="col"
                className={`comparison-table__product-head${
                  product.recommended ? ' is-recommended' : ''
                }`}
              >
                {product.recommended ? (
                  <span className="comparison-table__badge">Recommended</span>
                ) : (
                  <span className="comparison-table__badge-spacer" aria-hidden="true" />
                )}
                <span className="comparison-table__product-name">{product.name}</span>
                <span className="comparison-table__product-subtitle">
                  {product.subtitle}
                </span>
                <ComparisonChooseButton productId={product.id} />
              </th>
            ))}
          </tr>
          <tr className="comparison-table__section-row">
            <th scope="col">{comparisonCopy.featureHeader}</th>
            {comparisonProducts.map((product) => (
              <th
                key={product.id}
                scope="col"
                className={product.recommended ? 'is-recommended' : undefined}
              >
                {product.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparisonSpecifications.map((spec) => (
            <tr key={spec.id}>
              <th scope="row">{spec.label}</th>
              {comparisonProducts.map((product) => (
                <td
                  key={product.id}
                  className={product.recommended ? 'is-recommended' : undefined}
                >
                  <CellValue value={spec.values[product.id]} />
                </td>
              ))}
            </tr>
          ))}
          <tr className="comparison-table__cta-row">
            <th scope="row">
              <span className="visually-hidden">Choose a Powercell</span>
            </th>
            {comparisonProducts.map((product) => (
              <td
                key={product.id}
                className={product.recommended ? 'is-recommended' : undefined}
              >
                <ComparisonChooseButton productId={product.id} />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
