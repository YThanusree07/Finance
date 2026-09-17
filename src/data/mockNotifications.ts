import { NotificationItemData } from '../types';

export const initialNotifications: NotificationItemData[] = [
  {
    id: 'notif_001',
    title: 'Money Received',
    message: 'You have received money from Lucas Abraham',
    amount: 350.0,
    timestamp: '2 mins ago',
    type: 'income',
    read: false,
  },
  {
    id: 'notif_002',
    title: 'Money Sent',
    message: 'You have sent money to Jouye Medison',
    amount: 120.0,
    timestamp: '2 hours ago',
    type: 'expense',
    read: false,
  },
  {
    id: 'notif_003',
    title: 'Security Alert',
    message: 'Your ShieldPay PIN was successfully updated',
    timestamp: '1 day ago',
    type: 'system',
    read: true,
  },
  {
    id: 'notif_004',
    title: 'New Card Connected',
    message: 'Debit card ending in 7812 is now active for instant payments',
    timestamp: '2 days ago',
    type: 'card',
    read: true,
  },
  {
    id: 'notif_005',
    title: 'Money Received',
    message: 'You have received money from Jasmine Larasati',
    amount: 28.0,
    timestamp: '3 days ago',
    type: 'income',
    read: true,
  },
];
