import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import Button from '../ui/Button';
import SectionHeader from '../ui/SectionHeader';

export default function EcosystemBanner() {
  return (
    <section className="ecosystem-banner" aria-labelledby="ecosystem-heading">
      <Container>
        <SectionHeader
          title={<span id="ecosystem-heading">Discover the Acecore Ecosystem.</span>}
          description="Explore Powercell, intelligent monitoring and the Acecore application — built for reliable clean energy."
        />
        <div className="ecosystem-banner__actions">
          <Button as={Link} to="/product">
            Explore Powercell
          </Button>
          <Button as="a" href="#" variant="secondary">
            Download the app
          </Button>
        </div>
      </Container>
    </section>
  );
}
