import Reveal from '../ui/Reveal';
import { productSmartSocketCopy } from '../../data/product';
import smartSocketImage from '../../assets/images/product/Smart Socket.jpg';

export default function ProductSmartSocket() {
  return (
    <section className="product-smart-socket" aria-labelledby="product-smart-socket-title">
      <div className="product-smart-socket__inner home-shell">
        <Reveal className="product-smart-socket__header">
          <h2 id="product-smart-socket-title" className="product-smart-socket__title">
            {productSmartSocketCopy.title}
          </h2>
          <p className="product-smart-socket__description">
            {productSmartSocketCopy.description}
          </p>
        </Reveal>

        <Reveal className="product-smart-socket__visual" y={28} delay={0.12}>
          <img
            className="product-smart-socket__image"
            src={smartSocketImage}
            alt="Acecore Smart Socket connected to a wall outlet with examples of controllable home appliances"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  );
}
