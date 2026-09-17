import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { MoneyRequestItemView } from '../../components/transactions/MoneyRequestItemView';
import { EmptyState } from '../../components/common/EmptyState';
import { ConfirmModal } from '../../components/modals/ConfirmModal';
import { SuccessModal } from '../../components/modals/SuccessModal';
import { useApp } from '../../context/AppContext';

export const RequestMoneyScreen: React.FC = () => {
  const navigation = useNavigation();
  const { requests, acceptRequest, declineRequest } = useApp();

  const [activeRequest, setActiveRequest] = useState<{
    id: string;
    action: 'accept' | 'decline';
    name: string;
    amount: number;
  } | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    title: string;
    message: string;
  } | null>(null);

  const handleAccept = (id: string) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setActiveRequest({
      id,
      action: 'accept',
      name: req.requesterName,
      amount: req.amount,
    });
  };

  const handleDecline = (id: string) => {
    const req = requests.find((r) => r.id === id);
    if (!req) return;
    setActiveRequest({
      id,
      action: 'decline',
      name: req.requesterName,
      amount: req.amount,
    });
  };

  const handleConfirmAction = () => {
    if (!activeRequest) return;
    if (activeRequest.action === 'accept') {
      acceptRequest(activeRequest.id);
      setSuccessInfo({
        title: 'Payment Sent!',
        message: `Successfully paid $${activeRequest.amount.toFixed(2)} to ${activeRequest.name}`,
      });
    } else {
      declineRequest(activeRequest.id);
    }
    setActiveRequest(null);
  };

  return (
    <ScreenContainer scrollable backgroundColor={colors.background}>
      <AppHeader
        title="Request Money"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <Text style={styles.sectionHeading}>Pending Money Requests</Text>
        <Text style={styles.sectionSubtitle}>
          Review incoming requests from friends and approve payments instantly.
        </Text>

        {requests.length > 0 ? (
          <View style={styles.list}>
            {requests.map((request) => (
              <MoneyRequestItemView
                key={request.id}
                request={request}
                onAccept={handleAccept}
                onDecline={handleDecline}
              />
            ))}
          </View>
        ) : (
          <EmptyState
            title="No Pending Requests"
            description="You don't have any incoming money requests at the moment."
          />
        )}
      </View>

      <ConfirmModal
        visible={activeRequest !== null}
        title={activeRequest?.action === 'accept' ? 'Accept Money Request' : 'Decline Request'}
        message={
          activeRequest?.action === 'accept'
            ? `Are you sure you want to send $${activeRequest?.amount.toFixed(2)} to ${activeRequest?.name}?`
            : `Are you sure you want to decline the request from ${activeRequest?.name}?`
        }
        confirmText={activeRequest?.action === 'accept' ? 'Accept & Pay' : 'Decline'}
        cancelText="Cancel"
        isDestructive={activeRequest?.action === 'decline'}
        onConfirm={handleConfirmAction}
        onCancel={() => setActiveRequest(null)}
      />

      <SuccessModal
        visible={successInfo !== null}
        title={successInfo?.title || 'Success'}
        message={successInfo?.message || ''}
        buttonText="Done"
        onClose={() => setSuccessInfo(null)}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
  },
  sectionHeading: {
    ...typography.h4,
    color: colors.textDark,
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  list: {
    marginTop: spacing.xs,
  },
});
