import HomeFeatureBlock from './HomeFeatureBlock';
import { cleanEnergyCopy, cleanEnergyCards } from '../../data/home';
import cleanEnergyImage from '../../assets/images/home/cleanenergy.png';
import highEfficiencyIcon from '../../assets/icons/home/high-efficiency.svg';
import energyIndependenceIcon from '../../assets/icons/home/energy-independence.svg';
import reliabilityIcon from '../../assets/icons/home/reliability.svg';

import Reveal from '../ui/Reveal';
import ImpactAnimatedStat from '../ui/ImpactAnimatedStat';


const icons = {
  'high-efficiency': highEfficiencyIcon,
  'energy-independence': energyIndependenceIcon,
  reliability: reliabilityIcon,
};

export default function HomeCleanEnergy() {
  return (
     <section className="home-intro" aria-labelledby="home-intro-title">
          <div className="home-intro__inner">
           
            <Reveal delay={0.32}>
             
            </Reveal>
            
          </div>
        </section>,

    <HomeFeatureBlock
      id="home-clean-energy"
      className="home-clean-energy"
      copy={cleanEnergyCopy}
      cards={cleanEnergyCards}
      icons={icons}
      image={cleanEnergyImage}
      imageAlt="Close-up of Acecore solar panels converting sunlight into clean electricity"
    />
  );
}
