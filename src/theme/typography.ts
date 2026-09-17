import { TextStyle, Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const typography = {
  // Headings
  h1: {
    fontFamily,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700' as TextStyle['fontWeight'],
  },
  h2: {
    fontFamily,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as TextStyle['fontWeight'],
  },
  h3: {
    fontFamily,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  h4: {
    fontFamily,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600' as TextStyle['fontWeight'],
  },

  // Titles & Subtitles
  title: {
    fontFamily,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600' as TextStyle['fontWeight'],
  },
  subtitle: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as TextStyle['fontWeight'],
  },

  // Body text
  body: {
    fontFamily,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as TextStyle['fontWeight'],
  },
  bodySmall: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as TextStyle['fontWeight'],
  },

  // Labels & Captions
  label: {
    fontFamily,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600' as TextStyle['fontWeight'],
    letterSpacing: 0.5,
  },
  caption: {
    fontFamily,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400' as TextStyle['fontWeight'],
  },

  // Button text
  button: {
    fontFamily,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as TextStyle['fontWeight'],
  },

  // Large displays / Balances
  balance: {
    fontFamily,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as TextStyle['fontWeight'],
  },
  amountLarge: {
    fontFamily,
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700' as TextStyle['fontWeight'],
  },
};

export type Typography = typeof typography;
