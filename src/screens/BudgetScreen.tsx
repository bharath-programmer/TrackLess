import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

interface BudgetCategory {
  id: string;
  name: string;
  emoji: string;
  allocated: number;
  spent: number;
  color: string;
}

const categories: BudgetCategory[] = [
  { id: '1', name: 'Food & Dining', emoji: '🍽️', allocated: 8000, spent: 5200, color: '#FFD6A5' },
  { id: '2', name: 'Transport', emoji: '🚗', allocated: 3000, spent: 1800, color: '#A8DADC' },
  { id: '3', name: 'Entertainment', emoji: '🎬', allocated: 2000, spent: 1650, color: '#CDB4DB' },
  { id: '4', name: 'Utilities', emoji: '⚡', allocated: 4000, spent: 2100, color: '#B7E4C7' },
  { id: '5', name: 'Shopping', emoji: '🛍️', allocated: 5000, spent: 3400, color: '#FFADAD' },
];

const totalBudget = 30000;
const totalSpent = categories.reduce((acc, c) => acc + c.spent, 0);
const totalRemaining = totalBudget - totalSpent;
const overallProgress = totalSpent / totalBudget;

interface ProgressBarProps {
  progress: number;
  color: string;
  height?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color, height = 8 }) => (
  <View style={[styles.progressTrack, { height }]}>
    <View
      style={[
        styles.progressFill,
        {
          width: `${Math.min(progress * 100, 100)}%`,
          backgroundColor: color,
          height,
          borderRadius: height / 2,
        },
      ]}
    />
  </View>
);

const BudgetScreen: React.FC = () => {
  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <Text style={typography.titleLg}>Monthly Budget</Text>
        <Text style={typography.subText}>April 2026</Text>
      </View>

      {/* Overall Summary */}
      <Card variant="primary" padding={spacing.xl} style={styles.summaryCard}>
        <Text style={[typography.label, { color: colors.text, opacity: 0.7 }]}>
          Total Budget
        </Text>
        <Text style={[typography.amountXl, { color: colors.text, marginVertical: spacing.xs }]}>
          ₹ {totalBudget.toLocaleString('en-IN')}
        </Text>
        <ProgressBar progress={overallProgress} color={colors.text} height={10} />
        <View style={styles.summaryFooter}>
          <View style={styles.summaryItem}>
            <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.summaryItemText}>Spent ₹{totalSpent.toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.summaryItem}>
            <View style={[styles.dot, { backgroundColor: '#22C55E' }]} />
            <Text style={styles.summaryItemText}>Left ₹{totalRemaining.toLocaleString('en-IN')}</Text>
          </View>
        </View>
      </Card>

      {/* Remaining Pill */}
      <Card style={styles.remainingCard} padding={spacing.md}>
        <View style={styles.remainingRow}>
          <View>
            <Text style={typography.label}>Remaining Balance</Text>
            <Text style={[typography.amountLg, styles.remainingAmount]}>
              ₹ {totalRemaining.toLocaleString('en-IN')}
            </Text>
          </View>
          <View style={styles.remainingBadge}>
            <Text style={styles.remainingBadgeText}>
              {Math.round((totalRemaining / totalBudget) * 100)}% left
            </Text>
          </View>
        </View>
      </Card>

      {/* Category Cards */}
      <Text style={[typography.titleMd, styles.sectionTitle]}>Categories</Text>

      {categories.map(cat => {
        const pct = cat.spent / cat.allocated;
        const isOver = pct >= 0.9;
        return (
          <Card key={cat.id} style={styles.categoryCard} padding={spacing.md}>
            <View style={styles.categoryHeader}>
              <View style={[styles.categoryIcon, { backgroundColor: cat.color }]}>
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              </View>
              <View style={styles.categoryInfo}>
                <Text style={typography.bodyMd}>{cat.name}</Text>
                <Text style={typography.subText}>
                  ₹{cat.spent.toLocaleString('en-IN')} / ₹{cat.allocated.toLocaleString('en-IN')}
                </Text>
              </View>
              <Text
                style={[
                  styles.categoryPct,
                  { color: isOver ? '#EF4444' : colors.subText },
                ]}
              >
                {Math.round(pct * 100)}%
              </Text>
            </View>
            <View style={{ marginTop: spacing.sm }}>
              <ProgressBar progress={pct} color={isOver ? '#EF4444' : cat.color} />
            </View>
          </Card>
        );
      })}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  summaryCard: {
    marginBottom: spacing.md,
  },
  progressTrack: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.35)',
    overflow: 'hidden',
  },
  progressFill: {},
  summaryFooter: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.sm,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  summaryItemText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  remainingCard: {
    marginBottom: spacing.lg,
  },
  remainingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  remainingAmount: {
    color: '#22C55E',
    marginTop: 2,
  },
  remainingBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  remainingBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#22C55E',
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  categoryCard: {
    marginBottom: spacing.sm,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryEmoji: {
    fontSize: 20,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryPct: {
    fontSize: 14,
    fontWeight: '700',
  },
});

export default BudgetScreen;
