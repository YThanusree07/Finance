import { ViewStyle, Platform } from 'react-native';

export const shadows = {
  none: {},
  small: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#0D1333',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
    default: {},
  }),
  medium: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#0D1333',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    default: {},
  }),
  large: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#0D1333',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
    },
    android: {
      elevation: 8,
    },
    default: {},
  }),
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#0D1333',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
    },
    android: {
      elevation: 5,
    },
    default: {},
  }),
  lavenderGlow: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#7B61FF',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.35,
      shadowRadius: 12,
    },
    android: {
      elevation: 6,
    },
    default: {},
  }),
};
