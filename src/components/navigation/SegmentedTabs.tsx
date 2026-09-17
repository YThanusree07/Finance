import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

interface TabItem {
  id: string;
  label: string;
  badge?: number;
}

interface SegmentedTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  style?: ViewStyle;
  variant?: 'pill' | 'underline';
}

export const SegmentedTabs: React.FC<SegmentedTabsProps> = ({
  tabs,
  activeTab,
  onSelectTab,
  style,
  variant = 'pill',
}) => {
  if (variant === 'underline') {
    return (
      <View style={[styles.underlineContainer, style]}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.underlineTab,
                isActive && styles.underlineTabActive,
              ]}
              onPress={() => onSelectTab(tab.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.underlineText,
                  isActive && styles.underlineTextActive,
                ]}
              >
                {tab.label}
              </Text>
              {tab.badge !== undefined && tab.badge > 0 ? (
                <View style={styles.tabBadge}>
                  <Text style={styles.tabBadgeText}>{tab.badge}</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <View style={[styles.pillContainer, style]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.pillTab,
              isActive && styles.pillTabActive,
            ]}
            onPress={() => onSelectTab(tab.id)}
            activeOpacity={0.8}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                styles.pillText,
                isActive && styles.pillTextActive,
              ]}
            >
              {tab.label}
            </Text>
            {tab.badge !== undefined && tab.badge > 0 ? (
              <View
                style={[
                  styles.tabBadge,
                  isActive ? styles.tabBadgeActive : styles.tabBadgeInactive,
                ]}
              >
                <Text
                  style={[
                    styles.tabBadgeText,
                    isActive && styles.tabBadgeTextActive,
                  ]}
                >
                  {tab.badge}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    backgroundColor: colors.inputBackground,
    borderRadius: borderRadius.lg,
    padding: 4,
    width: '100%',
  },
  pillTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    flexDirection: 'row',
  },
  pillTabActive: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  pillText: {
    ...typography.subtitle,
    fontWeight: '600',
    color: colors.textMuted,
  },
  pillTextActive: {
    color: colors.primaryNavy,
  },
  underlineContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  underlineTab: {
    paddingVertical: spacing.md,
    marginRight: spacing.xxl,
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  underlineTabActive: {
    borderBottomColor: colors.lavender,
  },
  underlineText: {
    ...typography.subtitle,
    fontWeight: '600',
    color: colors.textMuted,
  },
  underlineTextActive: {
    color: colors.primaryNavy,
  },
  tabBadge: {
    marginLeft: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
    backgroundColor: colors.lavenderLight,
  },
  tabBadgeActive: {
    backgroundColor: colors.lavender,
  },
  tabBadgeInactive: {
    backgroundColor: colors.border,
  },
  tabBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.lavenderDark,
  },
  tabBadgeTextActive: {
    color: colors.white,
  },
});
