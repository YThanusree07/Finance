import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../theme';

interface ScreenContainerProps {
  children: ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  darkHeader?: boolean;
  backgroundColor?: string;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  unsafeBottom?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
  darkHeader = false,
  backgroundColor = colors.background,
  keyboardShouldPersistTaps = 'handled',
  unsafeBottom = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { backgroundColor }]}>
      <StatusBar
        barStyle={darkHeader ? 'light-content' : 'dark-content'}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scrollable ? (
          <ScrollView
            style={[styles.flex, style]}
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: insets.top,
                paddingBottom: (unsafeBottom ? 0 : insets.bottom) + 24,
              },
              contentContainerStyle,
            ]}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View
            style={[
              styles.flex,
              {
                paddingTop: insets.top,
                paddingBottom: unsafeBottom ? 0 : insets.bottom,
              },
              style,
            ]}
          >
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
