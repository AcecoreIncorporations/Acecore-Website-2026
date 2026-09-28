import Reveal from '../ui/Reveal';
import { storageCopy, storageAppliances } from '../../data/home';
import powercellImage from '../../assets/images/home/powercell2.png';
import markImage from '../../assets/images/home/5kVA.svg';
import fridgeIcon from '../../assets/icons/home/refridgerator.svg';
import lightingIcon from '../../assets/icons/home/lighting.svg';
import televisionIcon from '../../assets/icons/home/television.svg';
import airConditionIcon from '../../assets/icons/home/air-condition.svg';
import laptopIcon from '../../assets/icons/home/laptop.svg';

const applianceIcons = {
  fridge: fridgeIcon,
  lighting: lightingIcon,
  tv: televisionIcon,
  ac: airConditionIcon,
  computer: laptopIcon,
};

export default function HomeStorage() {
  return (
    <section className="home-storage" aria-labelledby="home-storage-title">
      <div className="home-shell">
        <Reveal className="home-section-header">
          <p className="home-section-header__eyebrow">{storageCopy.eyebrow}</p>
          <h2 id="home-storage-title" className="home-section-header__title">
            {storageCopy.title}
          </h2>
          <p className="home-section-header__description">{storageCopy.description}</p>
        </Reveal>

        <Reveal className="home-storage__stage" y={36}>
          <div className="home-storage__composition">
            <img className="home-storage__mark" src={markImage} alt="" aria-hidden="true" />
            <img
              className="home-storage__product"
              src={powercellImage}
              alt="Acecore 5kVA Powercell energy storage unit"
            />
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <p className="home-storage__caption">
            {storageCopy.captionBefore}
            <span>{storageCopy.captionHighlight}</span>
          </p>
        </Reveal>

        <ul className="home-storage__appliances">
          {storageAppliances.map((item, index) => (
            <Reveal as="li" key={item.id} className="home-storage__appliance" delay={0.1 * index} y={18}>
              <img
                className="home-storage__appliance-icon"
                src={applianceIcons[item.id]}
                alt=""
              />
              <span className="home-storage__appliance-label">{item.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
