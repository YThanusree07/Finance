export const formatCurrency = (amount: number, includeDecimals = true): string => {
  if (isNaN(amount)) return '$0.00';
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  })}`;
};

export const maskCardNumber = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\s+/g, '');
  if (cleaned.length < 4) return cardNumber;
  const last4 = cleaned.slice(-4);
  return `**** **** **** ${last4}`;
};

export const formatCardNumberInput = (text: string): string => {
  const cleaned = text.replace(/\D/g, '').slice(0, 16);
  const parts = cleaned.match(/[\s\S]{1,4}/g) || [];
  return parts.join(' ');
};

export const formatExpiryDate = (text: string): string => {
  const cleaned = text.replace(/\D/g, '').slice(0, 4);
  if (cleaned.length >= 3) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  }
  return cleaned;
};

export const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return email;
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user}***@${domain}`;
  return `${user.slice(0, 2)}***@${domain}`;
};

export const formatPhoneNumber = (phone: string): string => {
  return phone;
};

export const generateReferenceNo = (): string => {
  const random = Math.floor(100000000 + Math.random() * 900000000);
  return `TRX-${random}`;
};
