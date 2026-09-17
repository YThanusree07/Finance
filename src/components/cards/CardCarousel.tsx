import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewStyle,
} from 'react-native';
import { PaymentCard } from '../../types';
import { PaymentCardView } from './PaymentCardView';
import { colors, spacing } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CardCarouselProps {
  cards: PaymentCard[];
  onCardPress?: (card: PaymentCard) => void;
  style?: ViewStyle;
}

export const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  onCardPress,
  style,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 48)
    );
    if (slide !== activeIndex && slide >= 0 && slide < cards.length) {
      setActiveIndex(slide);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {cards.map((card) => (
          <View key={card.id} style={styles.cardWrapper}>
            <PaymentCardView
              card={card}
              onPress={onCardPress ? () => onCardPress(card) : undefined}
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      {cards.length > 1 ? (
        <View style={styles.dotsContainer}>
          {cards.map((_, idx) => (
            <View
              key={`dot-${idx}`}
              style={[
                styles.dot,
                idx === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  cardWrapper: {
    width: SCREEN_WIDTH - 48,
    marginRight: spacing.md,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  dotActive: {
    width: 20,
    backgroundColor: colors.lavender,
  },
  dotInactive: {
    width: 6,
    backgroundColor: colors.border,
  },
});
