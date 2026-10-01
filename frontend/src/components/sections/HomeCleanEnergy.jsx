import HomeFeatureBlock from './HomeFeatureBlock';
import { cleanEnergyCopy, cleanEnergyCards } from '../../data/home';
import cleanEnergyImage from '../../assets/images/home/cleanenergy.png';
import highEfficiencyIcon from '../../assets/icons/home/high-efficiency.svg';
import energyIndependenceIcon from '../../assets/icons/home/energy-independence.svg';
import reliabilityIcon from '../../assets/icons/home/reliability.svg';

const icons = {
  'high-efficiency': highEfficiencyIcon,
  'energy-independence': energyIndependenceIcon,
  reliability: reliabilityIcon,
};

export default function HomeCleanEnergy() {
  return (
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
