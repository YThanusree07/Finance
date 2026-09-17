import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { PaymentCardView } from '../../components/cards/PaymentCardView';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { PlusIcon } from '../../assets/icons';
import { useApp } from '../../context/AppContext';

export const CardsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { cards } = useApp();

  return (
    <ScreenContainer scrollable backgroundColor={colors.background}>
      <AppHeader
        title="Your Card"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <Text style={styles.heading}>Manage Payment Cards</Text>
        <Text style={styles.subtitle}>
          Active debit & credit cards linked with your ShieldPay account.
        </Text>

        <View style={styles.cardsList}>
          {cards.map((card) => (
            <View key={card.id} style={styles.cardItem}>
              <PaymentCardView card={card} />
            </View>
          ))}
        </View>

        <PrimaryButton
          title="+ Add Credit Card"
          onPress={() => navigation.navigate('AddCard')}
          style={styles.addCardBtn}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  heading: {
    ...typography.h3,
    color: colors.textDark,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.xl,
  },
  cardsList: {
    marginBottom: spacing.xl,
  },
  cardItem: {
    marginBottom: spacing.lg,
  },
  addCardBtn: {
    marginTop: spacing.sm,
  },
});
