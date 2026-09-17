import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing } from '../../theme';
import { ShieldLogo } from '../../assets/icons';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.replace('Onboarding')}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      {/* Decorative background ambient glows */}
      <View style={styles.ambientGlow1} />
      <View style={styles.ambientGlow2} />

      <View style={styles.brandContainer}>
        <View style={styles.logoBadge}>
          <ShieldLogo size={64} color={colors.white} />
        </View>
        <Text style={styles.brandName}>SHIELDPAY</Text>
        <Text style={styles.tagline}>Smart & Secure Mobile Finance</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryNavy,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ambientGlow1: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(123, 97, 255, 0.12)',
  },
  ambientGlow2: {
    position: 'absolute',
    bottom: '25%',
    right: '10%',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 168, 0, 0.08)',
  },
  brandContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  brandName: {
    ...typography.h1,
    fontSize: 32,
    letterSpacing: 4,
    color: colors.white,
    fontWeight: '800',
  },
  tagline: {
    ...typography.bodySmall,
    color: colors.textWhiteSubtle,
    marginTop: spacing.xs + 2,
    letterSpacing: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: spacing.xxl,
  },
  versionText: {
    ...typography.caption,
    color: 'rgba(255, 255, 255, 0.4)',
  },
});
