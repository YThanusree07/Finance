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
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { CardPickerModal } from '../../components/modals/CardPickerModal';
import { MastercardLogo, VisaLogo, ChevronDownIcon } from '../../assets/icons';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'SendMoneyConfirm'>;

export const SendMoneyConfirmScreen: React.FC<Props> = ({ navigation, route }) => {
  const { recipient, amount, description } = route.params;
  const { cards, sendMoney } = useApp();
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || 'card_001');
  const [showCardModal, setShowCardModal] = useState<boolean>(false);

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];
  const adminFee = 0.0;
  const totalAmount = amount + adminFee;

  const handleSendMoney = () => {
    const tx = sendMoney(
      recipient.name,
      amount,
      adminFee,
      description || 'Direct payment transfer',
      selectedCard.id
    );

    navigation.replace('SendMoneySuccess', { transaction: tx });
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.white}>
      <AppHeader
        title="Confirmation"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Payment Source Card */}
        <Text style={styles.sectionLabel}>Payment Method</Text>
        <TouchableOpacity
          style={styles.cardSelector}
          onPress={() => setShowCardModal(true)}
          activeOpacity={0.8}
        >
          <View style={styles.cardLeft}>
            <View style={styles.cardLogo}>
              {selectedCard.cardType === 'visa' ? (
                <VisaLogo size={28} />
              ) : (
                <MastercardLogo size={28} />
              )}
            </View>
            <View>
              <Text style={styles.cardTypeTitle}>
                {selectedCard.cardType.toUpperCase()} CARD
              </Text>
              <Text style={styles.cardBalance}>
                Balance: {formatCurrency(selectedCard.balance)}
              </Text>
            </View>
          </View>

          <View style={styles.cardRight}>
            <Text style={styles.cardEnding}>
              •••• {selectedCard.maskedNumber.slice(-4)}
            </Text>
            <ChevronDownIcon size={18} color={colors.textMuted} />
          </View>
        </TouchableOpacity>

        {/* Send To Recipient Card */}
        <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>
          Send To
        </Text>
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
        </View>

        {/* Transfer Breakdown Receipt */}
        <Text style={[styles.sectionLabel, { marginTop: spacing.xl }]}>
          Payment Details
        </Text>
        <View style={styles.receiptCard}>
          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Amount</Text>
            <Text style={styles.receiptValue}>{formatCurrency(amount)}</Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptLabel}>Admin Fee</Text>
            <Text style={[styles.receiptValue, { color: colors.success }]}>
              {adminFee === 0 ? 'Free' : formatCurrency(adminFee)}
            </Text>
          </View>

          <View style={styles.receiptDivider} />

          <View style={styles.receiptRow}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalValue}>{formatCurrency(totalAmount)}</Text>
          </View>
        </View>

        {/* Primary Action Button */}
        <PrimaryButton
          title="Send Money"
          onPress={handleSendMoney}
          style={styles.confirmBtn}
        />
      </View>

      {/* Card Selection Modal */}
      <CardPickerModal
        visible={showCardModal}
        cards={cards}
        selectedCardId={selectedCard.id}
        onSelectCard={(c) => setSelectedCardId(c.id)}
        onClose={() => setShowCardModal(false)}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  sectionLabel: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.xs + 2,
  },
  cardSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.md + 2,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLogo: {
    marginRight: spacing.md,
  },
  cardTypeTitle: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  cardBalance: {
    ...typography.subtitle,
    fontWeight: '700',
    color: colors.primaryNavy,
    marginTop: 2,
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardEnding: {
    ...typography.caption,
    color: colors.textMuted,
    marginRight: spacing.xs,
  },
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.md + 2,
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
  receiptCard: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  receiptLabel: {
    ...typography.body,
    color: colors.textMuted,
  },
  receiptValue: {
    ...typography.title,
    color: colors.textDark,
  },
  receiptDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  totalLabel: {
    ...typography.h4,
    color: colors.primaryNavy,
  },
  totalValue: {
    ...typography.h3,
    color: colors.primaryNavy,
    fontWeight: '700',
  },
  confirmBtn: {
    marginTop: spacing.xxl,
  },
});
