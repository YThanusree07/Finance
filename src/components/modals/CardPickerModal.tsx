import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { PaymentCard } from '../../types';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { CloseIcon, CheckIcon, MastercardLogo, VisaLogo } from '../../assets/icons';
import { formatCurrency } from '../../utils/formatters';

interface CardPickerModalProps {
  visible: boolean;
  cards: PaymentCard[];
  selectedCardId: string;
  onSelectCard: (card: PaymentCard) => void;
  onClose: () => void;
}

export const CardPickerModal: React.FC<CardPickerModalProps> = ({
  visible,
  cards,
  selectedCardId,
  onSelectCard,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.header}>
            <Text style={styles.title}>Select Payment Card</Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={styles.closeBtn}
            >
              <CloseIcon size={20} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={cards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedCardId;
              return (
                <TouchableOpacity
                  style={[
                    styles.cardRow,
                    isSelected && styles.cardRowSelected,
                  ]}
                  onPress={() => {
                    onSelectCard(item);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <View style={styles.logoContainer}>
                    {item.cardType === 'visa' ? (
                      <VisaLogo size={24} />
                    ) : (
                      <MastercardLogo size={24} />
                    )}
                  </View>

                  <View style={styles.cardInfo}>
                    <Text style={styles.cardTitle}>
                      {item.cardType.toUpperCase()} CARD
                    </Text>
                    <Text style={styles.cardNumber}>{item.maskedNumber}</Text>
                  </View>

                  <View style={styles.cardRight}>
                    <Text style={styles.cardBalance}>
                      {formatCurrency(item.balance)}
                    </Text>
                    {isSelected ? (
                      <View style={styles.checkIcon}>
                        <CheckIcon size={16} color={colors.lavender} />
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    maxHeight: '65%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  title: {
    ...typography.h4,
    color: colors.textDark,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardRowSelected: {
    backgroundColor: colors.lavenderLight,
    borderColor: colors.lavender,
  },
  logoContainer: {
    marginRight: spacing.md,
    width: 36,
    alignItems: 'center',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  cardNumber: {
    ...typography.subtitle,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: 2,
  },
  cardRight: {
    alignItems: 'flex-end',
  },
  cardBalance: {
    ...typography.subtitle,
    fontWeight: '700',
    color: colors.primaryNavy,
  },
  checkIcon: {
    marginTop: 4,
  },
});
