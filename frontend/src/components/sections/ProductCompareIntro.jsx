import Reveal from '../ui/Reveal';
import { productCompareCopy } from '../../data/product';
import boldSolutionImage from '../../assets/images/product/Boldsolution.png';

export default function ProductCompareIntro() {
  return (
    <section className="product-compare-intro" aria-labelledby="product-compare-intro-title">
      <div className="product-compare-intro__inner home-shell">
        <Reveal className="product-compare-intro__content">
          <p className="product-compare-intro__eyebrow">{productCompareCopy.eyebrow}</p>
          <h2 id="product-compare-intro-title" className="product-compare-intro__body">
            <span className="product-compare-intro__lead">{productCompareCopy.lead}</span>{' '}
            <span className="product-compare-intro__trail">{productCompareCopy.trail}</span>
          </h2>
        </Reveal>

        <Reveal className="product-compare-intro__visual" y={24} delay={0.12}>
          <img
            className="product-compare-intro__placeholder"
            src={boldSolutionImage}
            alt="Boldsolution energy comparison visual"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  );
}
