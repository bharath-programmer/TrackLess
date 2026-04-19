import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

const months = ['Jan', 'Feb', 'Mar', 'Apr'];

const monthlyData = [
  { month: 'Jan', income: 42000, expense: 28000 },
  { month: 'Feb', income: 42000, expense: 31500 },
  { month: 'Mar', income: 45000, expense: 26000 },
  { month: 'Apr', income: 42000, expense: 14200 },
];

const breakdownData = [
  { category: 'Food & Dining', amount: 5200, emoji: '🍽️', color: '#FFD6A5', pct: 37 },
  { category: 'Transport', amount: 1800, emoji: '🚗', color: '#A8DADC', pct: 13 },
  { category: 'Entertainment', amount: 1650, emoji: '🎬', color: '#CDB4DB', pct: 12 },
  { category: 'Utilities', amount: 2100, emoji: '⚡', color: '#B7E4C7', pct: 15 },
  { category: 'Shopping', amount: 3400, emoji: '🛍️', color: '#FFADAD', pct: 24 },
];

const MAX_BAR = 45000;

const ReportScreen: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(3); // Apr

  const current = monthlyData[selectedMonth];
  const savings = current.income - current.expense;

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <Text style={typography.titleLg}>Reports</Text>
        <Text style={typography.subText}>Financial Overview</Text>
      </View>

      {/* Month Selector */}
      <View style={styles.monthSelector}>
        {months.map((m, i) => (
          <TouchableOpacity
            key={m}
            style={[styles.monthTab, selectedMonth === i && styles.monthTabActive]}
            onPress={() => setSelectedMonth(i)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.monthTabText,
                selectedMonth === i && styles.monthTabTextActive,
              ]}
            >
              {m}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary Cards Row */}
      <View style={styles.summaryRow}>
        <Card variant="primary" style={styles.summaryCard} padding={spacing.md}>
          <Text style={[typography.label, { color: colors.text, opacity: 0.7 }]}>Income</Text>
          <Text style={[typography.amountLg, styles.incomeAmount]}>
            ₹{(current.income / 1000).toFixed(0)}k
          </Text>
        </Card>
        <View style={{ width: spacing.sm }} />
        <Card style={styles.summaryCard} padding={spacing.md}>
          <Text style={typography.label}>Expense</Text>
          <Text style={[typography.amountLg, styles.expenseAmount]}>
            ₹{(current.expense / 1000).toFixed(1)}k
          </Text>
        </Card>
        <View style={{ width: spacing.sm }} />
        <Card variant="accent" style={styles.summaryCard} padding={spacing.md}>
          <Text style={[typography.label, { color: colors.text, opacity: 0.7 }]}>Saved</Text>
          <Text style={[typography.amountLg, { color: colors.text }]}>
            ₹{(savings / 1000).toFixed(1)}k
          </Text>
        </Card>
      </View>

      {/* Bar Chart */}
      <Text style={[typography.titleMd, styles.sectionTitle]}>Monthly Comparison</Text>
      <Card style={styles.chartCard} padding={spacing.lg}>
        <View style={styles.chartArea}>
          {monthlyData.map((d, i) => {
            const incomeH = (d.income / MAX_BAR) * 120;
            const expenseH = (d.expense / MAX_BAR) * 120;
            return (
              <View key={d.month} style={styles.barGroup}>
                <View style={styles.barPair}>
                  <View style={[styles.bar, { height: incomeH, backgroundColor: colors.primary }]} />
                  <View style={[styles.bar, { height: expenseH, backgroundColor: colors.accent }]} />
                </View>
                <Text
                  style={[
                    styles.barLabel,
                    selectedMonth === i && { color: colors.text, fontWeight: '700' },
                  ]}
                >
                  {d.month}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
            <Text style={typography.caption}>Income</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
            <Text style={typography.caption}>Expense</Text>
          </View>
        </View>
      </Card>

      {/* Breakdown */}
      <Text style={[typography.titleMd, styles.sectionTitle]}>Expense Breakdown</Text>
      {breakdownData.map(item => (
        <Card key={item.category} style={styles.breakdownCard} padding={spacing.md}>
          <View style={styles.breakdownRow}>
            <View style={[styles.breakdownIcon, { backgroundColor: item.color }]}>
              <Text style={styles.breakdownEmoji}>{item.emoji}</Text>
            </View>
            <Text style={[typography.bodyMd, { flex: 1 }]}>{item.category}</Text>
            <Text style={[typography.bodyMd, { fontWeight: '700' }]}>
              ₹{item.amount.toLocaleString('en-IN')}
            </Text>
            <View
              style={[
                styles.pctBadge,
                { backgroundColor: item.color + '70' },
              ]}
            >
              <Text style={styles.pctText}>{item.pct}%</Text>
            </View>
          </View>
        </Card>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  monthSelector: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.full,
    padding: 4,
    marginBottom: spacing.lg,
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  monthTab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.full,
  },
  monthTabActive: {
    backgroundColor: colors.primary,
  },
  monthTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.subText,
  },
  monthTabTextActive: {
    color: colors.text,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
  },
  incomeAmount: {
    color: '#22C55E',
    marginTop: 4,
  },
  expenseAmount: {
    color: '#EF4444',
    marginTop: 4,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  chartCard: {
    marginBottom: spacing.lg,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 130,
    marginBottom: spacing.md,
  },
  barGroup: {
    alignItems: 'center',
  },
  barPair: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  bar: {
    width: 18,
    borderRadius: 6,
  },
  barLabel: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.subText,
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    gap: spacing.lg,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  breakdownCard: {
    marginBottom: spacing.sm,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  breakdownIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownEmoji: {
    fontSize: 18,
  },
  pctBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginLeft: spacing.sm,
  },
  pctText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
});

export default ReportScreen;
