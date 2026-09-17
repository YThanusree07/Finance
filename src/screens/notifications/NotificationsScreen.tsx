import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { SegmentedTabs } from '../../components/navigation/SegmentedTabs';
import { NotificationItemView } from '../../components/notifications/NotificationItemView';
import { EmptyState } from '../../components/common/EmptyState';
import { useApp } from '../../context/AppContext';

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
  const { notifications, markAllNotificationsRead } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    activeTab === 'unread'
      ? notifications.filter((n) => !n.read)
      : notifications;

  const tabs = [
    { id: 'all', label: 'All Notification', badge: notifications.length },
    { id: 'unread', label: 'Unread', badge: unreadCount },
  ];

  return (
    <ScreenContainer scrollable backgroundColor={colors.background}>
      <AppHeader
        title="Notification"
        onBack={() => navigation.goBack()}
        rightElement={
          unreadCount > 0 ? (
            <TouchableOpacity
              onPress={markAllNotificationsRead}
              activeOpacity={0.7}
            >
              <Text style={styles.markReadText}>Read All</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />

      <View style={styles.content}>
        {/* Top Tabs */}
        <SegmentedTabs
          tabs={tabs}
          activeTab={activeTab}
          onSelectTab={(id) => setActiveTab(id as 'all' | 'unread')}
          style={styles.tabs}
        />

        {/* List */}
        {filteredNotifications.length > 0 ? (
          <View style={styles.list}>
            {filteredNotifications.map((item) => (
              <NotificationItemView key={item.id} item={item} />
            ))}
          </View>
        ) : (
          <EmptyState
            title="No Notifications"
            description={
              activeTab === 'unread'
                ? "You've read all your notifications!"
                : "You don't have any notifications yet."
            }
          />
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  tabs: {
    marginBottom: spacing.lg,
  },
  markReadText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.lavender,
  },
  list: {
    marginTop: spacing.xs,
  },
});
