import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import {
  SendMoneyIllustration,
  RequestMoneyIllustration,
  EasyToUseIllustration,
} from '../../assets/illustrations';
import { useAuth } from '../../context/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

interface Slide {
  id: string;
  title: string;
  description: string;
  renderIllustration: () => React.ReactNode;
}

const slides: Slide[] = [
  {
    id: '1',
    title: 'Send Money',
    description:
      'Send money easily with just one click to your friends and family anywhere in the world with zero hassle.',
    renderIllustration: () => <SendMoneyIllustration width={260} height={220} />,
  },
  {
    id: '2',
    title: 'Request Money',
    description:
      'Request money from friends or split bills effortlessly with instantaneous notifications and real-time confirmations.',
    renderIllustration: () => <RequestMoneyIllustration width={260} height={220} />,
  },
  {
    id: '3',
    title: 'Easy To Use',
    description:
      'Manage all your payment cards, track your daily expenses, and achieve your saving goals with smart insights.',
    renderIllustration: () => <EasyToUseIllustration width={260} height={220} />,
  },
];

export const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const { completeOnboarding } = useAuth();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      completeOnboarding();
      navigation.navigate('Register');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    completeOnboarding();
    navigation.navigate('Login');
  };

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <ScreenContainer backgroundColor={colors.white}>
      {/* Top Header with Skip Button */}
      <View style={styles.topBar}>
        {!isLastSlide ? (
          <TouchableOpacity
            onPress={handleSkip}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.skipText}>Skip This Step</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Slide Content Carousel */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slideContainer}>
            <View style={styles.illustrationWrapper}>
              {item.renderIllustration()}
            </View>

            <View style={styles.textWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      {/* Pagination Indicators */}
      <View style={styles.paginationContainer}>
        {slides.map((_, idx) => (
          <View
            key={`dot-${idx}`}
            style={[
              styles.dot,
              idx === currentIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      {/* Bottom Action Buttons */}
      <View style={styles.buttonContainer}>
        {!isLastSlide ? (
          <PrimaryButton
            title="Next Step"
            onPress={handleNext}
            style={styles.primaryBtn}
          />
        ) : (
          <View style={styles.lastSlideButtons}>
            <PrimaryButton
              title="Create Account"
              onPress={handleSkip}
              style={styles.primaryBtn}
            />
            <SecondaryButton
              title="Login Now"
              onPress={handleLogin}
              variant="light"
              style={styles.secondaryBtn}
            />
          </View>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  topBar: {
    height: 44,
    paddingHorizontal: spacing.xl,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  skipText: {
    ...typography.subtitle,
    color: colors.textMuted,
    fontWeight: '500',
  },
  placeholder: {
    height: 20,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  illustrationWrapper: {
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  textWrapper: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.primaryNavy,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.sm,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.lavender,
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#E2E8F0',
  },
  buttonContainer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  primaryBtn: {
    marginBottom: spacing.sm,
  },
  lastSlideButtons: {
    width: '100%',
  },
  secondaryBtn: {
    marginTop: spacing.xs,
  },
});
