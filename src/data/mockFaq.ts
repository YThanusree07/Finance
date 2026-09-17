import { FaqCategory, FaqItem } from '../types';

export const faqCategories: FaqCategory[] = [
  { id: 'cat_1', name: 'Premium Account', icon: 'shield' },
  { id: 'cat_2', name: 'Business Account', icon: 'briefcase' },
  { id: 'cat_3', name: 'Send Gift', icon: 'gift' },
  { id: 'cat_4', name: 'Buy Gift', icon: 'shopping-bag' },
  { id: 'cat_5', name: 'Like People', icon: 'heart' },
];

export const initialFaqItems: FaqItem[] = [
  {
    id: 'faq_001',
    category: 'Premium Account',
    question: "Why my account can't login",
    answer:
      'If you cannot log in, verify your registered email address and password. Make sure Caps Lock is turned off and your network connection is stable. If you forgot your password, use the "Forgot Password" link on the sign in page to reset your PIN.',
  },
  {
    id: 'faq_002',
    category: 'Premium Account',
    question: 'How to upgrade to ShieldPay Premium?',
    answer:
      'To upgrade to ShieldPay Premium, navigate to Profile > Account > Upgrade to Premium. Premium members enjoy zero admin fees, instant international transfers, and 24/7 dedicated financial support.',
  },
  {
    id: 'faq_003',
    category: 'Business Account',
    question: 'How to switch to Business Account?',
    answer:
      'You can register a merchant or business account by submitting your company registration number and tax ID under Settings > Business Profile.',
  },
  {
    id: 'faq_004',
    category: 'Send Gift',
    question: 'How do virtual gift payments work?',
    answer:
      'When you send a gift payment, the recipient receives a customized greeting card along with instant wallet credits that can be spent or transferred to their bank account.',
  },
  {
    id: 'faq_005',
    category: 'Buy Gift',
    question: 'Can I schedule a gift payment for a future date?',
    answer:
      'Yes! Choose the "Schedule Transfer" option in the Send Money screen and pick any future date and time for automatic delivery.',
  },
  {
    id: 'faq_006',
    category: 'Like People',
    question: 'How do I add friends to my quick contact list?',
    answer:
      'Tap on any contact in your transaction history or search by their ShieldPay phone number or username and tap "Favorite".',
  },
];
