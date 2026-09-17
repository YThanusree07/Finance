import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { CheckIcon } from '../../assets/icons';
import { BarcodeVisual } from '../../assets/illustrations';
import { formatCurrency } from '../../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'SendMoneySuccess'>;

export const SendMoneySuccessScreen: React.FC<Props> = ({ navigation, route }) => {
  const { transaction } = route.params;

  const initials = transaction.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleBackHome = () => {
    navigation.navigate('MainTabs');
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.white}>
      <View style={styles.content}>
        {/* Success Check Badge */}
        <View style={styles.successBadgeContainer}>
          <View style={styles.successBadgeOuter}>
            <View style={styles.successBadgeInner}>
              <CheckIcon size={38} color={colors.white} />
            </View>
          </View>
          <Text style={styles.successTitle}>Successfully</Text>
          <Text style={styles.successSubtitle}>
            Your transfer has been completed successfully.
          </Text>
        </View>

        {/* Recipient Profile */}
        <View style={styles.recipientCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.recipientInfo}>
            <Text style={styles.recipientName}>{transaction.name}</Text>
            <Text style={styles.recipientDesc}>{transaction.description}</Text>
          </View>
        </View>

        {/* Itemized Receipt Details */}
        <View style={styles.receiptCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Transfer Amount</Text>
            <Text style={styles.value}>{formatCurrency(transaction.amount)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Admin Fee</Text>
            <Text style={[styles.value, { color: colors.success }]}>
              {transaction.fee === 0 ? 'Free' : formatCurrency(transaction.fee)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Total Payment</Text>
            <Text style={[styles.value, styles.totalAmount]}>
              {formatCurrency(transaction.total)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.label}>Reference No.</Text>
            <Text style={styles.refText}>{transaction.referenceNo}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.dateText}>
              {transaction.date}, {transaction.time}
            </Text>
          </View>

          {/* Barcode Visual */}
          <View style={styles.barcodeContainer}>
            <BarcodeVisual width={240} height={50} />
          </View>
        </View>

        {/* Action Button */}
        <PrimaryButton
          title="Back To Home"
          onPress={handleBackHome}
          style={styles.homeBtn}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  successBadgeContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  successBadgeOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  successBadgeInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    ...typography.h2,
    color: colors.primaryNavy,
  },
  successSubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
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
  recipientDesc: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  receiptCard: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.xs + 2,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  value: {
    ...typography.title,
    color: colors.textDark,
  },
  totalAmount: {
    ...typography.h4,
    color: colors.primaryNavy,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  refText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textDark,
  },
  dateText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  barcodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.lg,
    paddingTop: spacing.sm,
  },
  homeBtn: {
    marginTop: spacing.sm,
  },
});
