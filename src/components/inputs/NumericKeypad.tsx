import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { DeleteIcon } from '../../assets/icons';

interface NumericKeypadProps {
  onPressDigit: (digit: string) => void;
  onPressDelete: () => void;
  style?: ViewStyle;
  dark?: boolean;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onPressDigit,
  onPressDelete,
  style,
  dark = false,
}) => {
  const rows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'delete'],
  ];

  return (
    <View style={[styles.container, style]}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((item, colIndex) => {
            if (item === '') {
              return <View key={`empty-${colIndex}`} style={styles.keyEmpty} />;
            }

            if (item === 'delete') {
              return (
                <TouchableOpacity
                  key={`del-${colIndex}`}
                  style={[styles.keyButton, dark && styles.darkKeyButton]}
                  onPress={onPressDelete}
                  activeOpacity={0.6}
                  accessibilityLabel="Delete"
                  accessibilityRole="button"
                >
                  <DeleteIcon
                    size={24}
                    color={dark ? colors.white : colors.primaryNavy}
                  />
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={`digit-${item}`}
                style={[styles.keyButton, dark && styles.darkKeyButton]}
                onPress={() => onPressDigit(item)}
                activeOpacity={0.6}
                accessibilityLabel={`Number ${item}`}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.digitText,
                    dark ? styles.darkDigitText : styles.lightDigitText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: spacing.xs + 2,
  },
  keyButton: {
    width: 72,
    height: 60,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  darkKeyButton: {
    backgroundColor: 'transparent',
  },
  keyEmpty: {
    width: 72,
    height: 60,
  },
  digitText: {
    ...typography.h2,
    fontSize: 26,
    fontWeight: '600',
  },
  lightDigitText: {
    color: colors.primaryNavy,
  },
  darkDigitText: {
    color: colors.white,
  },
});
