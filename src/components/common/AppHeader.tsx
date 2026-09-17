import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { ChevronLeftIcon } from '../../assets/icons';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightElement?: ReactNode;
  dark?: boolean;
  style?: ViewStyle;
  centerTitle?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  onBack,
  showBack = true,
  rightElement,
  dark = false,
  style,
  centerTitle = true,
}) => {
  return (
    <View
      style={[
        styles.container,
        dark && styles.darkContainer,
        style,
      ]}
    >
      <View style={styles.leftSlot}>
        {showBack && onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, dark && styles.darkBackButton]}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <ChevronLeftIcon
              size={22}
              color={dark ? colors.white : colors.primaryNavy}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View
        style={[
          styles.titleContainer,
          centerTitle ? styles.centeredTitleContainer : styles.leftTitleContainer,
        ]}
      >
        {title ? (
          <Text
            style={[
              styles.title,
              dark ? styles.darkTitle : styles.lightTitle,
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              dark ? styles.darkSubtitle : styles.lightSubtitle,
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightSlot}>{rightElement || null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    backgroundColor: 'transparent',
  },
  darkContainer: {
    backgroundColor: colors.primaryNavy,
  },
  leftSlot: {
    minWidth: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSlot: {
    minWidth: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkBackButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  titleContainer: {
    flex: 1,
  },
  centeredTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftTitleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    ...typography.h4,
  },
  lightTitle: {
    color: colors.textDark,
  },
  darkTitle: {
    color: colors.white,
  },
  subtitle: {
    ...typography.caption,
    marginTop: 2,
  },
  lightSubtitle: {
    color: colors.textMuted,
  },
  darkSubtitle: {
    color: colors.textWhiteSubtle,
  },
});
