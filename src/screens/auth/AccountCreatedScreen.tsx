import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SuccessIllustration } from '../../assets/illustrations';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'AccountCreated'>;

export const AccountCreatedScreen: React.FC<Props> = () => {
  const { login } = useAuth();

  const handleContinue = () => {
    login();
  };

  return (
    <ScreenContainer backgroundColor={colors.white}>
      <View style={styles.container}>
        <View style={styles.illustrationWrapper}>
          <SuccessIllustration width={220} height={220} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Account Created</Text>
          <Text style={styles.description}>
            Your ShieldPay account has been successfully created. You can now start managing your cards, sending money, and saving for your goals.
          </Text>
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            style={styles.continueBtn}
          />
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service & Privacy Policy.
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.xxl,
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxl,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.primaryNavy,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  continueBtn: {
    width: '100%',
    marginBottom: spacing.md,
  },
  termsText: {
    ...typography.caption,
    color: colors.textSubtle,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: spacing.md,
  },
});
