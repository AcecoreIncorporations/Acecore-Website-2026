import PageLayout from '../../components/layout/PageLayout';
import SEO from '../../components/common/SEO';
import { seoPages } from '../../data/seoData';
import ProductHero from '../../components/sections/ProductHero';
import ProductCompareIntro from '../../components/sections/ProductCompareIntro';
import ProductMechanicalSpecs from '../../components/sections/ProductMechanicalSpecs';
import ProductPowerOptions from '../../components/sections/ProductPowerOptions';
import ProductPowercoreApp from '../../components/sections/ProductPowercoreApp';
import HomeSupport from '../../components/sections/HomeSupport';
import HomeEcosystem from '../../components/sections/HomeEcosystem';

export default function ProductPage() {
  return (
    <PageLayout>
      <SEO {...seoPages.product} />
      <ProductHero />
      <ProductCompareIntro />
      <ProductMechanicalSpecs />
      <ProductPowerOptions />
      <ProductPowercoreApp />
      <HomeSupport />
      <HomeEcosystem />
    </PageLayout>
  );
}
