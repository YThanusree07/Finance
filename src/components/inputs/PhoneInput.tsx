import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { ChevronDownIcon } from '../../assets/icons';

interface PhoneInputProps {
  countryCode?: string;
  flagEmoji?: string;
  phoneNumber: string;
  onChangePhoneNumber: (text: string) => void;
  onCountryPress?: () => void;
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode = '+1',
  flagEmoji = '🇺🇸',
  phoneNumber,
  onChangePhoneNumber,
  onCountryPress,
  label,
  error,
  containerStyle,
}) => {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <TouchableOpacity
          style={styles.countryPicker}
          onPress={onCountryPress}
          activeOpacity={0.7}
        >
          <Text style={styles.flag}>{flagEmoji}</Text>
          <Text style={styles.countryCode}>{countryCode}</Text>
          <ChevronDownIcon size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={onChangePhoneNumber}
          placeholder="000 000 0000"
          placeholderTextColor={colors.textSubtle}
          keyboardType="phone-pad"
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
    width: '100%',
  },
  label: {
    ...typography.subtitle,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs + 2,
  },
  inputContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerLight,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingRight: spacing.sm,
  },
  flag: {
    fontSize: 20,
    marginRight: spacing.xs,
  },
  countryCode: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textDark,
    marginRight: spacing.xs,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  input: {
    flex: 1,
    ...typography.body,
    color: colors.textDark,
    height: '100%',
    padding: 0,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
  },
});
