import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { PinInputDots } from '../../components/inputs/PinInputDots';
import { NumericKeypad } from '../../components/inputs/NumericKeypad';

type Props = NativeStackScreenProps<AuthStackParamList, 'CreatePin'>;

export const CreatePinScreen: React.FC<Props> = ({ navigation, route }) => {
  const [pin, setPin] = useState<string>('');
  const email = route.params?.email;
  const name = route.params?.name;

  const handlePressDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);

      if (nextPin.length === 4) {
        setTimeout(() => {
          navigation.navigate('ConfirmPin', { pin: nextPin, email, name });
          setPin('');
        }, 250);
      }
    }
  };

  const handlePressDelete = () => {
    if (pin.length > 0) {
      setPin((prev) => prev.slice(0, -1));
    }
  };

  return (
    <ScreenContainer backgroundColor={colors.white}>
      <AppHeader onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Create password</Text>
          <Text style={styles.subtitle}>
            Enter 4 digits number for your PIN passcode to secure your wallet.
          </Text>

          <PinInputDots value={pin} />
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
  keypad: {
    paddingBottom: spacing.md,
  },
});
