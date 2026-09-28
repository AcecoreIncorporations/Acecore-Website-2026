export const primaryNav = [
  { label: 'The Powercell', to: '/product' },
  { label: 'Pricing', to: '/pricing' },
  // {
  //   label: 'Our services',
  //   children: [
  //     { label: 'Solar', to: '/product' },
  //     { label: 'Powercell', to: '/product' },
  //     { label: 'Financing', to: '/support' },
  //   ],
  // },
  { label: 'About us', to: '/about' },
  { label: 'Support', to: { pathname: '/support', hash: '#help-center' } },
  // { label: 'Team', to: '/team' }, //this is commented out because the team page is not yet ready
];

export const contactCta = {
  label: 'Contact Us',
  to: '/support',
};

export const announcement = {
  text: 'Take control of your energy & save more by installing The Acecore Powercell today.',
  linkLabel: 'Get yours now',
  href: 'https://wa.me/2349015294724',
  external: true,
};
