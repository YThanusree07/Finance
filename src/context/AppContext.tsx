import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  PaymentCard,
  Transaction,
  SavingGoal,
  NotificationItemData,
  MoneyRequestData,
} from '../types';
import { initialCards } from '../data/mockCards';
import { initialTransactions } from '../data/mockTransactions';
import { initialSavings } from '../data/mockSavings';
import { initialNotifications } from '../data/mockNotifications';
import { initialRequests } from '../data/mockRequests';
import { generateReferenceNo } from '../utils/formatters';

interface AppContextType {
  balance: number;
  cards: PaymentCard[];
  transactions: Transaction[];
  savings: SavingGoal[];
  notifications: NotificationItemData[];
  requests: MoneyRequestData[];
  topUp: (amount: number, cardId?: string) => void;
  sendMoney: (
    recipientName: string,
    amount: number,
    fee?: number,
    description?: string,
    cardId?: string
  ) => Transaction;
  addCard: (newCard: Omit<PaymentCard, 'id'>) => void;
  acceptRequest: (requestId: string) => void;
  declineRequest: (requestId: string) => void;
  markAllNotificationsRead: () => void;
  updateSavingProgress: (savingId: string, addedAmount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(2887.65);
  const [cards, setCards] = useState<PaymentCard[]>(initialCards);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [savings, setSavings] = useState<SavingGoal[]>(initialSavings);
  const [notifications, setNotifications] =
    useState<NotificationItemData[]>(initialNotifications);
  const [requests, setRequests] = useState<MoneyRequestData[]>(initialRequests);

  const topUp = (amount: number, cardId?: string) => {
    setBalance((prev) => prev + amount);

    // Update card balance if cardId provided
    if (cardId) {
      setCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, balance: c.balance + amount } : c))
      );
    }

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      name: 'ShieldPay Top Up',
      description: 'Account balance top up',
      amount,
      type: 'topup',
      status: 'completed',
      date: 'Today, Just now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      referenceNo: generateReferenceNo(),
      fee: 0,
      total: amount,
    };

    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItemData = {
      id: `notif_${Date.now()}`,
      title: 'Top Up Successful',
      message: `You have successfully topped up $${amount.toFixed(2)} to your balance`,
      amount,
      timestamp: 'Just now',
      type: 'income',
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  const sendMoney = (
    recipientName: string,
    amount: number,
    fee = 0,
    description = 'Money transfer',
    cardId?: string
  ): Transaction => {
    const total = amount + fee;
    setBalance((prev) => Math.max(0, prev - total));

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      name: recipientName,
      description: description || 'Transfer payment',
      amount,
      type: 'send',
      status: 'completed',
      date: 'Today, Just now',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      referenceNo: generateReferenceNo(),
      fee,
      total,
      cardUsed: cardId ? 'Debit Card' : 'ShieldPay Wallet',
    };

    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItemData = {
      id: `notif_${Date.now()}`,
      title: 'Money Sent',
      message: `You have sent $${amount.toFixed(2)} to ${recipientName}`,
      amount,
      timestamp: 'Just now',
      type: 'expense',
      read: false,
    };

    setNotifications((prev) => [newNotif, ...prev]);
    return newTx;
  };

  const addCard = (newCardData: Omit<PaymentCard, 'id'>) => {
    const newCard: PaymentCard = {
      ...newCardData,
      id: `card_${Date.now()}`,
    };
    setCards((prev) => [newCard, ...prev]);

    const newNotif: NotificationItemData = {
      id: `notif_${Date.now()}`,
      title: 'New Card Added',
      message: `Card ending in ${newCard.maskedNumber.slice(-4)} has been added successfully`,
      timestamp: 'Just now',
      type: 'card',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const acceptRequest = (requestId: string) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    sendMoney(req.requesterName, req.amount, 0, `Accepted money request: ${req.note || ''}`);
  };

  const declineRequest = (requestId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const updateSavingProgress = (savingId: string, addedAmount: number) => {
    setSavings((prev) =>
      prev.map((s) =>
        s.id === savingId
          ? { ...s, currentAmount: Math.min(s.targetAmount, s.currentAmount + addedAmount) }
          : s
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        balance,
        cards,
        transactions,
        savings,
        notifications,
        requests,
        topUp,
        sendMoney,
        addCard,
        acceptRequest,
        declineRequest,
        markAllNotificationsRead,
        updateSavingProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
