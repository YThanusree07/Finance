import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { PaymentCard } from '../../types';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme';
import { CardChipIcon, MastercardLogo, VisaLogo } from '../../assets/icons';
import { formatCurrency } from '../../utils/formatters';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;

interface PaymentCardViewProps {
  card: PaymentCard;
  onPress?: () => void;
  style?: ViewStyle;
  compact?: boolean;
}

export const PaymentCardView: React.FC<PaymentCardViewProps> = ({
  card,
  onPress,
  style,
  compact = false,
}) => {
  const getCardBg = () => {
    switch (card.colorScheme) {
      case 'purple':
        return '#3D1B5C';
      case 'darkNavy':
        return '#0A0E28';
      case 'navy':
      default:
        return colors.navyCard;
    }
  };

  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.cardContainer,
        {
          backgroundColor: getCardBg(),
          width: compact ? CARD_WIDTH * 0.85 : CARD_WIDTH,
          height: compact ? 170 : 190,
        },
        shadows.card,
        style,
      ]}
    >
      {/* Decorative background circles */}
      <View style={styles.decorCircle1} pointerEvents="none" />
      <View style={styles.decorCircle2} pointerEvents="none" />

      {/* Card Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.cardTypeLabel}>Payment Card</Text>
          <Text style={styles.balanceText}>{formatCurrency(card.balance)}</Text>
        </View>
        <CardChipIcon size={30} />
      </View>

      {/* Card Number */}
      <Text style={styles.cardNumber}>{card.maskedNumber}</Text>

      {/* Card Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>EXPIRES</Text>
          <Text style={styles.footerValue}>{card.expiryDate}</Text>
        </View>

        <View>
          <Text style={styles.footerLabel}>CARD HOLDER</Text>
          <Text style={styles.footerValue} numberOfLines={1}>
            {card.cardHolder}
          </Text>
        </View>

        <View style={styles.brandLogo}>
          {card.cardType === 'visa' ? (
            <VisaLogo size={36} />
          ) : (
            <MastercardLogo size={36} />
          )}
        </View>
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
    alignSelf: 'center',
  },
  decorCircle1: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  decorCircle2: {
    position: 'absolute',
    right: 30,
    bottom: -60,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(123, 97, 255, 0.08)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTypeLabel: {
    ...typography.caption,
    color: colors.textWhiteSubtle,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  balanceText: {
    ...typography.h3,
    color: colors.white,
    marginTop: 2,
    fontWeight: '700',
  },
  cardNumber: {
    ...typography.title,
    color: colors.white,
    letterSpacing: 2.5,
    fontFamily: 'monospace',
    marginVertical: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  footerLabel: {
    ...typography.caption,
    fontSize: 9,
    color: colors.textWhiteSubtle,
    letterSpacing: 0.5,
  },
  footerValue: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.white,
    marginTop: 2,
  },
  brandLogo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
