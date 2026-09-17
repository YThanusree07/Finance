import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../theme';

interface PinInputDotsProps {
  pinLength?: number;
  value: string;
  style?: ViewStyle;
  error?: boolean;
}

export const PinInputDots: React.FC<PinInputDotsProps> = ({
  pinLength = 4,
  value,
  style,
  error = false,
}) => {
  const dots = Array.from({ length: pinLength }, (_, i) => i);

  return (
    <View style={[styles.container, style]}>
      {dots.map((index) => {
        const isFilled = index < value.length;
        return (
          <View
            key={index}
            style={[
              styles.dot,
              isFilled ? styles.dotFilled : styles.dotEmpty,
              error ? styles.dotError : null,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginHorizontal: spacing.md,
    borderWidth: 2,
  },
  dotEmpty: {
    borderColor: '#D2D6E2',
    backgroundColor: 'transparent',
  },
  dotFilled: {
    borderColor: colors.primaryNavy,
    backgroundColor: colors.primaryNavy,
  },
  dotError: {
    borderColor: colors.danger,
    backgroundColor: colors.danger,
  },
});
