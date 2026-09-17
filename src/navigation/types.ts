import { Transaction } from '../types';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Register: undefined;
  CreatePin: { email?: string; name?: string } | undefined;
  ConfirmPin: { pin: string; email?: string; name?: string };
  PhoneRegister: { pin: string; email?: string; name?: string };
  VerifyOtp: { phone: string; pin: string; email?: string; name?: string };
  AccountCreated: { name?: string } | undefined;
  Login: undefined;
  ForgotPassword: undefined;
  ChangePassword: { email?: string } | undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  HistoryTab: { initialTab?: 'all' | 'send' | 'request' } | undefined;
  StatisticTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  AuthStack: undefined;
  MainTabs: undefined;
  Notifications: undefined;
  RequestMoney: undefined;
  PayQr: { initialTab?: 'scan' | 'myqr' } | undefined;
  TopUp: undefined;
  Cards: undefined;
  AddCard: undefined;
  SendMoneyKeypad: { recipient?: { name: string; avatar?: string; phone?: string } } | undefined;
  SendMoneyPreset: {
    recipient: { name: string; avatar?: string; phone?: string };
    amount: number;
    description?: string;
  };
  SendMoneyConfirm: {
    recipient: { name: string; avatar?: string; phone?: string };
    amount: number;
    description?: string;
    cardId?: string;
  };
  SendMoneySuccess: { transaction: Transaction };
  EditProfile: undefined;
  HelpCenter: undefined;
  ChangePasswordDirect: undefined;
};
