import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import Svg, { Rect, Path } from 'react-native-svg';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { SegmentedTabs } from '../../components/navigation/SegmentedTabs';
import { PrimaryButton } from '../../components/buttons/PrimaryButton';
import { SecondaryButton } from '../../components/buttons/SecondaryButton';
import {
  FlashIcon,
  GalleryIcon,
  ShieldLogo,
} from '../../assets/icons';
import { useAuth } from '../../context/AuthContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const PayQrScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<'scan' | 'myqr'>('scan');
  const [flashOn, setFlashOn] = useState<boolean>(false);
  const { user } = useAuth();

  const tabs = [
    { id: 'scan', label: 'Scan QR' },
    { id: 'myqr', label: 'My QR' },
  ];

  const handleSimulateScan = () => {
    Alert.alert(
      'QR Code Detected',
      'Scanned merchant "Starbucks Coffee" for $12.50. Proceed with payment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay Now',
          onPress: () => {
            navigation.navigate('SendMoneyPreset', {
              recipient: {
                name: 'Starbucks Coffee',
                phone: '+1 800 782 7282',
              },
              amount: 50,
              description: 'In-store QR payment',
            });
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer darkHeader backgroundColor={activeTab === 'scan' ? colors.primaryNavy : colors.background}>
      <AppHeader
        title="Pay With ShieldPay"
        dark={activeTab === 'scan'}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        {/* Top Tabs */}
        <SegmentedTabs
          tabs={tabs}
          activeTab={activeTab}
          onSelectTab={(id) => setActiveTab(id as 'scan' | 'myqr')}
          style={
            (activeTab === 'scan'
              ? [styles.tabs, styles.darkTabs]
              : styles.tabs) as ViewStyle
          }
        />

        {activeTab === 'scan' ? (
          /* SCAN QR VIEW */
          <View style={styles.scanContainer}>
            <Text style={styles.scanInstruction}>
              Align the QR code within the frame to pay automatically
            </Text>

            {/* Viewfinder Frame */}
            <View style={styles.viewfinder}>
              {/* Corner Brackets */}
              <View style={[styles.corner, styles.topLeft]} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />

              {/* Animated Laser Line */}
              <View style={styles.laserLine} />

              <Text style={styles.frameLabel}>Scan QR Code here</Text>
            </View>

            {/* Viewfinder Controls */}
            <View style={styles.scanControls}>
              <TouchableOpacity
                style={[
                  styles.controlButton,
                  flashOn ? styles.controlButtonActive : null,
                ]}
                onPress={() => setFlashOn(!flashOn)}
                activeOpacity={0.7}
              >
                <FlashIcon size={22} color={colors.white} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.scanActionButton}
                onPress={handleSimulateScan}
                activeOpacity={0.85}
              >
                <View style={styles.scanActionInner}>
                  <ShieldLogo size={32} color={colors.white} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => {
                  Alert.alert('Gallery', 'Select a QR code screenshot from your gallery.');
                }}
                activeOpacity={0.7}
              >
                <GalleryIcon size={22} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* MY QR VIEW */
          <View style={styles.myQrContainer}>
            <View style={styles.qrCard}>
              <View style={styles.avatarHeader}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitials}>
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </Text>
                </View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.walletId}>ShieldPay ID: @alexmichael</Text>
              </View>

              {/* High Quality Vector QR Code Demo */}
              <View style={styles.qrCodeWrapper}>
                <Svg width={200} height={200} viewBox="0 0 200 200">
                  {/* Outer Position Finders */}
                  <Rect x="10" y="10" width="55" height="55" rx="8" fill="#0D1333" />
                  <Rect x="20" y="20" width="35" height="35" rx="4" fill="#FFFFFF" />
                  <Rect x="27" y="27" width="21" height="21" rx="2" fill="#7B61FF" />

                  <Rect x="135" y="10" width="55" height="55" rx="8" fill="#0D1333" />
                  <Rect x="145" y="20" width="35" height="35" rx="4" fill="#FFFFFF" />
                  <Rect x="152" y="27" width="21" height="21" rx="2" fill="#7B61FF" />

                  <Rect x="10" y="135" width="55" height="55" rx="8" fill="#0D1333" />
                  <Rect x="20" y="145" width="35" height="35" rx="4" fill="#FFFFFF" />
                  <Rect x="27" y="152" width="21" height="21" rx="2" fill="#7B61FF" />

                  {/* QR Data Pattern Dots */}
                  <Rect x="80" y="15" width="12" height="12" rx="2" fill="#0D1333" />
                  <Rect x="105" y="15" width="12" height="12" rx="2" fill="#0D1333" />
                  <Rect x="80" y="35" width="12" height="12" rx="2" fill="#0D1333" />
                  <Rect x="105" y="35" width="12" height="12" rx="2" fill="#FFA800" />
                  <Rect x="80" y="55" width="37" height="10" rx="2" fill="#0D1333" />

                  {/* Center Brand Badge */}
                  <Rect x="80" y="80" width="40" height="40" rx="10" fill="#0D1333" />
                  <Path
                    d="M100 88L88 93V101C88 107.5 93 113.5 100 115C107 113.5 112 107.5 112 101V93L100 88Z"
                    fill="#FFFFFF"
                  />

                  {/* Lower QR Data Elements */}
                  <Rect x="15" y="80" width="15" height="15" rx="2" fill="#0D1333" />
                  <Rect x="40" y="80" width="15" height="15" rx="2" fill="#0D1333" />
                  <Rect x="15" y="105" width="40" height="12" rx="2" fill="#0D1333" />

                  <Rect x="135" y="80" width="20" height="12" rx="2" fill="#0D1333" />
                  <Rect x="165" y="80" width="20" height="12" rx="2" fill="#0D1333" />
                  <Rect x="135" y="105" width="50" height="12" rx="2" fill="#0D1333" />

                  <Rect x="80" y="135" width="37" height="12" rx="2" fill="#0D1333" />
                  <Rect x="80" y="160" width="15" height="25" rx="2" fill="#0D1333" />
                  <Rect x="105" y="160" width="12" height="25" rx="2" fill="#0D1333" />
                  <Rect x="135" y="135" width="15" height="50" rx="2" fill="#0D1333" />
                  <Rect x="160" y="135" width="25" height="15" rx="2" fill="#0D1333" />
                  <Rect x="160" y="160" width="25" height="25" rx="2" fill="#0D1333" />
                </Svg>
              </View>

              <Text style={styles.scanNotice}>
                Scan this code to instantly receive money from any ShieldPay user.
              </Text>
            </View>

            <View style={styles.qrActionsRow}>
              <SecondaryButton
                title="Share QR"
                onPress={() => Alert.alert('Share QR', 'QR Code ready to share!')}
                style={styles.qrActionBtn}
              />
              <PrimaryButton
                title="Save Image"
                onPress={() => Alert.alert('Saved', 'QR Code saved to photos.')}
                style={styles.qrActionBtn}
              />
            </View>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xs,
  },
  tabs: {
    marginBottom: spacing.xl,
  },
  darkTabs: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  scanContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.xxl,
  },
  scanInstruction: {
    ...typography.body,
    color: colors.textWhiteSubtle,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  viewfinder: {
    width: 250,
    height: 250,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: colors.lavender,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 12,
  },
  laserLine: {
    width: '90%',
    height: 3,
    backgroundColor: colors.lavender,
    borderRadius: 1.5,
    shadowColor: colors.lavender,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  frameLabel: {
    ...typography.caption,
    color: colors.textWhiteSubtle,
    marginTop: spacing.xl,
  },
  scanControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonActive: {
    backgroundColor: colors.lavender,
  },
  scanActionButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.lavender,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  scanActionInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryNavy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myQrContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.xxl,
  },
  qrCard: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xxl,
    padding: spacing.xxl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  avatarHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.lavenderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  avatarInitials: {
    ...typography.title,
    color: colors.lavenderDark,
    fontWeight: '700',
  },
  userName: {
    ...typography.h3,
    color: colors.textDark,
  },
  walletId: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  qrCodeWrapper: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    marginVertical: spacing.md,
  },
  scanNotice: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 18,
  },
  qrActionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  qrActionBtn: {
    flex: 1,
  },
});
