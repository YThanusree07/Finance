import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme';

interface DividerProps {
  style?: ViewStyle;
  color?: string;
  height?: number;
}

export const Divider: React.FC<DividerProps> = ({
  style,
  color = colors.border,
  height = 1,
}) => {
  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: color, height },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});
