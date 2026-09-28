import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import footerBg from '../../assets/images/home/app-footerbg.svg';
import phoneImage from '../../assets/images/home/iphone.svg';
import powercellImage from '../../assets/images/home/Powercell3.svg';
import appleLogo from '../../assets/icons/home/Apple-logo.svg';
import googlePlayLogo from '../../assets/icons/home/GooglePlay-logo.svg';

const copy = {
  description:
    'We are building intelligent energy solutions designed to power homes and businesses with reliable backup, clean energy, and complete control.',
  primary: {
    label: 'Get your power cell',
    to: '/pricing',
  },
  secondary: {
    label: 'Download app',
    href: '#',
  },
};

export default function HomeEcosystem() {
  return (
    <section className="home-ecosystem" aria-labelledby="home-ecosystem-title">
      <div className="home-shell">
        <Reveal y={28}>
          <div className="home-ecosystem__panel">
            <div
              className="home-ecosystem__bg"
              style={{ backgroundImage: `url(${footerBg})` }}
              aria-hidden="true"
            />

            <div className="home-ecosystem__content">
              <h2 id="home-ecosystem-title" className="home-ecosystem__title">
               No Uncertainty
                <br />
                <span>Just</span> Control
              </h2>
              <p className="home-ecosystem__description">{copy.description}</p>
              <div className="home-ecosystem__actions">
                <Button as={Link} to={copy.primary.to} variant="brand" className="home-ecosystem__btn">
                  {copy.primary.label}
                </Button>
                <a className="home-ecosystem__download" href={copy.secondary.href}>
                  <span className="home-ecosystem__download-icons" aria-hidden="true">
                    <img src={appleLogo} alt="" width={21} height={26} />
                    <span className="home-ecosystem__download-divider" />
                    <img src={googlePlayLogo} alt="" width={23} height={26} />
                  </span>
                  <span>{copy.secondary.label}</span>
                </a>
              </div>
            </div>

            <div className="home-ecosystem__visual home-ecosystem__visual--desktop" aria-hidden="true">
              <img className="home-ecosystem__powercell" src={powercellImage} alt="" />
              <img className="home-ecosystem__phone" src={phoneImage} alt="" />
            </div>

            <div className="home-ecosystem__visual home-ecosystem__visual--mobile" aria-hidden="true">
              <img className="home-ecosystem__powercell" src={powercellImage} alt="" />
              <img className="home-ecosystem__phone" src={phoneImage} alt="" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
