import Reveal from '../ui/Reveal';
import {
  productMechanicalCopy,
  productMechanicalSpecs,
} from '../../data/product';
import specificationsImage from '../../assets/images/product/specifications.png';

export default function ProductMechanicalSpecs() {
  return (
    <section
      className="product-mech-specs"
      aria-labelledby="product-mech-specs-title"
    >
      <div className="product-mech-specs__inner home-shell">
        <Reveal className="product-mech-specs__header">
          <p className="product-mech-specs__eyebrow">
            {productMechanicalCopy.eyebrow}
          </p>
          <h2 id="product-mech-specs-title" className="product-mech-specs__title">
            {productMechanicalCopy.title}
          </h2>
          <p className="product-mech-specs__description">
            {productMechanicalCopy.description}
          </p>
        </Reveal>

        <Reveal className="product-mech-specs__visual" y={28} delay={0.12}>
          <div className="product-mech-specs__diagram-frame">
            <img
              className="product-mech-specs__diagram"
              src={specificationsImage}
              alt="Exploded wireframe view of the Acecore Powercell mechanical assembly"
            />
          </div>
        </Reveal>

        <Reveal className="product-mech-specs__grid-wrap" y={20} delay={0.18}>
          <dl className="product-mech-specs__grid">
            {productMechanicalSpecs.map((spec) => (
              <div key={spec.id} className="product-mech-specs__item">
                <dt className="product-mech-specs__label">{spec.label}</dt>
                <dd className="product-mech-specs__values">
                  {spec.values.map((value) => (
                    <span key={value} className="product-mech-specs__value">
                      {value}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
