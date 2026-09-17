import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { CustomTextInput } from '../../components/inputs/CustomTextInput';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { EditIcon } from '../../assets/icons';
import { useAuth } from '../../context/AuthContext';

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, updateProfile } = useAuth();

  const [firstName, setFirstName] = useState<string>(user.firstName || 'Alexander');
  const [lastName, setLastName] = useState<string>(user.lastName || 'Michael');
  const [phone, setPhone] = useState<string>(user.phone || '+1 234 567 8900');
  const [birthday, setBirthday] = useState<string>(user.birthday || '12 May 1995');
  const [address, setAddress] = useState<string>(
    user.address || '4517 Washington Ave. Manchester, Kentucky 39495'
  );
  const [description, setDescription] = useState<string>(
    user.description || 'Mobile finance enthusiast & ShieldPay premium member.'
  );

  const handleSave = () => {
    updateProfile({
      firstName,
      lastName,
      phone,
      birthday,
      address,
      description,
    });

    Alert.alert('Success', 'Profile updated successfully.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();

  return (
    <ScreenContainer scrollable backgroundColor={colors.white}>
      <AppHeader
        title="Edit Profile"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Avatar with Edit Badge */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <TouchableOpacity
            style={styles.avatarEditBadge}
            onPress={() => Alert.alert('Photo', 'Choose a photo from your camera roll')}
            activeOpacity={0.8}
          >
            <EditIcon size={16} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.row}>
            <View style={styles.halfCol}>
              <CustomTextInput
                label="First Name"
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
              />
            </View>

            <View style={styles.halfCol}>
              <CustomTextInput
                label="Last Name"
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
              />
            </View>
          </View>

          <CustomTextInput
            label="Country / Phone"
            value={phone}
            onChangeText={setPhone}
            placeholder="+1 234 567 8900"
            keyboardType="phone-pad"
          />

          <CustomTextInput
            label="Birthday"
            value={birthday}
            onChangeText={setBirthday}
            placeholder="DD Month YYYY"
          />

          <CustomTextInput
            label="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="Residential address"
          />

          <CustomTextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Short bio"
            multiline
            numberOfLines={3}
            inputStyle={styles.bioInput}
          />

          <PrimaryButton
            title="Save"
            onPress={handleSave}
            style={styles.saveBtn}
          />

          <SecondaryButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            variant="light"
            style={styles.cancelBtn}
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
    paddingBottom: spacing.xxl,
  },
  avatarSection: {
    alignItems: 'center',
    marginVertical: spacing.lg,
    position: 'relative',
    alignSelf: 'center',
  },
  avatarCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.lavenderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.h2,
    color: colors.lavenderDark,
    fontWeight: '700',
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfCol: {
    flex: 1,
  },
  bioInput: {
    height: 70,
    textAlignVertical: 'top',
    paddingTop: spacing.sm,
  },
  saveBtn: {
    marginTop: spacing.xl,
  },
  cancelBtn: {
    marginTop: spacing.md,
  },
});
