import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MoneyRequestData } from '../../types';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface MoneyRequestItemViewProps {
  request: MoneyRequestData;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  style?: ViewStyle;
}

export const MoneyRequestItemView: React.FC<MoneyRequestItemViewProps> = ({
  request,
  onAccept,
  onDecline,
  style,
}) => {
  const initials = request.requesterName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={[styles.container, style]}>
      <View style={styles.topRow}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{request.requesterName}</Text>
          <Text style={styles.date}>{request.date}</Text>
          {request.note ? <Text style={styles.note}>{request.note}</Text> : null}
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Requested</Text>
          <Text style={styles.amount}>{formatCurrency(request.amount)}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.declineButton}
          onPress={() => onDecline(request.id)}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Decline request"
        >
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => onAccept(request.id)}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Accept request"
        >
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
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
    fontSize: 14,
    fontWeight: '700',
    color: colors.lavenderDark,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    ...typography.title,
    color: colors.textDark,
  },
  date: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  note: {
    ...typography.bodySmall,
    color: colors.textBody,
    marginTop: 4,
    fontStyle: 'italic',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountLabel: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSubtle,
    textTransform: 'uppercase',
  },
  amount: {
    ...typography.title,
    fontWeight: '700',
    color: colors.primaryNavy,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    gap: spacing.md,
  },
  declineButton: {
    flex: 1,
    height: 40,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.inputBackground,
  },
  declineText: {
    ...typography.subtitle,
    fontWeight: '600',
    color: colors.textMuted,
  },
  acceptButton: {
    flex: 1,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryNavy,
  },
  acceptText: {
    ...typography.subtitle,
    fontWeight: '600',
    color: colors.white,
  },
});
