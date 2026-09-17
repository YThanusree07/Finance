import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { NumericKeypad } from '../../components/inputs/NumericKeypad';
import { CustomTextInput } from '../../components/inputs/CustomTextInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { PlusIcon, MinusIcon } from '../../assets/icons';

type Props = NativeStackScreenProps<RootStackParamList, 'SendMoneyKeypad'>;

export const SendMoneyKeypadScreen: React.FC<Props> = ({ navigation, route }) => {
  const [amountStr, setAmountStr] = useState<string>('58.90');
  const [description, setDescription] = useState<string>('Dinner payment share');

  const defaultRecipient = {
    name: 'Jouye Medison',
    phone: '+1 234 567 8921',
    avatar: 'JM',
  };

  const recipient = route.params?.recipient || defaultRecipient;

  const handlePressDigit = (digit: string) => {
    if (amountStr === '0' || amountStr === '0.00') {
      setAmountStr(digit);
    } else if (amountStr.length < 7) {
      setAmountStr((prev) => prev + digit);
    }
  };

  const handlePressDelete = () => {
    if (amountStr.length > 1) {
      setAmountStr((prev) => prev.slice(0, -1));
    } else {
      setAmountStr('0');
    }
  };

  const handleIncrement = () => {
    const val = parseFloat(amountStr) || 0;
    setAmountStr((val + 5).toFixed(2));
  };

  const handleDecrement = () => {
    const val = parseFloat(amountStr) || 0;
    setAmountStr(Math.max(1, val - 5).toFixed(2));
  };

  const handleNext = () => {
    const numericAmount = parseFloat(amountStr) || 50;
    navigation.navigate('SendMoneyPreset', {
      recipient,
      amount: numericAmount,
      description,
    });
  };

  return (
    <ScreenContainer backgroundColor={colors.white}>
      <AppHeader
        title="Send Money"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Recipient Profile Card */}
        <View style={styles.recipientCard}>
          <View style={styles.recipientAvatar}>
            <Text style={styles.recipientInitials}>
              {recipient.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Text>
          </View>
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientName}>{recipient.name}</Text>
            <Text style={styles.recipientPhone}>{recipient.phone}</Text>
          </View>
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount of Money</Text>

          <View style={styles.amountRow}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={handleDecrement}
              activeOpacity={0.7}
            >
              <MinusIcon size={18} color={colors.primaryNavy} />
            </TouchableOpacity>

            <Text style={styles.amountText}>${amountStr}</Text>

            <TouchableOpacity
              style={styles.stepBtn}
              onPress={handleIncrement}
              activeOpacity={0.7}
            >
              <PlusIcon size={18} color={colors.primaryNavy} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Note / Description input */}
        <CustomTextInput
          placeholder="Add a note (e.g. Lunch, Split bill)"
          value={description}
          onChangeText={setDescription}
          containerStyle={styles.noteInput}
        />

        {/* Custom Numeric Keypad */}
        <NumericKeypad
          onPressDigit={handlePressDigit}
          onPressDelete={handlePressDelete}
          style={styles.keypad}
        />

        {/* Primary Action */}
        <PrimaryButton
          title="Send Money"
          onPress={handleNext}
          style={styles.sendBtn}
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
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  recipientAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lavenderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  recipientInitials: {
    ...typography.title,
    color: colors.lavenderDark,
    fontWeight: '700',
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    ...typography.title,
    color: colors.textDark,
  },
  recipientPhone: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  amountSection: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  amountLabel: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  stepBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    ...typography.balance,
    color: colors.primaryNavy,
    marginHorizontal: spacing.xl,
  },
  noteInput: {
    marginBottom: spacing.xs,
  },
  keypad: {
    marginVertical: spacing.xs,
  },
  sendBtn: {
    marginTop: spacing.xs,
  },
});
