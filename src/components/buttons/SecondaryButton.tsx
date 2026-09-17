import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: ReactNode;
  variant?: 'light' | 'outline' | 'lavender';
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  icon,
  variant = 'light',
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'outline':
        return {
          bg: 'transparent',
          border: colors.border,
          text: colors.primaryNavy,
        };
      case 'lavender':
        return {
          bg: colors.lavenderLight,
          border: 'transparent',
          text: colors.lavenderDark,
        };
      case 'light':
      default:
        return {
          bg: colors.inputBackground,
          border: 'transparent',
          text: colors.primaryNavy,
        };
    }
  };

  const { bg, border, text } = getStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: bg,
          borderColor: border,
          borderWidth: border !== 'transparent' ? 1.5 : 0,
        },
        disabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <View style={styles.content}>
        {icon ? <View style={styles.icon}>{icon}</View> : null}
        <Text style={[styles.title, { color: text }, textStyle]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: spacing.sm,
  },
  title: {
    ...typography.button,
    fontWeight: '600',
  },
});
