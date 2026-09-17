import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Transaction } from '../../types';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface TransactionItemViewProps {
  transaction: Transaction;
  onPress?: () => void;
  style?: ViewStyle;
}

export const TransactionItemView: React.FC<TransactionItemViewProps> = ({
  transaction,
  onPress,
  style,
}) => {
  const isIncoming = transaction.type === 'receive' || transaction.type === 'topup';

  // Get initials for avatar fallback
  const initials = transaction.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      <View
        style={[
          styles.avatarContainer,
          isIncoming ? styles.avatarIncoming : styles.avatarOutgoing,
        ]}
      >
        <Text
          style={[
            styles.avatarText,
            isIncoming ? styles.avatarTextIncoming : styles.avatarTextOutgoing,
          ]}
        >
          {initials}
        </Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {transaction.name}
        </Text>
        <Text style={styles.description} numberOfLines={1}>
          {transaction.description || transaction.date}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            isIncoming ? styles.amountPositive : styles.amountNegative,
          ]}
        >
          {isIncoming ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </Text>
        <Text style={styles.dateText}>{transaction.date}</Text>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarIncoming: {
    backgroundColor: colors.successLight,
  },
  avatarOutgoing: {
    backgroundColor: colors.lavenderLight,
  },
  avatarText: {
    ...typography.title,
    fontSize: 14,
    fontWeight: '700',
  },
  avatarTextIncoming: {
    color: colors.success,
  },
  avatarTextOutgoing: {
    color: colors.lavenderDark,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    ...typography.title,
    color: colors.textDark,
  },
  description: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    ...typography.title,
    fontWeight: '700',
  },
  amountPositive: {
    color: colors.success,
  },
  amountNegative: {
    color: colors.primaryNavy,
  },
  dateText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSubtle,
    marginTop: 2,
  },
});
