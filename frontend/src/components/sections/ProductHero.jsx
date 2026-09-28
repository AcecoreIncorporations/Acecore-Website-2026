import Reveal from '../ui/Reveal';
import { productHeroCopy, productHeroStats } from '../../data/product';
import markImage from '../../assets/images/home/5kVA.svg';
import powercellImage from '../../assets/images/product/powercellB.png';
import outputIcon from '../../assets/icons/product/power-output.svg';
import capacityIcon from '../../assets/icons/product/user-capacity.svg';
import lifeIcon from '../../assets/icons/product/design-life.svg';

const icons = {
  output: outputIcon,
  capacity: capacityIcon,
  life: lifeIcon,
};

export default function ProductHero() {
  return (
    <section className="product-hero" aria-labelledby="product-hero-title">
      <div className="product-hero__inner home-shell">
        <Reveal className="product-hero__header">
          <h1 id="product-hero-title" className="product-hero__title">
            {productHeroCopy.title}
          </h1>
          <p className="product-hero__description">{productHeroCopy.description}</p>
        </Reveal>

        <Reveal className="product-hero__stats" y={20} delay={0.12}>
          <ul className="product-hero__stats-list">
            {productHeroStats.map((stat) => (
              <li key={stat.id} className="product-hero__stat">
                <img
                  className="product-hero__stat-icon"
                  src={icons[stat.icon]}
                  alt=""
                  aria-hidden="true"
                />
                <div className="product-hero__stat-copy">
                  <span className="product-hero__stat-value">{stat.value}</span>
                  <span className="product-hero__stat-label">{stat.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="product-hero__stage" y={36} delay={0.18}>
          <div className="product-hero__composition">
            <img
              className="product-hero__mark"
              src={markImage}
              alt=""
              aria-hidden="true"
            />
            <div className="product-hero__product-clip">
              <img
                className="product-hero__product"
                src={powercellImage}
                alt="Acecore Powercell energy storage unit"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
