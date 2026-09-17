import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { QuickActionButton } from '../../components/buttons/QuickActionButton';
import { CardCarousel } from '../../components/cards/CardCarousel';
import { SavingsCardView } from '../../components/cards/SavingsCardView';
import {
  BellIcon,
  SendActionIcon,
  RequestActionIcon,
  PayActionIcon,
  TopUpActionIcon,
} from '../../assets/icons';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useAuth();
  const { balance, cards, savings, notifications } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <ScreenContainer scrollable darkHeader backgroundColor={colors.background}>
      {/* Dark Navy Header Section */}
      <View style={styles.header}>
        {/* Ambient background decoration */}
        <View style={styles.ambientCircle1} pointerEvents="none" />
        <View style={styles.ambientCircle2} pointerEvents="none" />

        {/* User Info & Notification Bell */}
        <View style={styles.userRow}>
          <View style={styles.userInfo}>
            <Text style={styles.greetingText}>Welcome Back</Text>
            <Text style={styles.userNameText}>
              {user.hideAccount ? '•••••••• ••••••••' : user.name}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.bellButton}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.8}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
          >
            <BellIcon size={22} color={colors.white} />
            {unreadCount > 0 && <View style={styles.bellBadge} />}
          </TouchableOpacity>
        </View>

        {/* Balance Card Section */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>My Balance</Text>
          <Text style={styles.balanceAmount}>
            {user.hideAccount ? '$ • • • • •' : formatCurrency(balance)}
          </Text>

          {/* 4 Quick Action Buttons */}
          <View style={styles.quickActionsRow}>
            <QuickActionButton
              icon={<SendActionIcon size={22} color={colors.white} />}
              label="Send"
              onPress={() => navigation.navigate('SendMoneyKeypad')}
            />

            <QuickActionButton
              icon={<RequestActionIcon size={22} color={colors.white} />}
              label="Request"
              onPress={() => navigation.navigate('RequestMoney')}
            />

            <QuickActionButton
              icon={<PayActionIcon size={22} color={colors.white} />}
              label="Pay"
              onPress={() => navigation.navigate('PayQr')}
            />

            <QuickActionButton
              icon={<TopUpActionIcon size={22} color={colors.white} />}
              label="Top up"
              onPress={() => navigation.navigate('TopUp')}
            />
          </View>
        </View>
      </View>

      {/* Main Content Body */}
      <View style={styles.body}>
        {/* Your Cards Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Cards</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cards')}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <CardCarousel
          cards={cards}
          onCardPress={() => navigation.navigate('Cards')}
        />

        {/* Your Saving Section */}
        <View style={[styles.sectionHeader, { marginTop: spacing.xl }]}>
          <Text style={styles.sectionTitle}>Your Saving</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs')}
            activeOpacity={0.7}
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.savingsList}>
          {savings.map((saving) => (
            <SavingsCardView key={saving.id} item={saving} />
          ))}
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryNavy,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  ambientCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(123, 97, 255, 0.15)',
  },
  ambientCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 168, 0, 0.08)',
  },
  userRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  userInfo: {
    flex: 1,
  },
  greetingText: {
    ...typography.caption,
    color: colors.textWhiteSubtle,
    letterSpacing: 0.5,
  },
  userNameText: {
    ...typography.h3,
    color: colors.white,
    marginTop: 2,
    fontWeight: '700',
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bellBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.orange,
    borderWidth: 1.5,
    borderColor: colors.primaryNavy,
  },
  balanceCard: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  balanceLabel: {
    ...typography.caption,
    color: colors.textWhiteSubtle,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  balanceAmount: {
    ...typography.balance,
    fontSize: 34,
    color: colors.white,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing.sm,
  },
  body: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textDark,
  },
  viewAllText: {
    ...typography.subtitle,
    color: colors.lavender,
    fontWeight: '600',
  },
  savingsList: {
    marginTop: spacing.xs,
  },
});
