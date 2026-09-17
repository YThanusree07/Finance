export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  maskedEmail: string;
  phone: string;
  birthday: string;
  address: string;
  addressLine2?: string;
  description: string;
  avatarUrl: string;
  hideAccount: boolean;
  balance: number;
}

export interface PaymentCard {
  id: string;
  cardNumber: string;
  maskedNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvc: string;
  balance: number;
  cardType: 'mastercard' | 'visa' | 'debit';
  isDefault?: boolean;
  colorScheme?: 'navy' | 'purple' | 'darkNavy';
}

export type TransactionType = 'send' | 'receive' | 'topup' | 'request';
export type TransactionStatus = 'completed' | 'pending' | 'declined';

export interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  date: string;
  time: string;
  avatarUrl?: string;
  referenceNo: string;
  fee: number;
  total: number;
  cardUsed?: string;
}

export interface SavingGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  color: string;
  icon: string;
}

export interface NotificationItemData {
  id: string;
  title: string;
  message: string;
  amount?: number;
  timestamp: string;
  type: 'income' | 'expense' | 'system' | 'card';
  read: boolean;
  avatarUrl?: string;
}

export interface MoneyRequestData {
  id: string;
  requesterName: string;
  requesterAvatar: string;
  amount: number;
  date: string;
  note?: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FaqCategory {
  id: string;
  name: string;
  icon: string;
}
