import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { CustomTextInput } from '../../components/inputs/CustomTextInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecurityIllustration } from '../../assets/illustrations';
import { isValidEmail } from '../../utils/validators';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('alexander.michael@shieldpay.com');
  const [error, setError] = useState<string>('');

  const handleSendVerification = () => {
    if (!email.trim() || !isValidEmail(email)) {
      setError('Please enter your registered email address-Test');
      return;
    }

    setError('');
    navigation.navigate('ChangePassword', { email });
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.white}>
      <AppHeader onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.illustrationWrapper}>
          <SecurityIllustration width={180} height={160} />
        </View>

        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.description}>
          Enter your registered email below to receive password reset instructions.
        </Text>

        <View style={styles.form}>
          <CustomTextInput
            label="Email Address"
            placeholder="Enter your registered email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (error) setError('');
            }}
            keyboardType="email-address"
            error={error}
          />

          <PrimaryButton
            title="Send Verification Code"
            onPress={handleSendVerification}
            style={styles.sendButton}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xs,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.primaryNavy,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xxl,
    lineHeight: 22,
    paddingHorizontal: spacing.md,
  },
  form: {
    width: '100%',
  },
  sendButton: {
    marginTop: spacing.md,
  },
});
