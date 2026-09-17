import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { CardCarousel } from '../../components/cards/CardCarousel';
import { SegmentedTabs } from '../../components/navigation/SegmentedTabs';
import { SpendingChart } from '../../components/charts/SpendingChart';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  color: string;
  iconBg: string;
}

const categories: SpendingCategory[] = [
  {
    id: '1',
    name: 'Shopping & Groceries',
    amount: 620.5,
    percentage: 38,
    color: colors.lavender,
    iconBg: colors.lavenderLight,
  },
  {
    id: '2',
    name: 'Food & Dining',
    amount: 340.0,
    percentage: 24,
    color: colors.orange,
    iconBg: colors.orangeLight,
  },
  {
    id: '3',
    name: 'Bills & Utilities',
    amount: 280.0,
    percentage: 20,
    color: colors.accentBlue,
    iconBg: colors.accentBlueLight,
  },
  {
    id: '4',
    name: 'Entertainment',
    amount: 180.0,
    percentage: 18,
    color: colors.accentPink,
    iconBg: colors.accentPinkLight,
  },
];

export const CardStatisticsScreen: React.FC = () => {
  const { cards, balance } = useApp();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('week');

  const timeTabs = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'year', label: 'Year' },
  ];

  return (
    <ScreenContainer scrollable backgroundColor={colors.background}>
      <AppHeader title="Statistic" showBack={false} />

      <View style={styles.content}>
        {/* Card Carousel */}
        <CardCarousel cards={cards} />

        {/* Total Balance & Timeframe Filter */}
        <View style={styles.balanceSection}>
          <View>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
          </View>

          <View style={styles.timeTabsWrapper}>
            <SegmentedTabs
              tabs={timeTabs}
              activeTab={timeframe}
              onSelectTab={(id) => setTimeframe(id as 'week' | 'month' | 'year')}
            />
          </View>
        </View>

        {/* Income vs Expenses Chart */}
        <SpendingChart timeframe={timeframe} />

        {/* Spending Category Breakdown */}
        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesHeading}>Spending Breakdown</Text>

          {categories.map((cat) => (
            <View key={cat.id} style={styles.categoryCard}>
              <View
                style={[
                  styles.categoryDot,
                  { backgroundColor: cat.color },
                ]}
              />

              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.color,
                      },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.categoryAmountContainer}>
                <Text style={styles.categoryAmount}>
                  {formatCurrency(cat.amount)}
                </Text>
                <Text style={styles.categoryPercent}>{cat.percentage}%</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  balanceSection: {
    marginVertical: spacing.lg,
  },
  balanceLabel: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  balanceAmount: {
    ...typography.h2,
    color: colors.primaryNavy,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  timeTabsWrapper: {
    width: '100%',
  },
  categoriesSection: {
    marginTop: spacing.md,
  },
  categoriesHeading: {
    ...typography.h4,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md + 2,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  categoryInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  categoryName: {
    ...typography.title,
    fontSize: 13,
    color: colors.textDark,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: colors.inputBackground,
    borderRadius: 2,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  categoryAmountContainer: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    ...typography.subtitle,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  categoryPercent: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSubtle,
    marginTop: 2,
  },
});
