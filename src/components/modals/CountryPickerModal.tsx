import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';
import { CloseIcon, CheckIcon } from '../../assets/icons';

export interface CountryItem {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: CountryItem[] = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
];

interface CountryPickerModalProps {
  visible: boolean;
  selectedCode: string;
  onSelect: (country: CountryItem) => void;
  onClose: () => void;
}

export const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  visible,
  selectedCode,
  onSelect,
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
            <Text style={styles.title}>Select Country</Text>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.7}
              style={styles.closeBtn}
            >
              <CloseIcon size={20} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={COUNTRIES}
            keyExtractor={(item) => item.code + item.name}
            renderItem={({ item }) => {
              const isSelected = item.code === selectedCode;
              return (
                <TouchableOpacity
                  style={[
                    styles.countryRow,
                    isSelected && styles.countryRowSelected,
                  ]}
                  onPress={() => {
                    onSelect(item);
                    onClose();
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.flag}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryCode}>{item.code}</Text>
                  {isSelected ? (
                    <View style={styles.checkIcon}>
                      <CheckIcon size={16} color={colors.lavender} />
                    </View>
                  ) : null}
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
    maxHeight: '75%',
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
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  countryRowSelected: {
    backgroundColor: colors.lavenderLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
  },
  flag: {
    fontSize: 22,
    marginRight: spacing.md,
  },
  countryName: {
    ...typography.body,
    fontWeight: '500',
    color: colors.textDark,
    flex: 1,
  },
  countryCode: {
    ...typography.subtitle,
    color: colors.textMuted,
    marginRight: spacing.sm,
  },
  checkIcon: {
    marginLeft: spacing.xs,
  },
});
