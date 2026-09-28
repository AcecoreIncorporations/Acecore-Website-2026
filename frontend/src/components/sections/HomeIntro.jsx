import Reveal from '../ui/Reveal';
import ImpactAnimatedStat from '../ui/ImpactAnimatedStat';
import { introCopy, introStats, introCopy3 } from '../../data/home';

export default function HomeIntro() {
  return (
    <section className="home-intro" aria-labelledby="home-intro-title">
      <div className="home-intro__inner">
        <Reveal>
          <p className="home-intro__eyebrow">{introCopy.eyebrow}</p>
        </Reveal>

        <Reveal delay={0.32}>
          <h2 id="home-intro-title" className="home-intro__title">
            <span className="home-intro__title-lead">{introCopy.lead}</span>{' '}
            <span className="home-intro__title-muted">{introCopy.muted}</span>
          </h2>
        </Reveal>

 
<Reveal>
          <p className="home-intro__eyebrow stats_title">{introCopy3.eyebrow}</p>
        </Reveal>
        <div className="home-intro__stats">
          {introStats.map((stat, index) => (
            
            <Reveal key={stat.id} delay={0.22 + index * 0.14} y={20}>
              <ImpactAnimatedStat
                target={stat.target}
                label={stat.label}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimal={stat.decimal}
                format={stat.format}
              />
            </Reveal>
          ))}
        </div>
        
        
      </div>
    </section>
  );
}
