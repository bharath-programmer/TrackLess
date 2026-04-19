import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Card from './Card';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface StatCardProps {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  accent?: string;
  style?: ViewStyle;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  prefix = '₹',
  suffix,
  accent,
  style,
}) => {
  return (
    <Card style={[styles.container, style]}>
      <View style={[styles.dot, { backgroundColor: accent ?? colors.primary }]} />
      <Text style={[typography.label, styles.label]}>{label}</Text>
      <View style={styles.amountRow}>
        {prefix ? (
          <Text style={[typography.bodyMd, styles.prefix]}>{prefix}</Text>
        ) : null}
        <Text style={[typography.amountLg, styles.value]}>{value}</Text>
        {suffix ? (
          <Text style={[typography.subText, styles.suffix]}>{suffix}</Text>
        ) : null}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  label: {
    marginBottom: spacing.xs,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
  },
  prefix: {
    color: colors.subText,
    marginRight: 2,
    marginBottom: 4,
    fontSize: 13,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  suffix: {
    marginLeft: 2,
    marginBottom: 4,
  },
});

export default StatCard;
