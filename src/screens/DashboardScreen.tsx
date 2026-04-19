import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

interface QuickActionProps {
  emoji: string;
  label: string;
  bg: string;
}

const QuickAction: React.FC<QuickActionProps> = ({ emoji, label, bg }) => (
  <View style={[styles.quickAction, { backgroundColor: bg }]}>
    <Text style={styles.quickEmoji}>{emoji}</Text>
    <Text style={styles.quickLabel}>{label}</Text>
  </View>
);

const DashboardScreen: React.FC = () => {
  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[typography.subText, styles.greeting]}>Good morning 🌤</Text>
          <Text style={typography.titleLg}>Hello Bharath 👋</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>B</Text>
        </View>
      </View>

      {/* Total Balance Hero */}
      <Card variant="primary" style={styles.heroCard} padding={spacing.xl}>
        <Text style={[typography.label, { color: colors.text, opacity: 0.7 }]}>
          Total Balance
        </Text>
        <Text style={[typography.amountXl, styles.heroAmount]}>₹ 48,250</Text>
        <View style={styles.heroFooter}>
          <View style={styles.heroTag}>
            <View style={styles.greenDot} />
            <Text style={styles.heroTagText}>+₹ 3,200 this month</Text>
          </View>
        </View>
      </Card>

      {/* Stat Grid */}
      <View style={styles.grid}>
        <View style={styles.gridRow}>
          <StatCard
            label="Daily Limit"
            value="1,000"
            accent={colors.accent}
            style={styles.gridCard}
          />
          <View style={styles.gridGap} />
          <StatCard
            label="Spent Today"
            value="640"
            accent={colors.warning}
            style={styles.gridCard}
          />
        </View>
        <View style={styles.gridGapRow} />
        <View style={styles.gridRow}>
          <StatCard
            label="Savings"
            value="12,400"
            accent={colors.success}
            style={styles.gridCard}
          />
          <View style={styles.gridGap} />
          <StatCard
            label="Budget Left"
            value="8,560"
            accent={colors.primary}
            style={styles.gridCard}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <Text style={[typography.titleMd, styles.sectionTitle]}>Quick Actions</Text>
      <View style={styles.quickRow}>
        <QuickAction emoji="💸" label="Expense" bg="#FFD6A5" />
        <QuickAction emoji="💰" label="Income" bg="#B7E4C7" />
        <QuickAction emoji="🎯" label="Budget" bg="#CDB4DB" />
        <QuickAction emoji="📊" label="Report" bg="#A8DADC" />
      </View>

      {/* Recent Activity */}
      <Text style={[typography.titleMd, styles.sectionTitle]}>Recent</Text>
      {recentItems.map(item => (
        <Card key={item.id} style={styles.recentItem} padding={spacing.md}>
          <View style={styles.recentRow}>
            <View style={[styles.recentIcon, { backgroundColor: item.bg }]}>
              <Text style={styles.recentEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.recentInfo}>
              <Text style={typography.bodyMd}>{item.name}</Text>
              <Text style={typography.subText}>{item.date}</Text>
            </View>
            <Text
              style={[
                typography.bodyMd,
                { color: item.type === 'debit' ? '#EF4444' : '#22C55E', fontWeight: '700' },
              ]}
            >
              {item.type === 'debit' ? '-' : '+'}₹{item.amount}
            </Text>
          </View>
        </Card>
      ))}
    </ScreenContainer>
  );
};

const recentItems = [
  { id: '1', name: 'Grocery Store', date: 'Today, 10:30 AM', amount: '340', type: 'debit', emoji: '🛒', bg: '#FFF3E0' },
  { id: '2', name: 'Salary Credit', date: 'Yesterday', amount: '42,000', type: 'credit', emoji: '💼', bg: '#E8F5E9' },
  { id: '3', name: 'Netflix', date: 'Apr 17', amount: '199', type: 'debit', emoji: '🎬', bg: '#FCE4EC' },
  { id: '4', name: 'Electricity Bill', date: 'Apr 16', amount: '870', type: 'debit', emoji: '⚡', bg: '#FFFDE7' },
];

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  greeting: {
    marginBottom: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  heroCard: {
    marginBottom: spacing.lg,
  },
  heroAmount: {
    color: colors.text,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 20,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22C55E',
    marginRight: 6,
  },
  heroTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
  },
  grid: {
    marginBottom: spacing.lg,
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridGap: {
    width: spacing.sm,
  },
  gridGapRow: {
    height: spacing.sm,
  },
  gridCard: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  quickRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  quickEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  quickLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
  },
  recentItem: {
    marginBottom: spacing.sm,
  },
  recentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  recentEmoji: {
    fontSize: 18,
  },
  recentInfo: {
    flex: 1,
  },
});

export default DashboardScreen;
