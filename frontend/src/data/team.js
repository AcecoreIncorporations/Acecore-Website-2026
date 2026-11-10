import leadership1 from '../assets/images/team/leadership-1.jpg';
import leadership2 from '../assets/images/team/leadership-2.jpg';
import leadership3 from '../assets/images/team/leadership-3.jpg';
import leadership4 from '../assets/images/team/leadership-4.jpg';
import leadership5 from '../assets/images/team/leadership-5.jpg';
import leadership6 from '../assets/images/team/leadership-6.jpg';
import operations1 from '../assets/images/team/operations-1.jpg';
import operations2 from '../assets/images/team/operations-2.jpg';
import operations3 from '../assets/images/team/operations-3.jpg';
import operations4 from '../assets/images/team/operations-4.jpg';

export const teamPageCopy = {
  eyebrow: 'MEET THE TEAM',
  hero: {
    title: 'The people powering Acecore',
    description:
      'Find guides, answers, and troubleshooting help for your Powercell and PowerCore app.',
  },
  closing: {
    title: 'Different disciplines. One mission.',
    description:
      'Find guides, answers, and troubleshooting help for your Powercell and PowerCore app.',
  },
  imageAlt: 'Acecore team members together',
};

const leadershipImages = [
  leadership1,
  leadership2,
  leadership3,
  leadership4,
  leadership5,
  leadership6,
];

const operationsImages = [operations1, operations2, operations3, operations4];

const leadershipMembers = [
  { name: 'Caleb Iwuoha', role: 'Chief Executive Officer / Head of Hardware' },
  { name: 'Chikezie Okoro', role: 'Chief Technical Officer / Chief Brand Officer' },
  { name: 'Chimka Anyanwu', role: 'Chief Sales & Marketing Officer' },
  { name: 'Collins Okonkwo', role: 'Chief Financial Officer' },
  { name: 'Adimchinobi Ogbonnia', role: 'Chief Operations Officer' },
  { name: 'Innocent Destiny', role: 'Head of Software Engineering' },
];

const operationsMembers = [
  { name: 'Chidubem Nwora', role: 'Hardware Engineer' },
  { name: 'Thankgod Ekom', role: 'Hardware Engineer' },
  { name: 'Godspower Ndukwe', role: 'Hardware Engineer' },
  { name: 'Augustine Ubong', role: 'Inventory Manager' },
];

function buildMembers(groupId, imageSet = [], memberData = []) {
  return imageSet.map((image, index) => ({
    id: `${groupId}-${index + 1}`,
    name: memberData[index]?.name ?? null,
    role: memberData[index]?.role ?? null,
    image,
  }));
}

export const teamGroups = [
  {
    id: 'leadership',
    title: 'Leadership',
    description: 'Setting the direction for a smarter energy future.',
    members: buildMembers('leadership', leadershipImages, leadershipMembers),
  },

  {
    id: 'operations',
    title: 'Operations',
    description: 'Keeping the people, products, and processes moving.',
    members: buildMembers('operations', operationsImages, operationsMembers),
  },
];
