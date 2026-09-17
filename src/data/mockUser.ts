import { User } from '../types';

export const initialUser: User = {
  id: 'usr_001',
  name: 'Alexander Michael',
  firstName: 'Alexander',
  lastName: 'Michael',
  email: 'alexander.michael@shieldpay.com',
  maskedEmail: 'al***@gmail.com',
  phone: '+1 234 567 8900',
  birthday: '12 May 1995',
  address: '4517 Washington Ave. Manchester, Kentucky 39495',
  addressLine2: 'Apt 4B',
  description: 'Mobile finance enthusiast & ShieldPay premium member.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  hideAccount: false,
  balance: 2887.65,
};
