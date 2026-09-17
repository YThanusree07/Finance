import { SavingGoal } from '../types';

export const initialSavings: SavingGoal[] = [
  {
    id: 'sav_001',
    title: 'Buy Playstation',
    targetAmount: 600,
    currentAmount: 450,
    category: 'Gaming',
    color: '#7B61FF',
    icon: 'gamepad',
  },
  {
    id: 'sav_002',
    title: 'Buy Mini Vespa',
    targetAmount: 1800,
    currentAmount: 1200,
    category: 'Vehicle',
    color: '#FFA800',
    icon: 'scooter',
  },
  {
    id: 'sav_003',
    title: 'Buy Barbie Doll',
    targetAmount: 100,
    currentAmount: 80,
    category: 'Toys',
    color: '#EC4899',
    icon: 'gift',
  },
  {
    id: 'sav_004',
    title: 'Buy Bicycle',
    targetAmount: 400,
    currentAmount: 320,
    category: 'Sport',
    color: '#10B981',
    icon: 'bicycle',
  },
];
