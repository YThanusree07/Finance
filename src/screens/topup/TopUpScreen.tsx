import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { PresetAmountGrid } from '../../components/inputs/PresetAmountGrid';
import { AmountSlider } from '../../components/inputs/AmountSlider';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import { SuccessModal } from '../../components/modals/SuccessModal';
import { CardPickerModal } from '../../components/modals/CardPickerModal';
import { PlusIcon, MinusIcon, ChevronDownIcon, MastercardLogo, VisaLogo } from '../../assets/icons';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

export const TopUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const { cards, topUp } = useApp();
  const [selectedAmount, setSelectedAmount] = useState<number>(150);
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || 'card_001');
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const handleIncrement = () => {
    setSelectedAmount((prev) => Math.min(500, prev + 10));
  };

  const handleDecrement = () => {
    setSelectedAmount((prev) => Math.max(10, prev - 10));
  };

  const handleProceed = () => {
    topUp(selectedAmount, selectedCard?.id);
    setShowSuccessModal(true);
  };

  const handleSuccessContinue = () => {
    setShowSuccessModal(false);
    navigation.goBack();
  };

  return (
    <ScreenContainer scrollable darkHeader backgroundColor={colors.background}>
      {/* Dark Navy Header Section with Card Selector */}
      <View style={styles.header}>
        <AppHeader
          title="Top Up"
          dark
          onBack={() => navigation.goBack()}
          style={styles.headerBar}
        />

        {/* Selected Payment Card Widget */}
        <TouchableOpacity
          style={styles.cardSelector}
          onPress={() => setShowCardModal(true)}
          activeOpacity={0.8}
        >
          <View style={styles.cardInfoLeft}>
            <View style={styles.cardLogo}>
              {selectedCard.cardType === 'visa' ? (
                <VisaLogo size={28} />
              ) : (
                <MastercardLogo size={28} />
              )}
            </View>
            <View>
              <Text style={styles.cardNameText}>
                {selectedCard.cardType.toUpperCase()} CARD
              </Text>
              <Text style={styles.cardBalanceText}>
                Balance: {formatCurrency(selectedCard.balance)}
              </Text>
            </View>
          </View>

          <View style={styles.cardInfoRight}>
            <Text style={styles.cardNumText}>
              •••• {selectedCard.maskedNumber.slice(-4)}
            </Text>
            <ChevronDownIcon size={18} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Body */}
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>Enter Nominal</Text>

        {/* Amount Stepper Box */}
        <View style={styles.amountBox}>
          <TouchableOpacity
            style={styles.stepButton}
            onPress={handleDecrement}
            activeOpacity={0.7}
          >
            <MinusIcon size={20} color={colors.primaryNavy} />
          </TouchableOpacity>

          <Text style={styles.amountDisplay}>${selectedAmount}</Text>

          <TouchableOpacity
            style={styles.stepButton}
            onPress={handleIncrement}
            activeOpacity={0.7}
          >
            <PlusIcon size={20} color={colors.primaryNavy} />
          </TouchableOpacity>
        </View>

        {/* Interactive Amount Slider */}
        <AmountSlider
          value={selectedAmount}
          min={10}
          max={500}
          step={10}
          onValueChange={(val) => setSelectedAmount(val)}
        />

        {/* Interactive Preset Grid */}
        <Text style={styles.presetLabel}>Quick Presets</Text>
        <PresetAmountGrid
          selectedAmount={selectedAmount}
          onSelectAmount={(amt) => setSelectedAmount(amt)}
        />

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <PrimaryButton
            title="Proceed"
            onPress={handleProceed}
            style={styles.proceedBtn}
          />
          <SecondaryButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            style={styles.cancelBtn}
          />
        </View>
      </View>

      {/* Card Selection Modal */}
      <CardPickerModal
        visible={showCardModal}
        cards={cards}
        selectedCardId={selectedCard.id}
        onSelectCard={(c) => setSelectedCardId(c.id)}
        onClose={() => setShowCardModal(false)}
      />

      {/* Top Up Success Modal */}
      <SuccessModal
        visible={showSuccessModal}
        title="Top Up Successfully"
        description={`Your balance has been successfully topped up with $${selectedAmount.toFixed(
          2
        )}.`}
        buttonText="Continue"
        onButtonPress={handleSuccessContinue}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryNavy,
    paddingBottom: spacing.xxl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerBar: {
    paddingHorizontal: spacing.lg,
  },
  cardSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.xl,
    marginHorizontal: spacing.xl,
    padding: spacing.md + 2,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLogo: {
    marginRight: spacing.md,
  },
  cardNameText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textWhiteSubtle,
    letterSpacing: 0.5,
  },
  cardBalanceText: {
    ...typography.subtitle,
    fontWeight: '700',
    color: colors.white,
    marginTop: 2,
  },
  cardInfoRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumText: {
    ...typography.caption,
    color: colors.textWhiteSubtle,
    marginRight: spacing.xs,
  },
  body: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.textDark,
    textAlign: 'center',
  },
  amountBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  stepButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountDisplay: {
    ...typography.amountLarge,
    color: colors.primaryNavy,
  },
  presetLabel: {
    ...typography.subtitle,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  actionsContainer: {
    marginTop: spacing.xxl,
  },
  proceedBtn: {
    marginBottom: spacing.md,
  },
  cancelBtn: {},
});
