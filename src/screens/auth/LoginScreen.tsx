import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { CustomTextInput } from '../../components/inputs/CustomTextInput';
import { PasswordInput } from '../../components/inputs/PasswordInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { ShieldLogo } from '../../assets/icons';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validators';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('alexander.michael@shieldpay.com');
  const [password, setPassword] = useState<string>('ShieldPay#2026');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { login } = useAuth();

  const handleSignIn = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim() || !isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Please enter your password';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    login(email, password);
  };

  return (
    <ScreenContainer scrollable darkHeader backgroundColor={colors.white}>
      {/* Dark Navy Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.ambientGlow} pointerEvents="none" />
        <View style={styles.brandBadge}>
          <ShieldLogo size={42} color={colors.white} />
        </View>
        <Text style={styles.heroBrandName}>SHIELDPAY</Text>
        <Text style={styles.heroSubtitle}>Welcome Back to Your Wallet</Text>
      </View>

      {/* White Form Card Body */}
      <View style={styles.formContainer}>
        <Text style={styles.welcomeTitle}>Welcome Back!</Text>
        <Text style={styles.welcomeSubtitle}>
          Sign in with your email and password to access your account.
        </Text>

        <View style={styles.form}>
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

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ForgotPassword')}
            activeOpacity={0.7}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Sign In"
            onPress={handleSignIn}
            style={styles.signInBtn}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account ? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              activeOpacity={0.7}
            >
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: colors.primaryNavy,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxxl + 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ambientGlow: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(123, 97, 255, 0.18)',
  },
  brandBadge: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  heroBrandName: {
    ...typography.h3,
    color: colors.white,
    letterSpacing: 2,
    fontWeight: '800',
  },
  heroSubtitle: {
    ...typography.caption,
    color: colors.textWhiteSubtle,
    marginTop: 2,
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
  },
  welcomeTitle: {
    ...typography.h2,
    color: colors.primaryNavy,
  },
  welcomeSubtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
    marginTop: -spacing.xs,
  },
  forgotPasswordText: {
    ...typography.subtitle,
    color: colors.lavender,
    fontWeight: '600',
  },
  signInBtn: {
    marginBottom: spacing.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: spacing.xxl,
  },
  footerText: {
    ...typography.body,
    color: colors.textMuted,
  },
  signUpLink: {
    ...typography.body,
    fontWeight: '700',
    color: colors.lavender,
  },
});
