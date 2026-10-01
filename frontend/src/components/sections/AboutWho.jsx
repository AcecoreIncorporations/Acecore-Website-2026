import Reveal from '../ui/Reveal';
import { aboutWhoCopy } from '../../data/about';
import whoImage from '../../assets/images/about/whoIsimg.png';

export default function AboutWho() {
  return (
    <section className="about-who" aria-labelledby="about-who-title">
      <div className="about-who__inner home-shell">
        <Reveal className="about-who__grid">
          <div className="about-who__copy">
            <h2 id="about-who-title" className="about-who__title">
              {aboutWhoCopy.title}
            </h2>
            <div className="about-who__body">
              {aboutWhoCopy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="about-who__media">
            <img
              className="about-who__image"
              src={whoImage}
              alt="Professional working with a solar panel"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
