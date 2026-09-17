import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
} from 'react-native';
import Svg, { Rect, Line, Circle, Text as SvgText } from 'react-native-svg';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 48;
const CHART_HEIGHT = 180;

interface SpendingChartProps {
  timeframe?: 'week' | 'month' | 'year';
  style?: ViewStyle;
}

interface DataPoint {
  label: string;
  income: number;
  expense: number;
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  timeframe = 'week',
  style,
}) => {
  const [selectedBar, setSelectedBar] = useState<number | null>(3); // default highlight Thursday

  const weekData: DataPoint[] = [
    { label: 'Mon', income: 450, expense: 280 },
    { label: 'Tue', income: 200, expense: 390 },
    { label: 'Wed', income: 600, expense: 150 },
    { label: 'Thu', income: 750, expense: 420 },
    { label: 'Fri', income: 320, expense: 500 },
    { label: 'Sat', income: 890, expense: 610 },
    { label: 'Sun', income: 150, expense: 190 },
  ];

  const maxVal = 1000;
  const barWidth = 14;
  const gap = (CHART_WIDTH - weekData.length * (barWidth * 2 + 8)) / (weekData.length + 1);

  return (
    <View style={[styles.container, style]}>
      {/* Legend & Tooltip Header */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.lavender }]} />
          <Text style={styles.legendText}>Income</Text>
        </View>

        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.orange }]} />
          <Text style={styles.legendText}>Expense</Text>
        </View>
      </View>

      {/* Selected Value Display */}
      {selectedBar !== null && (
        <View style={styles.selectedDetailContainer}>
          <Text style={styles.selectedDayText}>
            {weekData[selectedBar].label} Statistics
          </Text>
          <View style={styles.selectedAmountsRow}>
            <Text style={styles.selectedIncomeText}>
              +{formatCurrency(weekData[selectedBar].income)}
            </Text>
            <Text style={styles.selectedExpenseText}>
              -{formatCurrency(weekData[selectedBar].expense)}
            </Text>
          </View>
        </View>
      )}

      {/* SVG Bar Chart */}
      <View style={styles.chartWrapper}>
        <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
          {/* Horizontal Grid Lines */}
          {[0, 250, 500, 750, 1000].map((val) => {
            const y = CHART_HEIGHT - 30 - (val / maxVal) * (CHART_HEIGHT - 50);
            return (
              <Line
                key={`grid-${val}`}
                x1={0}
                y1={y}
                x2={CHART_WIDTH}
                y2={y}
                stroke={colors.borderLight}
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Bar Pairs */}
          {weekData.map((d, index) => {
            const xGroup = gap + index * (barWidth * 2 + 8 + gap);
            const incomeHeight = (d.income / maxVal) * (CHART_HEIGHT - 50);
            const expenseHeight = (d.expense / maxVal) * (CHART_HEIGHT - 50);
            const incomeY = CHART_HEIGHT - 30 - incomeHeight;
            const expenseY = CHART_HEIGHT - 30 - expenseHeight;
            const isSelected = selectedBar === index;

            return (
              <React.Fragment key={`bar-${index}`}>
                {/* Income Bar (Lavender) */}
                <Rect
                  x={xGroup}
                  y={incomeY}
                  width={barWidth}
                  height={incomeHeight}
                  rx={6}
                  fill={isSelected ? colors.lavender : '#D8D4FD'}
                  opacity={isSelected ? 1 : 0.75}
                  onPress={() => setSelectedBar(index)}
                />

                {/* Expense Bar (Orange) */}
                <Rect
                  x={xGroup + barWidth + 4}
                  y={expenseY}
                  width={barWidth}
                  height={expenseHeight}
                  rx={6}
                  fill={isSelected ? colors.orange : '#FED7AA'}
                  opacity={isSelected ? 1 : 0.75}
                  onPress={() => setSelectedBar(index)}
                />

                {/* X-axis Label */}
                <SvgText
                  x={xGroup + barWidth + 2}
                  y={CHART_HEIGHT - 10}
                  fontSize={11}
                  fill={isSelected ? colors.primaryNavy : colors.textSubtle}
                  fontWeight={isSelected ? '700' : '500'}
                  textAnchor="middle"
                >
                  {d.label}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.lg,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textMuted,
  },
  selectedDetailContainer: {
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedDayText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textDark,
  },
  selectedAmountsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  selectedIncomeText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.lavenderDark,
  },
  selectedExpenseText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.orangeDark,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
