import React from 'react';
import { Link } from 'react-router-dom';

export const homeFaqs = [
  {
    id: 'home-1',
    question: 'What is Acecore?',
    answer:
      'Not what, Who? Acecore is a clean energy company that indigeneously designs, manufactures, and deploys clean energy solutions for homes and businesses.',
  },
  // {
  //   id: 'home-2',
  //   question: 'Are Acecore solar panels efficient?',
  //   answer:
  //     'Yes. Acecore panels are engineered for high conversion efficiency so you get strong energy output from the available sunlight.',
  // },
  {
    id: 'home-3',
    question: 'Do Acecore products come with warranties?',
    answer:
      'Acecore products include manufacturer-backed warranties covering performance and workmanship. Details vary by product line.',
  },
  {
    id: 'home-4',
    question: 'Is Acecore committed to sustainability?',
    answer:
      'Yes. Acecore is built around clean energy generation, efficient storage, and smarter consumption to reduce reliance on fossil fuels.',
  },
  {
    id: 'home-5',
    question: 'What types of solar solutions does Acecore offer?',
    answer:
      'Acecore offers solar generation, Powercell storage, monitoring software, and integrated energy management for residential and business use.',
  },
  {
    id: 'home-6',
    question: 'How can I contact Acecore for more information?',
    answer: [
      'Reach the Acecore team through the ',
      React.createElement(Link, { to: '/support', className: 'faq-support-link' }, 'Contact Us'),
      ' page on the website.',
    ],
  },
  {
    id: 'home-7',
    question: 'Are Acecore products suitable for off-grid installations?',
    answer:
      'Selected Acecore configurations support off-grid and backup use cases. Our team can help size the right setup for your load profile. With the help of our Powercore app you can optimize your system remotely for off-grid performace.',
  },
  {
    id: 'home-8',
    question: 'Can Acecore products be integrated with existing solar systems?',
    answer:
      'The Powercell and Powercore App is designed to replace your existing inverter and battery system rather than integrate with it. However, you can continue using your existing solar panels with Powercell, provided they are still in good working condition and meet the required specifications.',
  },
  {
    id: 'home-9',
    question: 'Do i need to buy anything else asides from solar panels and The Powercell?',
    answer:
      'Depending on your site, you may also need mounting, cabling, protection devices, and professional installation. We will guide you through required components.',
  },
  {
    id: 'home-10',
    question: 'Can I track the performance of my Acecore Powercell remotely?',
    answer:
      'Yes. With the Powercore app, you can monitor and control your Powercell in real-time from anywhere in the world .',
  },
];

export const productFaqs = [
  {
    id: 'product-1',
    question: 'What capacity does the Powercell offer?',
    answer:
      'Powercell models are designed around residential and business loads, with 5KVA and 10KVA configurations featured prominently.',
  },
];

export const pricingFaqs = [
  {
    id: 'pricing-1',
    question: 'Can I finance a Powercell?',
    answer:
      'Instalment options are available on selected models. Contact sales for current financing details.',
  },
];
