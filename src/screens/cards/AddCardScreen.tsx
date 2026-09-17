import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { CustomTextInput } from '../../components/inputs/CustomTextInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { PaymentCardView } from '../../components/cards/PaymentCardView';
import { useApp } from '../../context/AppContext';
import {
  formatCardNumberInput,
  formatExpiryDate,
} from '../../utils/formatters';
import {
  isValidCardNumber,
  isValidExpiryDate,
  isValidCvc,
} from '../../utils/validators';

export const AddCardScreen: React.FC = () => {
  const navigation = useNavigation();
  const { addCard } = useApp();

  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('Alexander Michael');
  const [addressLine1, setAddressLine1] = useState<string>('4517 Washington Ave.');
  const [addressLine2, setAddressLine2] = useState<string>('Manchester, KY 39495');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCardNumberChange = (text: string) => {
    setCardNumber(formatCardNumberInput(text));
    if (errors.cardNumber) setErrors((e) => ({ ...e, cardNumber: '' }));
  };

  const handleExpiryChange = (text: string) => {
    setExpiryDate(formatExpiryDate(text));
    if (errors.expiryDate) setErrors((e) => ({ ...e, expiryDate: '' }));
  };

  const handleSaveCard = () => {
    const newErrors: { [key: string]: string } = {};

    if (!cardNumber || !isValidCardNumber(cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!expiryDate || !isValidExpiryDate(expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    if (!cvc || !isValidCvc(cvc)) {
      newErrors.cvc = 'Enter 3 digits';
    }
    if (!cardHolder.trim()) {
      newErrors.cardHolder = 'Cardholder name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const digitsOnly = cardNumber.replace(/\s+/g, '');
    const isVisa = digitsOnly.startsWith('4');

    addCard({
      cardNumber: digitsOnly,
      maskedNumber: `**** **** **** ${digitsOnly.slice(-4)}`,
      cardHolder,
      expiryDate,
      cvc,
      balance: 1000.0,
      cardType: isVisa ? 'visa' : 'mastercard',
      colorScheme: 'navy',
    });

    Alert.alert('Success', 'Card has been saved to your account.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  // Preview card object for live rendering
  const previewCard = {
    id: 'preview',
    cardNumber: cardNumber || '5412751234124253',
    maskedNumber: cardNumber ? `**** **** **** ${cardNumber.slice(-4)}` : '•••• •••• •••• 4253',
    cardHolder: cardHolder || 'Alexander Michael',
    expiryDate: expiryDate || '09/28',
    cvc: cvc || '843',
    balance: 1000.0,
    cardType: 'mastercard' as const,
    colorScheme: 'navy' as const,
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.white}>
      <AppHeader
        title="Add Card"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Live Card Preview */}
        <View style={styles.previewContainer}>
          <PaymentCardView card={previewCard} compact />
        </View>

        <View style={styles.form}>
          <CustomTextInput
            label="Card Number"
            placeholder="5412 7512 3412 4253"
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            keyboardType="number-pad"
            maxLength={19}
            error={errors.cardNumber}
          />

          <View style={styles.row}>
            <View style={styles.halfCol}>
              <CustomTextInput
                label="Expired Date"
                placeholder="MM/YY"
                value={expiryDate}
                onChangeText={handleExpiryChange}
                keyboardType="number-pad"
                maxLength={5}
                error={errors.expiryDate}
              />
            </View>

            <View style={styles.halfCol}>
              <CustomTextInput
                label="CVC / CVV"
                placeholder="123"
                value={cvc}
                onChangeText={(text) => {
                  setCvc(text.slice(0, 4));
                  if (errors.cvc) setErrors((e) => ({ ...e, cvc: '' }));
                }}
                keyboardType="number-pad"
                maxLength={4}
                error={errors.cvc}
              />
            </View>
          </View>

          <CustomTextInput
            label="Cardholder Name"
            placeholder="Alexander Michael"
            value={cardHolder}
            onChangeText={(text) => {
              setCardHolder(text);
              if (errors.cardHolder) setErrors((e) => ({ ...e, cardHolder: '' }));
            }}
            error={errors.cardHolder}
          />

          <Text style={styles.sectionTitle}>Billing Address</Text>

          <CustomTextInput
            label="Address Line 1"
            placeholder="Street address or P.O. Box"
            value={addressLine1}
            onChangeText={setAddressLine1}
          />

          <CustomTextInput
            label="Address Line 2"
            placeholder="Apt, Suite, Unit, Building, Floor, etc."
            value={addressLine2}
            onChangeText={setAddressLine2}
          />

          <PrimaryButton
            title="Save Card"
            onPress={handleSaveCard}
            style={styles.saveBtn}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfCol: {
    flex: 1,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.textDark,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  saveBtn: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
});
