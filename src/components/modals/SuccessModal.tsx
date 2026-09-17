import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { SuccessIllustration } from '../../assets/illustrations';
import { PrimaryButton } from '../buttons/PrimaryButton';

interface SuccessModalProps {
  visible: boolean;
  title: string;
  description?: string;
  message?: string;
  buttonText?: string;
  onButtonPress?: () => void;
  onClose?: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  title,
  description,
  message,
  buttonText = 'Continue',
  onButtonPress,
  onClose,
}) => {
  const handlePress = onButtonPress || onClose || (() => {});
  const displayDescription = description || message;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handlePress}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <SuccessIllustration width={150} height={150} />

          <Text style={styles.title}>{title}</Text>

          {displayDescription ? (
            <Text style={styles.description}>{displayDescription}</Text>
          ) : null}

          <PrimaryButton
            title={buttonText}
            onPress={handlePress}
            style={styles.button}
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xxl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    ...typography.h3,
    color: colors.textDark,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  button: {
    marginTop: spacing.xxl,
  },
});
