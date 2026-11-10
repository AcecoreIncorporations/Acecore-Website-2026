export const SITE_URL = 'https://www.acecore.tech';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const SITE_NAME = 'Acecore';

export const seoPages = {
  home: {
    title: 'Acecore | Clean Energy Generation, Storage & Intelligent Management',
    description:
      'Acecore indigenously designs and manufactures high-efficiency solar energy systems, Powercell battery storage, and intelligent energy management for homes and businesses.',
    canonical: '/',
  },
  product: {
    title: 'Acecore Powercell | Intelligent Home & Business Energy Storage',
    description:
      'Explore the Acecore Powercell — an all-in-one renewable energy storage system engineered with smart power optimization, high conversion efficiency, and PowerCore app control.',
    canonical: '/product',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Acecore Powercell Energy Storage System',
      image: [`${SITE_URL}/og-image.png`],
      description:
        'An integrated clean energy generation and storage system with intelligent load management, high-efficiency lithium battery cells, and seamless PowerCore app monitoring.',
      brand: {
        '@type': 'Brand',
        name: 'Acecore',
      },
      category: 'Renewable Energy Equipment > Energy Storage Systems',
    },
  },
  pricing: {
    title: 'Pricing & System Configurations | Acecore Clean Energy',
    description:
      'Transparent pricing and power configuration options for Acecore Powercell systems. Compare solar and non-panel packages tailored to your energy needs.',
    canonical: '/pricing',
  },
  about: {
    title: 'About Acecore | Building the Future of Renewable Energy',
    description:
      "Learn about Acecore's mission to power homes and businesses through indigenously engineered clean energy generation, battery storage, and smart technology.",
    canonical: '/about',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Acecore',
      description:
        'The story, vision, core values, and technological mission of Acecore Incorporations.',
      url: `${SITE_URL}/about`,
    },
  },
  team: {
    title: 'Our Leadership & Engineering Team | Acecore',
    description:
      "Meet the visionary leaders, engineers, and specialists behind Acecore's renewable energy systems and intelligent energy management hardware.",
    canonical: '/team',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'Acecore Leadership & Team',
      description: 'Meet the executive team and engineering leaders at Acecore.',
      url: `${SITE_URL}/team`,
    },
  },
  support: {
    title: 'Help Center & Customer Support | Acecore Powercell',
    description:
      'Access Powercell user manuals, troubleshooting guides, warranty details, and contact our certified energy specialists for technical assistance.',
    canonical: '/support',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Acecore Customer Support',
      url: `${SITE_URL}/support`,
    },
  },
  requestQuote: {
    title: 'Request a Custom Powercell Quote | Acecore',
    description:
      'Configure your Acecore Powercell package and receive a customized quote with local certified installer consultation for your home or business.',
    canonical: '/request-quote',
  },
  terms: {
    title: 'Terms of Service & Legal Policies | Acecore',
    description:
      "Read Acecore's Terms of Service, warranty conditions, hardware usage policies, and software licensing guidelines.",
    canonical: '/terms',
  },
  checkout: {
    title: 'Checkout | Acecore',
    description: 'Review and confirm your Acecore Powercell package selection.',
    noindex: true,
  },
  orderConfirmation: {
    title: 'Order Confirmation | Acecore',
    description: 'Your Acecore Powercell quotation summary and next steps.',
    noindex: true,
  },
  notFound: {
    title: 'Page Not Found | Acecore',
    description: 'The requested page could not be found on Acecore.',
    noindex: true,
  },
};
