import PageLayout from '../../components/layout/PageLayout';
import SEO from '../../components/common/SEO';
import { seoPages } from '../../data/seoData';
import HomeHero from '../../components/sections/HomeHero';
import HomeIntro from '../../components/sections/HomeIntro';
import HomeLifestyle from '../../components/sections/HomeLifestyle';
import HomeProblem from '../../components/sections/HomeProblem';
import HomeSolution from '../../components/sections/HomeSolution';
import HomeStorage from '../../components/sections/HomeStorage';
import HomeMonitoring from '../../components/sections/HomeMonitoring';
import HomeCleanEnergy from '../../components/sections/HomeCleanEnergy';
import HomeAdvantage from '../../components/sections/HomeAdvantage';
import HomeRecognition from '../../components/sections/HomeRecognition';
import HomeSupport from '../../components/sections/HomeSupport';
import HomeEcosystem from '../../components/sections/HomeEcosystem';

export default function HomePage() {
  return (
    <PageLayout>
      <SEO {...seoPages.home} />
      <HomeHero />
      <HomeIntro />
      <HomeLifestyle />
      <HomeProblem />
      <HomeSolution />
      <HomeStorage />
      <HomeAdvantage />
      <HomeMonitoring />
      <HomeCleanEnergy />
      <HomeRecognition />
      <HomeSupport />
      <HomeEcosystem />
    </PageLayout>
  );
}
