import Reveal from '../ui/Reveal';
import { aboutVisionCopy } from '../../data/about';
import visionImage from '../../assets/images/about/vision-img.png';

export default function AboutVision() {
  return (
    <section className="about-vision" aria-labelledby="about-vision-title">
      <div className="about-vision__shell home-shell">
        <Reveal className="about-vision__card">
          <div className="about-vision__media">
            <img
              className="about-vision__image"
              src={visionImage}
              alt="Acecore branding on a dark surface"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-vision__copy">
            <h2 id="about-vision-title" className="about-vision__title">
              {aboutVisionCopy.title}
            </h2>
            <div className="about-vision__body">
              {aboutVisionCopy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
