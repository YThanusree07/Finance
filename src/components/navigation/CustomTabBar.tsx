import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing, shadows } from '../../theme';
import { HomeIcon, HistoryIcon, StatisticIcon, ProfileIcon } from '../../assets/icons';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  const getTabIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? colors.primaryNavy : colors.textSubtle;
    const size = 24;

    switch (routeName) {
      case 'HomeTab':
        return <HomeIcon size={size} color={iconColor} />;
      case 'HistoryTab':
        return <HistoryIcon size={size} color={iconColor} />;
      case 'StatisticTab':
        return <StatisticIcon size={size} color={iconColor} />;
      case 'ProfileTab':
        return <ProfileIcon size={size} color={iconColor} />;
      default:
        return <HomeIcon size={size} color={iconColor} />;
    }
  };

  const getTabLabel = (routeName: string) => {
    switch (routeName) {
      case 'HomeTab':
        return 'Home';
      case 'HistoryTab':
        return 'History';
      case 'StatisticTab':
        return 'Statistic';
      case 'ProfileTab':
        return 'Profile';
      default:
        return routeName;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 12) },
        shadows.medium,
      ]}
    >
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                {getTabIcon(route.name, isFocused)}
                {isFocused ? <View style={styles.activeIndicator} /> : null}
              </View>
              <Text
                style={[
                  styles.label,
                  isFocused ? styles.labelFocused : styles.labelUnfocused,
                ]}
              >
                {getTabLabel(route.name)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.sm,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 52,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.lavender,
  },
  label: {
    ...typography.caption,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  labelFocused: {
    color: colors.primaryNavy,
  },
  labelUnfocused: {
    color: colors.textSubtle,
  },
});
