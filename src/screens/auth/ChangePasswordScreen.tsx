import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { PasswordInput } from '../../components/inputs/PasswordInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { useAuth } from '../../context/AuthContext';

interface Props {
  navigation: any;
  route?: any;
}

export const ChangePasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { setSavedPin, isAuthenticated } = useAuth();

  const handleSave = () => {
    const newErrors: { [key: string]: string } = {};

    if (!newPassword || newPassword.length < 4) {
      newErrors.newPassword = 'Password must be at least 4 characters';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSavedPin(newPassword);
    setErrors({});

    Alert.alert('Success', 'Your password has been updated successfully.', [
      {
        text: 'OK',
        onPress: () => {
          if (isAuthenticated) {
            navigation.goBack();
          } else {
            navigation.navigate('Login');
          }
        },
      },
    ]);
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.white}>
      <AppHeader onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subtitle}>
          Set a new strong password to keep your ShieldPay account safe and secure.
        </Text>

        <View style={styles.form}>
          <PasswordInput
            label="New Password"
            placeholder="Enter new password / PIN"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              if (errors.newPassword) setErrors((e) => ({ ...e, newPassword: '' }));
            }}
            error={errors.newPassword}
          />

          <PasswordInput
            label="Confirm New Password"
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (errors.confirmPassword)
                setErrors((e) => ({ ...e, confirmPassword: '' }));
            }}
            error={errors.confirmPassword}
          />

          <PrimaryButton
            title="Save"
            onPress={handleSave}
            style={styles.saveButton}
          />

          <SecondaryButton
            title="Cancel"
            onPress={handleCancel}
            variant="light"
            style={styles.cancelButton}
          />
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
    marginBottom: spacing.xxl,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  saveButton: {
    marginTop: spacing.xl,
  },
  cancelButton: {
    marginTop: spacing.md,
  },
});
