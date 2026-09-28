export const comparisonCopy = {
  eyebrow: 'COMPARE MODELS',
  title: 'Find the Right Powercell for Your Needs.',
  description:
    'Compare Powercell models to find the ideal balance of capacity, performance, and value for your home or business.',
  featureHeader: 'Feature Specifications',
  chooseLabel: 'Choose',
};

export const comparisonProducts = [
  {
    id: 'price',
    name: 'Price',
    subtitle: 'Essential',
    recommended: false,
  },
  {
    id: 'primePlus',
    name: 'Prime+',
    subtitle: 'Best value',
    recommended: true,
  },
  {
    id: 'ultra',
    name: 'Ultra',
    subtitle: 'Maximum',
    recommended: false,
  },
];

export const comparisonSpecifications = [
  {
    id: 'nominal-power',
    label: 'Nominal Power Capacity',
    values: { price: '3500W', primePlus: '5000W', ultra: '10000W' },
  },
  {
    id: 'nominal-energy',
    label: 'Nominal Battery Energy',
    values: { price: '5kWh', primePlus: '10kWh', ultra: '15kWh' },
  },
  {
    id: 'grid-voltage',
    label: 'Nominal Grid Voltage (input / Output)',
    values: {
      price: '120/240 VAC',
      primePlus: '120/240 VAC',
      ultra: '120/240 VAC',
    },
  },
  {
    id: 'frequency',
    label: 'Frequency',
    values: { price: '60 Hz', primePlus: '60 Hz', ultra: '60 Hz' },
  },
  {
    id: 'max-continuous-power',
    label: 'Maximum Continuous Power',
    values: {
      price: '6kW with sun\n5.5kW no sun',
      primePlus: '6kW with sun\n5.5kW no sun',
      ultra: '12kW with sun\n10.5kW no sun',
    },
  },
  {
    id: 'off-grid-power',
    label: 'Off-grid power (10s)',
    values: {
      price: '20kW with sun\n15kW no sun',
      primePlus: '20kW with sun\n15kW no sun',
      ultra: '25kW with sun\n20kW no sun',
    },
  },
  {
    id: 'max-continuous-current',
    label: 'Maximum continuous current (AC)',
    values: { price: '30A', primePlus: '30A', ultra: '30A' },
  },
  {
    id: 'start-capacity',
    label: 'Load start capacity',
    values: { price: '98 - 118 LRA', primePlus: '98 - 118 LRA', ultra: '98 - 118 LRA' },
  },
  {
    id: 'overcurrent',
    label: 'Overcurrent protection device',
    values: { price: '50A breaker', primePlus: '50A breaker', ultra: '50A breaker' },
  },
  {
    id: 'power-factor',
    label: 'Output Power factor ratings',
    values: { price: '±0.9 to 0.9', primePlus: '±0.9 to 0.9', ultra: '±0.9 to 0.9' },
  },
  {
    id: 'max-input-voltage',
    label: 'PV Maximum input voltage',
    values: { price: '600 VDC', primePlus: '600 VDC', ultra: '600 VDC' },
  },
  {
    id: 'input-voltage-range',
    label: 'PV DC Input Voltage Range',
    values: { price: '60 - 550 VDC', primePlus: '60 - 550 VDC', ultra: '60 - 550 VDC' },
  },
  
  {
    id: 'dc-ac-ratio',
    label: 'Allowable DC/AC ratio',
    values: { price: '1.7A', primePlus: '1.7A', ultra: '1.7A' },
  },
  {
    id: 'fault-current',
    label: 'Maximum supply fault current',
    values: { price: '60A', primePlus: '60A', ultra: '60A' },
  },
  {
    id: 'round-trip',
    label: 'Round trip efficiency',
    values: { price: '90%', primePlus: '90%', ultra: '90%' },
  },
  {
    id: 'cec-efficiency',
    label: 'Solar Generation GEC efficiency',
    values: {
      price: '97.5% at 208 V\n98% at 240 V',
      primePlus: '97.5% at 208 V\n98% at 240 V',
      ultra: '97.5% at 208 V\n98% at 240 V',
    },
  },
  {
    id: 'user-interface',
    label: 'User interface',
    values: {
      price: 'Powercore mobile App',
      primePlus: 'Powercore mobile App',
      ultra: 'Powercore mobile App',
    },
  },
  {
    id: 'connectivity',
    label: 'Internet connectivity',
    values: { price: 'Wi-Fi', primePlus: 'Wi-Fi', ultra: 'Wi-Fi' },
  },
  {
    id: 'cooling',
    label: 'Cooling',
    values: { price: 'Hybrid Cooling system', primePlus: 'Hybrid Cooling system', ultra: 'Hybrid cooling system' },
  },
  {
    id: 'protections',
    label: 'Protections',
    values: {
      price: 'Integrated arc circuit interrupter (AFCI), PV rapid shutdown',
      primePlus: 'Integrated arc circuit interrupter (AFCI), PV rapid shutdown',
      ultra:
        'Integrated arc circuit interrupter (AFCI), PV rapid shutdown, fire suppression system',
    },
  },
    {
    id: 'mppt-imp',
    label: 'Maximum current per MPPT (Imp)',
    values: { price: '30A', primePlus: '50A', ultra: '80A' },
  },
  {
    id: 'mppt-isc',
    label: 'Maximum short circuit current per MPPT (Isc)',
    values: { price: '35A', primePlus: '54A', ultra: '54A' },
  },
  {
    id: 'warranty',
    label: 'Warranty',
    values: { price: '1 Year', primePlus: '1 Year', ultra: '1' },
  },
];

export const comparisonFootnotes = [
  'Values provided for 25°C (77°F), 3.8 kW charge/discharge power.',
  'Load start capability may vary.',
  'Power factor rating at max real power.',
  'Connectivity subject to network service coverage and signal strength.',
];

export const defaultComparisonProductId = 'primePlus';
