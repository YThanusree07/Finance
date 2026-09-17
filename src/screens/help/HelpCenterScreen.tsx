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
import { CustomTextInput } from '../../components/inputs/CustomTextInput';
import { SearchIcon, ChevronDownIcon, ChevronRightIcon } from '../../assets/icons';
import { faqCategories, initialFaqItems } from '../../data/mockFaq';

export const HelpCenterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Premium Account');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq_001');

  const toggleExpand = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = initialFaqItems.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ScreenContainer scrollable backgroundColor={colors.background}>
      <AppHeader
        title="Help Center"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Search Bar */}
        <CustomTextInput
          placeholder="Search question, keywords..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<SearchIcon size={20} color={colors.textMuted} />}
          containerStyle={styles.searchContainer}
        />

        {/* Categories Horizontal Scroll */}
        <Text style={styles.sectionHeading}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {faqCategories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryChip,
                  isSelected ? styles.categoryChipActive : styles.categoryChipInactive,
                ]}
                onPress={() => setSelectedCategory(cat.name)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    isSelected
                      ? styles.categoryChipTextActive
                      : styles.categoryChipTextInactive,
                  ]}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Expandable FAQ Accordion List */}
        <Text style={[styles.sectionHeading, { marginTop: spacing.xl }]}>
          Frequently Asked Questions
        </Text>

        <View style={styles.faqList}>
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <View key={faq.id} style={styles.faqCard}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleExpand(faq.id)}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: isExpanded }}
                >
                  <Text style={styles.questionText}>{faq.question}</Text>
                  {isExpanded ? (
                    <ChevronDownIcon size={20} color={colors.primaryNavy} />
                  ) : (
                    <ChevronRightIcon size={20} color={colors.textSubtle} />
                  )}
                </TouchableOpacity>

                {isExpanded ? (
                  <View style={styles.answerContainer}>
                    <Text style={styles.answerText}>{faq.answer}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        {/* Support Footer Banner */}
        <View style={styles.supportBanner}>
          <Text style={styles.supportTitle}>Still have questions?</Text>
          <Text style={styles.supportSubtitle}>
            Our 24/7 dedicated finance support team is always here to assist you.
          </Text>
          <TouchableOpacity
            style={styles.contactBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.contactBtnText}>Contact Support</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    ...typography.title,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  categoriesScroll: {
    paddingRight: spacing.xl,
  },
  categoryChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
  },
  categoryChipInactive: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  categoryChipActive: {
    backgroundColor: colors.primaryNavy,
  },
  categoryChipText: {
    ...typography.caption,
    fontWeight: '600',
  },
  categoryChipTextInactive: {
    color: colors.textDark,
  },
  categoryChipTextActive: {
    color: colors.white,
  },
  faqList: {
    marginTop: spacing.xs,
  },
  faqCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  questionText: {
    ...typography.subtitle,
    fontWeight: '600',
    color: colors.textDark,
    flex: 1,
    marginRight: spacing.md,
  },
  answerContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.md,
  },
  answerText: {
    ...typography.bodySmall,
    color: colors.textBody,
    lineHeight: 20,
  },
  supportBanner: {
    backgroundColor: colors.lavenderLight,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  supportTitle: {
    ...typography.h4,
    color: colors.lavenderDark,
  },
  supportSubtitle: {
    ...typography.caption,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  contactBtn: {
    backgroundColor: colors.lavender,
    paddingHorizontal: spacing.xl,
    paddingVertical: 10,
    borderRadius: borderRadius.lg,
  },
  contactBtnText: {
    ...typography.button,
    fontSize: 13,
    color: colors.white,
  },
});
