export const SITE_URL = 'https://www.acecore.tech';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const SITE_NAME = 'Acecore';

export const homeFaqsPlainText = [
  {
    question: 'What is Acecore?',
    answer:
      'Acecore is a clean energy company that indigenously designs, manufactures, and deploys clean energy solutions for homes and businesses.',
  },
  {
    question: 'Do Acecore products come with warranties?',
    answer:
      'Acecore products include manufacturer-backed warranties covering performance and workmanship. Details vary by product line.',
  },
  {
    question: 'Is Acecore committed to sustainability?',
    answer:
      'Yes. Acecore is built around clean energy generation, efficient storage, and smarter consumption to reduce reliance on fossil fuels.',
  },
  {
    question: 'What types of solar solutions does Acecore offer?',
    answer:
      'Acecore offers solar generation, Powercell storage, monitoring software, and integrated energy management for residential and business use.',
  },
  {
    question: 'How can I contact Acecore for more information?',
    answer:
      'Reach the Acecore team through the Contact Us page on the website or via support@acecore.tech / +234 814 507 0171.',
  },
  {
    question: 'Are Acecore products suitable for off-grid installations?',
    answer:
      'Selected Acecore configurations support off-grid and backup use cases. Our team can help size the right setup for your load profile. With the help of our Powercore app you can optimize your system remotely for off-grid performance.',
  },
  {
    question: 'Can Acecore products be integrated with existing solar systems?',
    answer:
      'The Powercell and Powercore App is designed to replace your existing inverter and battery system rather than integrate with it. However, you can continue using your existing solar panels with Powercell, provided they are still in good working condition and meet the required specifications.',
  },
  {
    question: 'Do I need to buy anything else asides from solar panels and The Powercell?',
    answer:
      'Depending on your site, you may also need mounting, cabling, protection devices, and professional installation. We will guide you through required components.',
  },
  {
    question: 'Can I track the performance of my Acecore Powercell remotely?',
    answer:
      'Yes. With the Powercore app, you can monitor and control your Powercell in real-time from anywhere in the world.',
  },
];

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateFaqSchema(faqs = homeFaqsPlainText) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string' ? faq.answer : JSON.stringify(faq.answer),
      },
    })),
  };
}

export const seoPages = {
  home: {
    title: 'Acecore | Clean Energy Generation, Storage & Intelligent Management',
    description:
      'Acecore indigenously designs and manufactures high-efficiency solar energy systems, Powercell battery storage, and intelligent energy management for homes and businesses.',
    keywords:
      'clean energy, solar power, battery storage, Powercell, renewable energy, energy management, solar inverter, off-grid power, backup electricity',
    canonical: '/',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Acecore Incorporations',
        legalName: 'ACECORE INCORPORATIONS',
        url: SITE_URL,
        logo: `${SITE_URL}/favicon/favicon.png`,
        description:
          'Acecore indigenously designs, manufactures, and deploys clean energy solutions, Powercell storage, and intelligent energy management systems.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+234 814 507 0171',
          contactType: 'customer service',
          email: 'support@acecore.tech',
          areaServed: 'Worldwide',
          availableLanguage: 'English',
        },
        sameAs: [
          'https://twitter.com/AcecoreHQ',
          'https://www.linkedin.com/company/acecore',
          'https://www.instagram.com/acecorehq',
        ],
      },
      generateFaqSchema(homeFaqsPlainText),
    ],
  },
  product: {
    title: 'Acecore Powercell | Intelligent Home & Business Energy Storage',
    description:
      'Explore the Acecore Powercell — an all-in-one renewable energy storage system engineered with smart power optimization, high conversion efficiency, and PowerCore app control.',
    keywords:
      'Acecore Powercell, energy storage system, residential battery storage, commercial solar battery, PowerCore app, smart inverter, backup power',
    canonical: '/product',
    schema: [
      {
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
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'NGN',
          lowPrice: '2500000',
          highPrice: '7500000',
          offerCount: '3',
          availability: 'https://schema.org/InStock',
        },
      },
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Product', url: '/product' },
      ]),
    ],
  },
  pricing: {
    title: 'Pricing & System Configurations | Acecore Clean Energy',
    description:
      'Transparent pricing and power configuration options for Acecore Powercell systems. Compare solar and non-panel packages tailored to your energy needs.',
    keywords:
      'Acecore pricing, Powercell cost, solar system price, clean energy installation quote, solar financing, 5kVA solar package',
    canonical: '/pricing',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Pricing', url: '/pricing' },
      ]),
    ],
  },
  about: {
    title: 'About Acecore | Building the Future of Renewable Energy',
    description:
      "Learn about Acecore's mission to power homes and businesses through indigenously engineered clean energy generation, battery storage, and smart technology.",
    keywords:
      'About Acecore, clean energy mission, solar technology company, renewable energy innovation, sustainable power systems',
    canonical: '/about',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Acecore',
        description:
          'The story, vision, core values, and technological mission of Acecore Incorporations.',
        url: `${SITE_URL}/about`,
      },
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' },
      ]),
    ],
  },
  team: {
    title: 'Our Leadership & Engineering Team | Acecore',
    description:
      "Meet the visionary leaders, engineers, and specialists behind Acecore's renewable energy systems and intelligent energy management hardware.",
    keywords:
      'Acecore team, Acecore leadership, clean energy engineers, renewable energy executives, solar tech team',
    canonical: '/team',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'Acecore Leadership & Team',
        description: 'Meet the executive team and engineering leaders at Acecore.',
        url: `${SITE_URL}/team`,
      },
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' },
        { name: 'Leadership & Team', url: '/team' },
      ]),
    ],
  },
  support: {
    title: 'Help Center & Customer Support | Acecore Powercell',
    description:
      'Access Powercell user manuals, troubleshooting guides, warranty details, and contact our certified energy specialists for technical assistance.',
    keywords:
      'Acecore support, Powercell manual, PowerCore troubleshooting, warranty info, solar customer service, energy system repair',
    canonical: '/support',
    schema: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Acecore Customer Support',
        url: `${SITE_URL}/support`,
        mainEntity: {
          '@type': 'ContactPoint',
          telephone: '+234 814 507 0171',
          contactType: 'customer support',
          email: 'support@acecore.tech',
        },
      },
      generateFaqSchema(homeFaqsPlainText),
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Support', url: '/support' },
      ]),
    ],
  },
  requestQuote: {
    title: 'Request a Custom Powercell Quote | Acecore',
    description:
      'Configure your Acecore Powercell package and receive a customized quote with local certified installer consultation for your home or business.',
    keywords:
      'request solar quote, Powercell quotation, clean energy estimate, solar installation consultation, commercial energy quote',
    canonical: '/request-quote',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Pricing', url: '/pricing' },
        { name: 'Request a Quote', url: '/request-quote' },
      ]),
    ],
  },
  terms: {
    title: 'Terms of Service & Legal Policies | Acecore',
    description:
      "Read Acecore's Terms of Service, warranty conditions, hardware usage policies, and software licensing guidelines.",
    keywords: 'Acecore terms of service, warranty policy, legal disclaimer, privacy terms',
    canonical: '/terms',
    schema: [
      generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Terms of Service', url: '/terms' },
      ]),
    ],
  },
  checkout: {
    title: 'Checkout | Acecore',
    description: 'Review and confirm your Acecore Powercell package selection.',
    canonical: '/checkout',
    noindex: true,
  },
  orderConfirmation: {
    title: 'Order Confirmation | Acecore',
    description: 'Your Acecore Powercell quotation summary and next steps.',
    canonical: '/order-confirmation',
    noindex: true,
  },
  notFound: {
    title: 'Page Not Found | Acecore',
    description: 'The requested page could not be found on Acecore.',
    canonical: '/404',
    noindex: true,
  },
};
