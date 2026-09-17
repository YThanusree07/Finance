import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { PinInputDots } from '../../components/inputs/PinInputDots';
import { NumericKeypad } from '../../components/inputs/NumericKeypad';

type Props = NativeStackScreenProps<AuthStackParamList, 'ConfirmPin'>;

export const ConfirmPinScreen: React.FC<Props> = ({ navigation, route }) => {
  const [pin, setPin] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);
  const originalPin = route.params.pin;
  const email = route.params.email;
  const name = route.params.name;

  const handlePressDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setHasError(false);

      if (nextPin.length === 4) {
        if (nextPin === originalPin) {
          setTimeout(() => {
            navigation.navigate('PhoneRegister', {
              pin: nextPin,
              email,
              name,
            });
          }, 250);
        } else {
          setTimeout(() => {
            setHasError(true);
            setPin('');
          }, 300);
        }
      }
    }
  };

  const handlePressDelete = () => {
    if (pin.length > 0) {
      setPin((prev) => prev.slice(0, -1));
      setHasError(false);
    }
  };

  return (
    <ScreenContainer backgroundColor={colors.white}>
      <AppHeader onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Confirm password</Text>
          <Text style={styles.subtitle}>
            Please re-enter your 4-digit PIN passcode to confirm.
          </Text>

          <PinInputDots value={pin} error={hasError} />

          {hasError ? (
            <Text style={styles.errorText}>PIN does not match. Please try again.</Text>
          ) : null}
        </View>

        <NumericKeypad
          onPressDigit={handlePressDigit}
          onPressDelete={handlePressDelete}
          style={styles.keypad}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
  },
  headerSection: {
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.primaryNavy,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    paddingHorizontal: spacing.xl,
    lineHeight: 20,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginTop: -spacing.md,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  keypad: {
    paddingBottom: spacing.md,
  },
});
