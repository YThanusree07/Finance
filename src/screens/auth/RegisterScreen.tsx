import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { CustomTextInput } from '../../components/inputs/CustomTextInput';
import { PasswordInput } from '../../components/inputs/PasswordInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { CheckIcon } from '../../assets/icons';
import { isValidEmail } from '../../utils/validators';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>('Alexander Michael');
  const [email, setEmail] = useState<string>('alexander.michael@shieldpay.com');
  const [password, setPassword] = useState<string>('ShieldPay#2026');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(true);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSignUp = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!email.trim() || !isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!agreeTerms) {
      newErrors.terms = 'Please accept the Terms & Conditions';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    navigation.navigate('CreatePin', { email, name: fullName });
  };

  const handleWithPhone = () => {
    navigation.navigate('PhoneRegister', { pin: '8943', email, name: fullName });
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.white}>
      <AppHeader onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome !</Text>
        <Text style={styles.subtitle}>
          Create a secure account to manage your finances easily.
        </Text>

        <View style={styles.form}>
          <CustomTextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (errors.fullName) setErrors((e) => ({ ...e, fullName: '' }));
            }}
            error={errors.fullName}
          />

          <CustomTextInput
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (errors.email) setErrors((e) => ({ ...e, email: '' }));
            }}
            keyboardType="email-address"
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (errors.password) setErrors((e) => ({ ...e, password: '' }));
            }}
            error={errors.password}
          />

          {/* Terms & Conditions Checkbox */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.8}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: agreeTerms }}
          >
            <View
              style={[
                styles.checkbox,
                agreeTerms ? styles.checkboxChecked : styles.checkboxUnchecked,
              ]}
            >
              {agreeTerms ? <CheckIcon size={14} color={colors.white} /> : null}
            </View>
            <Text style={styles.termsText}>
              I have agree to our{' '}
              <Text style={styles.termsLink}>Terms and Condition</Text>
            </Text>
          </TouchableOpacity>
          {errors.terms ? (
            <Text style={styles.termsError}>{errors.terms}</Text>
          ) : null}

          {/* Buttons */}
          <PrimaryButton
            title="Sign Up"
            onPress={handleSignUp}
            style={styles.signUpButton}
          />

          <SecondaryButton
            title="With Phone Number"
            onPress={handleWithPhone}
            variant="light"
            style={styles.phoneButton}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account ? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  title: {
    ...typography.h1,
    color: colors.primaryNavy,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  checkboxUnchecked: {
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    backgroundColor: colors.lavender,
  },
  termsText: {
    ...typography.bodySmall,
    color: colors.textBody,
  },
  termsLink: {
    color: colors.lavender,
    fontWeight: '600',
  },
  termsError: {
    ...typography.caption,
    color: colors.danger,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  signUpButton: {
    marginTop: spacing.xl,
  },
  phoneButton: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  footerText: {
    ...typography.body,
    color: colors.textMuted,
  },
  signInLink: {
    ...typography.body,
    fontWeight: '700',
    color: colors.lavender,
  },
});
