import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme';

interface ToggleProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  style?: ViewStyle;
  activeColor?: string;
  inactiveColor?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  value,
  onValueChange,
  style,
  activeColor = colors.lavender,
  inactiveColor = '#D1D5DB',
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)}
      style={[
        styles.track,
        { backgroundColor: value ? activeColor : inactiveColor },
        style,
      ]}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
    >
      <View
        style={[
          styles.thumb,
          value ? styles.thumbActive : styles.thumbInactive,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: 'center',
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 3,
  },
  thumbActive: {
    alignSelf: 'flex-end',
  },
  thumbInactive: {
    alignSelf: 'flex-start',
  },
});
