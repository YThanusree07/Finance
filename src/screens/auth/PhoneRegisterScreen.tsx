import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { PhoneInput } from '../../components/inputs/PhoneInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { CountryPickerModal, CountryItem } from '../../components/modals/CountryPickerModal';
import { isValidPhone } from '../../utils/validators';
import { useAuth } from '../../context/AuthContext';

type Props = NativeStackScreenProps<AuthStackParamList, 'PhoneRegister'>;

export const PhoneRegisterScreen: React.FC<Props> = ({ navigation, route }) => {
  const [phone, setPhone] = useState<string>('234 567 8900');
  const [countryCode, setCountryCode] = useState<string>('+1');
  const [flagEmoji, setFlagEmoji] = useState<string>('🇺🇸');
  const [showCountryModal, setShowCountryModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { setRegisteredPhone } = useAuth();

  const pin = route.params.pin;
  const email = route.params.email;
  const name = route.params.name;

  const handleSendCode = () => {
    if (!phone.trim() || !isValidPhone(phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    const fullPhone = `${countryCode} ${phone}`;
    setRegisteredPhone(fullPhone);
    setError('');

    navigation.navigate('VerifyOtp', {
      phone: fullPhone,
      pin,
      email,
      name,
    });
  };

  const handleSignUpWithEmail = () => {
    navigation.navigate('Register');
  };

  const handleSelectCountry = (country: CountryItem) => {
    setCountryCode(country.code);
    setFlagEmoji(country.flag);
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.white}>
      <AppHeader onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <Text style={styles.title}>Your Phone Number</Text>
        <Text style={styles.subtitle}>
          Enter your mobile number to register an account and receive verification codes.
        </Text>

        <View style={styles.form}>
          <PhoneInput
            countryCode={countryCode}
            flagEmoji={flagEmoji}
            phoneNumber={phone}
            onChangePhoneNumber={(text) => {
              setPhone(text);
              if (error) setError('');
            }}
            onCountryPress={() => setShowCountryModal(true)}
            label="Phone Number"
            error={error}
          />

          <PrimaryButton
            title="Send Code"
            onPress={handleSendCode}
            style={styles.sendButton}
          />

          <SecondaryButton
            title="Sign Up With Email"
            onPress={handleSignUpWithEmail}
            variant="light"
            style={styles.emailButton}
          />
        </View>
      </View>

      <CountryPickerModal
        visible={showCountryModal}
        selectedCode={countryCode}
        onSelect={handleSelectCountry}
        onClose={() => setShowCountryModal(false)}
      />
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
  sendButton: {
    marginTop: spacing.xl,
  },
  emailButton: {
    marginTop: spacing.md,
  },
});
