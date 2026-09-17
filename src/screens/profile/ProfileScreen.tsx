import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { Toggle } from '../../components/common/Toggle';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import {
  ChevronRightIcon,
  LockIcon,
  EditIcon,
  ShieldLogo,
} from '../../assets/icons';
import { useAuth } from '../../context/AuthContext';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user, toggleHideAccount, logout } = useAuth();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    logout();
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(false);
    logout();
    Alert.alert('Account Deleted', 'Your ShieldPay account has been removed.');
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.background}>
      <AppHeader title="Account" showBack={false} />

      <View style={styles.content}>
        {/* Profile Card Header */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {user.hideAccount ? '•••••••• ••••••••' : user.name}
            </Text>
            <Text style={styles.profileEmail}>
              {user.hideAccount ? '••••••@•••••.com' : user.maskedEmail}
            </Text>
            <Text style={styles.profilePhone}>{user.phone}</Text>
          </View>

          <TouchableOpacity
            style={styles.editProfileBtn}
            onPress={() => navigation.navigate('EditProfile')}
            activeOpacity={0.7}
          >
            <EditIcon size={18} color={colors.lavender} />
          </TouchableOpacity>
        </View>

        {/* Hide Account Toggle Section */}
        <TouchableOpacity
          style={styles.settingCard}
          onPress={toggleHideAccount}
          activeOpacity={0.8}
        >
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.settingTitle}>Hide Account</Text>
              <Text style={styles.settingDescription}>
                Mask your name, balance, and email across screens for enhanced privacy in public places.
              </Text>
            </View>
            <Toggle
              value={user.hideAccount}
              onValueChange={toggleHideAccount}
            />
          </View>
        </TouchableOpacity>

        {/* Quick Links Menu */}
        <View style={styles.menuSection}>
          <Text style={styles.menuHeading}>Preferences & Security</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('EditProfile')}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemText}>Edit Profile</Text>
            <ChevronRightIcon size={18} color={colors.textSubtle} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('ChangePasswordDirect')}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemText}>Change Password / PIN</Text>
            <ChevronRightIcon size={18} color={colors.textSubtle} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Cards')}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemText}>Manage Payment Cards</Text>
            <ChevronRightIcon size={18} color={colors.textSubtle} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemText}>Notifications</Text>
            <ChevronRightIcon size={18} color={colors.textSubtle} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('HelpCenter')}
            activeOpacity={0.7}
          >
            <Text style={styles.menuItemText}>Help Center & Support</Text>
            <ChevronRightIcon size={18} color={colors.textSubtle} />
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.actionsContainer}>
          <PrimaryButton
            title="Change Password"
            onPress={() => navigation.navigate('ChangePasswordDirect')}
            style={styles.changePasswordBtn}
          />

          <SecondaryButton
            title="Logout"
            onPress={handleLogout}
            style={styles.logoutBtn}
          />

          <TouchableOpacity
            onPress={() => setShowDeleteModal(true)}
            style={styles.deleteAccountContainer}
            activeOpacity={0.7}
          >
            <Text style={styles.deleteAccountText}>Delete account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete Account Confirmation Modal */}
      <ConfirmModal
        visible={showDeleteModal}
        title="Delete Account"
        message="Are you sure you want to permanently delete your ShieldPay account? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        visible={showLogoutModal}
        title="Sign Out"
        message="Are you sure you want to sign out of your ShieldPay account?"
        confirmText="Sign Out"
        cancelText="Cancel"
        isDestructive
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  profileHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.lavenderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarInitials: {
    ...typography.h3,
    color: colors.lavenderDark,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...typography.title,
    color: colors.textDark,
  },
  profileEmail: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  profilePhone: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSubtle,
    marginTop: 1,
  },
  editProfileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  settingTitle: {
    ...typography.title,
    fontSize: 15,
    color: colors.textDark,
  },
  settingDescription: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 16,
  },
  menuSection: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  menuHeading: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginVertical: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuItemText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.textDark,
  },
  actionsContainer: {
    marginTop: spacing.sm,
  },
  changePasswordBtn: {
    marginBottom: spacing.md,
  },
  logoutBtn: {
    marginBottom: spacing.md,
  },
  deleteAccountContainer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  deleteAccountText: {
    ...typography.subtitle,
    color: colors.danger,
    fontWeight: '600',
  },
});
