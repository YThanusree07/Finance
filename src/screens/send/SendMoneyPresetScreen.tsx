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
import { PresetAmountGrid } from '../../components/inputs/PresetAmountGrid';
import { AmountSlider } from '../../components/inputs/AmountSlider';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { EditIcon } from '../../assets/icons';

type Props = NativeStackScreenProps<RootStackParamList, 'SendMoneyPreset'>;

export const SendMoneyPresetScreen: React.FC<Props> = ({ navigation, route }) => {
  const { recipient, amount: initialAmount, description } = route.params;
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount || 150);

  const handleNext = () => {
    navigation.navigate('SendMoneyConfirm', {
      recipient,
      amount: selectedAmount,
      description,
    });
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.white}>
      <AppHeader
        title="Send Money"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Recipient Card with Edit Option */}
        <View style={styles.recipientCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
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

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.editBtn}
            activeOpacity={0.7}
          >
            <EditIcon size={18} color={colors.lavender} />
          </TouchableOpacity>
        </View>

        {/* Set Nominal Display */}
        <View style={styles.nominalSection}>
          <Text style={styles.nominalLabel}>Set the nominal send</Text>
          <Text style={styles.nominalAmount}>${selectedAmount}</Text>
        </View>

        {/* Interactive Slider */}
        <AmountSlider
          value={selectedAmount}
          min={10}
          max={500}
          step={10}
          onValueChange={(val) => setSelectedAmount(val)}
        />

        {/* Preset Amount Grid */}
        <Text style={styles.presetHeading}>Preset Amount</Text>
        <PresetAmountGrid
          selectedAmount={selectedAmount}
          onSelectAmount={(amt) => setSelectedAmount(amt)}
        />

        {/* Primary Action Button */}
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.md + 2,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lavenderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
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
  editBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nominalSection: {
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.xxl,
    paddingVertical: spacing.lg,
    marginBottom: spacing.xs,
  },
  nominalLabel: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  nominalAmount: {
    ...typography.amountLarge,
    color: colors.primaryNavy,
    marginTop: spacing.xs,
  },
  presetHeading: {
    ...typography.subtitle,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sendBtn: {
    marginTop: spacing.xxl,
  },
});
