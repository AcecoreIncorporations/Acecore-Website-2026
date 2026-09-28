export const footerGroups = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      // { label: 'Team', to: '/team' },
      // { label: 'Term of Use', href: '/docs/Acecore Term of use.pdf'  },
     
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Problems', to: '/product' },
      { label: 'Solutions', to: '/product' },
      { label: 'Support', to: { pathname: '/support', hash: '#help-center' } },
      { label: 'Powercore App', to: { pathname: '/product', hash: '#productPowercoreApp' } },
      { label: 'The Powercell', to: '/product' },
    ],
  },
  {
    title: 'Sitemap',
    links: [
      { label: 'Homepage', to: '/' },
      { label: 'Product', to: '/product' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'About us', to: '/about' },
      // { label: 'Team', to: '/team' },  //this is commented out because the team page is not yet ready
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/support' },
      { label: 'User Manual', href: '/docs/acecore-powercell-user-manual.pdf' },
      { label: 'Warranty', to: '/support' },
      { label: 'Financing', to: '/support' },
    ],
  },
  {
    title: 'Download',
    links: [
      { label: 'User Manual (PDF)', href: '/docs/acecore-powercell-user-manual.pdf' },
      { label: 'Apple Store', href: '#' },
      { label: 'Google Play Store', href: '#' },
      { label: 'Term of Use', href: '/docs/Acecore Term of use.pdf' }
    ],
  },
];

export const footerMeta = {
  legal: [
    { label: 'Privacy', to: '/about' },
    { label: 'Trademark', to: '/about' },
  ],
  social: [
    { id: 'x', label: 'X', href: '#' },
    { id: 'instagram', label: 'Instagram', href: '#' },
    { id: 'linkedin', label: 'LinkedIn', href: '#' },
    { id: 'facebook', label: 'Facebook', href: '#' },
  ],
};
