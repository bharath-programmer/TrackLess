import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  // Titles
  titleLg: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  titleMd: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.3,
  },
  // Amounts / Big numbers
  amountXl: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  amountLg: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: -0.5,
  },
  // Body
  bodyLg: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  bodyMd: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 20,
  },
  // Labels / Sub
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.subText,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  subText: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.subText,
    lineHeight: 18,
  },
  caption: {
    fontSize: 11,
    fontWeight: '400',
    color: colors.subText,
  },
});
