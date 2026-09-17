import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'VerifyOtp'>;

export const VerifyOtpScreen: React.FC<Props> = ({ navigation, route }) => {
  const [otp, setOtp] = useState<string[]>(['8', '9', '4', '3']);
  const [timer, setTimer] = useState<number>(45);
  const [error, setError] = useState<string>('');
  const { signup } = useAuth();

  const phone = route.params.phone;
  const pin = route.params.pin;
  const email = route.params.email;
  const name = route.params.name;

  const inputRefs = useRef<any[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError('');

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = otp.join('');
    if (fullCode.length !== 4) {
      setError('Please enter the full 4-digit verification code');
      return;
    }

    signup({
      name: name || 'Alexander Michael',
      email: email || 'alexander.michael@shieldpay.com',
      phone: phone || '+1 234 567 8900',
    });

    navigation.navigate('AccountCreated', { name });
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <ScreenContainer backgroundColor={colors.white}>
      <AppHeader onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>Verify Account</Text>
          <Text style={styles.subtitle}>
            Enter 4-digit code we have sent to{' '}
            <Text style={styles.phoneHighlight}>{phone}</Text>
          </Text>

          {/* 4 OTP Input Boxes */}
          <View style={styles.otpContainer}>
            {otp.map((digit, idx) => (
              <TextInput
                key={`otp-${idx}`}
                ref={(ref) => {
                  inputRefs.current[idx] = ref;
                }}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : null,
                  error ? styles.otpInputError : null,
                ]}
                value={digit}
                onChangeText={(text) => handleChangeText(text, idx)}
                onKeyPress={(e) => handleKeyPress(e, idx)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Resend Code Section */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendPrompt}>Didn't receive code? </Text>
            <TouchableOpacity
              onPress={handleResend}
              disabled={timer > 0}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.resendLink,
                  timer > 0 && styles.resendLinkDisabled,
                ]}
              >
                {timer > 0 ? `Resend Code in ${timer}s` : 'Resend Code'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerSection}>
          <PrimaryButton
            title="Verify Now"
            onPress={handleVerify}
            style={styles.verifyBtn}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  headerSection: {
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
    lineHeight: 22,
  },
  phoneHighlight: {
    color: colors.primaryNavy,
    fontWeight: '600',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xxxl,
    marginBottom: spacing.lg,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.inputBackground,
    ...typography.h2,
    color: colors.primaryNavy,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  otpInputFilled: {
    borderColor: colors.lavender,
    backgroundColor: colors.white,
  },
  otpInputError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerLight,
  },
  errorText: {
    ...typography.caption,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  resendPrompt: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  resendLink: {
    ...typography.bodySmall,
    fontWeight: '700',
    color: colors.lavender,
  },
  resendLinkDisabled: {
    color: colors.textSubtle,
  },
  footerSection: {
    width: '100%',
  },
  verifyBtn: {
    width: '100%',
  },
});
