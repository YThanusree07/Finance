import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { NotificationItemData } from '../../types';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { ArrowUpRightIcon, ArrowDownLeftIcon, BellIcon, CardChipIcon } from '../../assets/icons';
import { formatCurrency } from '../../utils/formatters';

interface NotificationItemViewProps {
  item: NotificationItemData;
  onPress?: () => void;
  style?: ViewStyle;
}

export const NotificationItemView: React.FC<NotificationItemViewProps> = ({
  item,
  onPress,
  style,
}) => {
  const getIcon = () => {
    switch (item.type) {
      case 'income':
        return <ArrowDownLeftIcon size={20} color={colors.success} />;
      case 'expense':
        return <ArrowUpRightIcon size={20} color={colors.lavenderDark} />;
      case 'card':
        return <CardChipIcon size={20} />;
      default:
        return <BellIcon size={20} color={colors.orange} />;
    }
  };

  const getIconBg = () => {
    switch (item.type) {
      case 'income':
        return colors.successLight;
      case 'expense':
        return colors.lavenderLight;
      case 'card':
        return colors.orangeLight;
      default:
        return colors.lavenderSoft;
    }
  };

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.container,
        !item.read && styles.unreadContainer,
        style,
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: getIconBg() }]}>
        {getIcon()}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>

        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>

        {item.amount !== undefined ? (
          <Text
            style={[
              styles.amountText,
              item.type === 'income' ? styles.incomeText : styles.expenseText,
            ]}
          >
            {item.type === 'income' ? '+' : '-'}
            {formatCurrency(item.amount)}
          </Text>
        ) : null}
      </View>

      {!item.read ? <View style={styles.unreadDot} /> : null}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md + 2,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    position: 'relative',
  },
  unreadContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.lavenderLight,
    borderLeftWidth: 3.5,
    borderLeftColor: colors.lavender,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    ...typography.title,
    fontSize: 14,
    color: colors.textDark,
  },
  timestamp: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSubtle,
  },
  message: {
    ...typography.bodySmall,
    color: colors.textBody,
    marginTop: 2,
    lineHeight: 18,
  },
  amountText: {
    ...typography.caption,
    fontWeight: '700',
    marginTop: 4,
  },
  incomeText: {
    color: colors.success,
  },
  expenseText: {
    color: colors.lavenderDark,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lavender,
    position: 'absolute',
    top: 12,
    right: 12,
  },
});
