export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  const phoneDigits = phone.replace(/\D/g, '');
  return phoneDigits.length >= 7;
};

export const isValidPin = (pin: string): boolean => {
  return /^\d{4}$/.test(pin);
};

export const isValidCardNumber = (cardNum: string): boolean => {
  const digits = cardNum.replace(/\D/g, '');
  return digits.length === 16;
};

export const isValidExpiryDate = (expiry: string): boolean => {
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  return regex.test(expiry);
};

export const isValidCvc = (cvc: string): boolean => {
  return /^\d{3,4}$/.test(cvc);
};
