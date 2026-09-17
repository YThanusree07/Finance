import { MoneyRequestData } from '../types';

export const initialRequests: MoneyRequestData[] = [
  {
    id: 'req_001',
    requesterName: 'Angela Anggi',
    requesterAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120',
    amount: 220.0,
    date: 'Today, 24 May',
    note: 'Flight booking share to Bali',
    status: 'pending',
  },
  {
    id: 'req_002',
    requesterName: 'Yossy Angela',
    requesterAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120',
    amount: 45.0,
    date: '20 May 2026',
    note: 'Reimbursement for concert ticket',
    status: 'pending',
  },
  {
    id: 'req_003',
    requesterName: 'John Kealn',
    requesterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    amount: 85.5,
    date: '18 May 2026',
    note: 'Office lunch catering share',
    status: 'pending',
  },
];
