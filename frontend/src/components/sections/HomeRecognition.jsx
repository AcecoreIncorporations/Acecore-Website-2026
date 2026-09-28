import Reveal from '../ui/Reveal';
import { recognitionCopy, recognitionLogos } from '../../data/home';
import acecoreWhiteLogo from '../../assets/logos/acecore-white.png';
import antLogo from '../../assets/logos/Ant.png';
import metaLogo from '../../assets/logos/Meta.png';
import mitLogo from '../../assets/logos/mit.png';
import nasLogo from '../../assets/logos/nas.png';
import ostLogo from '../../assets/logos/ost.png';
import parLogo from '../../assets/logos/par.png';
import setLogo from '../../assets/logos/SET.png';
import solLogo from '../../assets/logos/sol.png';
import tesLogo from '../../assets/logos/tes.png';

const recognitionAssets = [
  acecoreWhiteLogo,
  antLogo,
  mitLogo,
  metaLogo,
  nasLogo,
  ostLogo,
  parLogo,
  setLogo,
  solLogo,
  tesLogo,
];

function LogoItem({ label, src }) {
  return (
    <li className="home-recognition__logo">
      <img src={src} alt={label} />
    </li>
  );
}

export default function HomeRecognition() {
  const loopLogos = [...recognitionAssets, ...recognitionAssets];

  return (
    <section className="home-recognition" aria-labelledby="home-recognition-title">
      <div className="home-shell">
        <Reveal className="home-section-header">
          <p className="home-section-header__eyebrow">{recognitionCopy.eyebrow}</p>
          <h2 id="home-recognition-title" className="home-section-header__title">
            {recognitionCopy.title}
          </h2>
          <p className="home-section-header__description">{recognitionCopy.description}</p>
        </Reveal>

        <Reveal className="home-recognition__grid-wrap" y={24}>
          <ul className="home-recognition__grid" aria-label="Recognition partners">
            {recognitionLogos.map((logo, index) => (
              <LogoItem
                key={logo.id}
                label={logo.label}
                src={recognitionAssets[index % recognitionAssets.length]}
              />
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="home-recognition__marquee" aria-hidden="true">
        <div className="home-recognition__marquee-track">
          {loopLogos.map((src, index) => (
            <span className="home-recognition__logo" key={`${src}-${index}`}>
              <img src={src} alt="" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
