import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

interface PresetAmountGridProps {
  amounts?: number[];
  selectedAmount: number;
  onSelectAmount: (amount: number) => void;
  style?: ViewStyle;
}

export const PresetAmountGrid: React.FC<PresetAmountGridProps> = ({
  amounts = [50, 100, 150, 200, 250, 300, 350, 400, 450],
  selectedAmount,
  onSelectAmount,
  style,
}) => {
  return (
    <View style={[styles.grid, style]}>
      {amounts.map((amount) => {
        const isSelected = selectedAmount === amount;
        return (
          <TouchableOpacity
            key={`amt-${amount}`}
            style={[
              styles.chip,
              isSelected ? styles.chipSelected : styles.chipUnselected,
            ]}
            onPress={() => onSelectAmount(amount)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Select $${amount}`}
            accessibilityState={{ selected: isSelected }}
          >
            <Text
              style={[
                styles.amountText,
                isSelected ? styles.amountTextSelected : styles.amountTextUnselected,
              ]}
            >
              ${amount}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: spacing.md,
    width: '100%',
  },
  chip: {
    width: '31%',
    height: 48,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipUnselected: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: colors.lavenderLight,
    borderWidth: 1.5,
    borderColor: colors.lavender,
  },
  amountText: {
    ...typography.title,
    fontWeight: '600',
  },
  amountTextUnselected: {
    color: colors.textDark,
  },
  amountTextSelected: {
    color: colors.lavenderDark,
  },
});
