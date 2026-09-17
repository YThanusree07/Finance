import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { SegmentedTabs } from '../../components/navigation/SegmentedTabs';
import { TransactionItemView } from '../../components/transactions/TransactionItemView';
import { EmptyState } from '../../components/common/EmptyState';
import { ChevronDownIcon, SearchIcon } from '../../assets/icons';
import { CustomTextInput } from '../../components/inputs/CustomTextInput';
import { useApp } from '../../context/AppContext';

export const HistoryScreen: React.FC = () => {
  const route = useRoute<any>();
  const initialTab = route.params?.initialTab || 'all';

  const [activeTab, setActiveTab] = useState<'all' | 'send' | 'request'>(initialTab);
  const [selectedWeek, setSelectedWeek] = useState<string>('This Week');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { transactions } = useApp();

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'send', label: 'Send' },
    { id: 'request', label: 'Request' },
  ];

  const filteredTransactions = transactions.filter((tx) => {
    // Filter by tab
    if (activeTab === 'send' && tx.type !== 'send') return false;
    if (activeTab === 'request' && tx.type !== 'request' && tx.type !== 'receive')
      return false;

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tx.name.toLowerCase().includes(q) ||
        tx.description.toLowerCase().includes(q) ||
        tx.amount.toString().includes(q)
      );
    }
    return true;
  });

  const toggleWeek = () => {
    if (selectedWeek === 'This Week') setSelectedWeek('Last Week');
    else if (selectedWeek === 'Last Week') setSelectedWeek('This Month');
    else setSelectedWeek('This Week');
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.background}>
      <AppHeader title="History" showBack={false} />

      <View style={styles.content}>
        {/* Search Bar */}
        <CustomTextInput
          placeholder="Search transactions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<SearchIcon size={18} color={colors.textMuted} />}
          containerStyle={styles.searchContainer}
        />

        {/* Top Header Row with Week Filter */}
        <View style={styles.headerRow}>
          <Text style={styles.heading}>Transaction</Text>

          <TouchableOpacity
            style={styles.weekDropdown}
            onPress={toggleWeek}
            activeOpacity={0.7}
          >
            <Text style={styles.weekText}>{selectedWeek}</Text>
            <ChevronDownIcon size={16} color={colors.primaryNavy} />
          </TouchableOpacity>
        </View>

        {/* Segmented Tabs: All / Send / Request */}
        <SegmentedTabs
          tabs={tabs}
          activeTab={activeTab}
          onSelectTab={(id) => setActiveTab(id as 'all' | 'send' | 'request')}
          style={styles.tabs}
        />

        {/* Transactions List */}
        {filteredTransactions.length > 0 ? (
          <View style={styles.list}>
            {filteredTransactions.map((tx) => (
              <TransactionItemView key={tx.id} transaction={tx} />
            ))}
          </View>
        ) : (
          <EmptyState
            title="No Transactions Found"
            description="No transactions match your selected filter criteria."
          />
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  searchContainer: {
    marginBottom: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heading: {
    ...typography.h3,
    color: colors.textDark,
  },
  weekDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  weekText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.primaryNavy,
    marginRight: 4,
  },
  tabs: {
    marginBottom: spacing.lg,
  },
  list: {
    marginTop: spacing.xs,
  },
});
