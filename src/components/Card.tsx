import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'accent' | 'primary';
  padding?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'default',
  padding = spacing.md,
}) => {
  const variantStyle: ViewStyle = {
    default: styles.cardDefault,
    accent: styles.cardAccent,
    primary: styles.cardPrimary,
  }[variant];

  return (
    <View style={[styles.base, variantStyle, { padding }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  cardDefault: {
    backgroundColor: colors.card,
  },
  cardAccent: {
    backgroundColor: colors.accent,
  },
  cardPrimary: {
    backgroundColor: colors.primary,
  },
});

export default Card;
