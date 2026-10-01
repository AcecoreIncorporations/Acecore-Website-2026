import PageLayout from '../../components/layout/PageLayout';
import SEO from '../../components/common/SEO';
import { seoPages } from '../../data/seoData';
import MeetTeamSection from '../../components/sections/MeetTeamSection';
import HomeEcosystem from '../../components/sections/HomeEcosystem';

export default function MeetTeamPage() {
  return (
    <PageLayout>
      <SEO {...seoPages.team} />
      <MeetTeamSection />
      <HomeEcosystem />
    </PageLayout>
  );
}
