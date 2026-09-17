import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { SavingGoal } from '../../types';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

interface SavingsCardViewProps {
  item: SavingGoal;
  onPress?: () => void;
  style?: ViewStyle;
}

export const SavingsCardView: React.FC<SavingsCardViewProps> = ({
  item,
  onPress,
  style,
}) => {
  const percentage = Math.min(
    100,
    Math.round((item.currentAmount / item.targetAmount) * 100)
  );

  // SVG Circular progress params
  const radius = 20;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.container, style]}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
        <View style={[styles.iconInner, { backgroundColor: item.color }]} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.amountText}>
          {formatCurrency(item.currentAmount, false)}{' '}
          <Text style={styles.targetAmount}>
            / {formatCurrency(item.targetAmount, false)}
          </Text>
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <Svg width={48} height={48} viewBox="0 0 48 48">
          <Circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#E8EBF1"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="24"
            cy="24"
            r={radius}
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 24 24)"
          />
        </Svg>
        <View style={styles.percentageTextContainer}>
          <Text style={[styles.percentageText, { color: item.color }]}>
            {percentage}%
          </Text>
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xl,
    padding: spacing.md + 2,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  iconInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    ...typography.title,
    color: colors.textDark,
  },
  category: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 1,
  },
  amountText: {
    ...typography.subtitle,
    fontWeight: '700',
    color: colors.primaryNavy,
    marginTop: 4,
  },
  targetAmount: {
    ...typography.caption,
    color: colors.textSubtle,
    fontWeight: '400',
  },
  progressContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
    position: 'relative',
  },
  percentageTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
