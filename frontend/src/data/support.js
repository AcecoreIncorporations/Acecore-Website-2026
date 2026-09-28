export const supportHeroCopy = {
  eyebrow: 'HOW CAN WE HELP?',
  title: 'Talk to our support team',
  description:
    'Feel free to reach out for help with your order or any questions you may have regarding your purchase',
};

export const supportChannels = [
  {
    id: 'email',
    label: 'EMAIL',
    value: 'chimka@acecore.tech',
    href: 'mailto:chimka@acecore.tech',
    external: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+234 901 529 4724',
    href: 'https://wa.me/2349015294724',
    external: true,
  },

   {
    id: 'whatsapp',
    label: 'PHONE',
    value: '+234 706 757 9254',
    // href: 'https://wa.me/2349015294724',
    external: true,
  },
];

export const supportFormFields = [
  { id: 'fullName', name: 'fullName', label: 'FULL NAME', type: 'text', autoComplete: 'name' },
  {
    id: 'email',
    name: 'email',
    label: 'EMAIL ADDRESS',
    type: 'email',
    autoComplete: 'email',
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'PHONE NUMBER',
    type: 'tel',
    autoComplete: 'tel',
  },
  {
    id: 'message',
    name: 'message',
    label: 'MESSAGE',
    type: 'textarea',
    autoComplete: 'off',
  },
];
