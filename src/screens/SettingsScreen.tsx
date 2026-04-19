import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import Card from '../components/Card';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme/spacing';
import { typography } from '../theme/typography';

interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Food & Dining', emoji: '🍽️', color: '#FFD6A5' },
  { id: '2', name: 'Transport', emoji: '🚗', color: '#A8DADC' },
  { id: '3', name: 'Entertainment', emoji: '🎬', color: '#CDB4DB' },
  { id: '4', name: 'Utilities', emoji: '⚡', color: '#B7E4C7' },
  { id: '5', name: 'Shopping', emoji: '🛍️', color: '#FFADAD' },
  { id: '6', name: 'Healthcare', emoji: '🏥', color: '#BEE3F8' },
];

interface SettingRowProps {
  label: string;
  subLabel?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}

const SettingRow: React.FC<SettingRowProps> = ({ label, subLabel, rightElement, onPress }) => (
  <TouchableOpacity
    style={styles.settingRow}
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.settingRowLeft}>
      <Text style={typography.bodyMd}>{label}</Text>
      {subLabel ? <Text style={typography.subText}>{subLabel}</Text> : null}
    </View>
    {rightElement ?? <Text style={styles.chevron}>›</Text>}
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(false);

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <Text style={typography.titleLg}>Settings</Text>
      </View>

      {/* Profile Card */}
      <Card variant="primary" padding={spacing.lg} style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>B</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[typography.titleMd, { color: colors.text }]}>Bharath</Text>
            <Text style={[typography.subText, { color: colors.text, opacity: 0.7 }]}>
              bharath@email.com
            </Text>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Categories Section */}
      <Text style={[typography.label, styles.sectionLabel]}>Categories</Text>
      <Card style={styles.sectionCard}>
        <TouchableOpacity style={styles.manageCategoriesBtn} activeOpacity={0.8}>
          <Text style={styles.manageCategoriesText}>＋  Manage Categories</Text>
        </TouchableOpacity>

        {defaultCategories.map((cat, idx) => (
          <View key={cat.id}>
            {idx > 0 && <View style={styles.divider} />}
            <View style={styles.categoryRow}>
              <View
                style={[styles.categoryIcon, { backgroundColor: cat.color }]}
              >
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              </View>
              <Text style={[typography.bodyMd, { flex: 1 }]}>{cat.name}</Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.categoryAction}>
                <Text style={styles.categoryActionText}>•••</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Card>

      {/* Preferences Section */}
      <Text style={[typography.label, styles.sectionLabel]}>Preferences</Text>
      <Card style={styles.sectionCard}>
        <SettingRow
          label="Currency"
          subLabel="Indian Rupee (₹)"
          rightElement={<Text style={styles.settingValue}>₹ INR</Text>}
        />
        <View style={styles.divider} />
        <SettingRow
          label="Budget Period"
          subLabel="Resets every month"
          rightElement={<Text style={styles.settingValue}>Monthly</Text>}
        />
        <View style={styles.divider} />
        <SettingRow
          label="Push Notifications"
          rightElement={
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          }
        />
        <View style={styles.divider} />
        <SettingRow
          label="Daily Reminder"
          subLabel="Remind me to log expenses"
          rightElement={
            <Switch
              value={dailyReminder}
              onValueChange={setDailyReminder}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          }
        />
      </Card>

      {/* Data & Privacy Section */}
      <Text style={[typography.label, styles.sectionLabel]}>Data & Privacy</Text>
      <Card style={styles.sectionCard}>
        <SettingRow label="Export Data" subLabel="Download as CSV" />
        <View style={styles.divider} />
        <SettingRow label="Clear All Data" subLabel="This cannot be undone" />
        <View style={styles.divider} />
        <SettingRow label="Privacy Policy" />
      </Card>

      {/* App info */}
      <Text style={styles.version}>TrackLess v1.0.0</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.lg,
  },
  profileCard: {
    marginBottom: spacing.lg,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  profileAvatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  profileInfo: {
    flex: 1,
  },
  editBtn: {
    backgroundColor: 'rgba(255,255,255,0.45)',
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  sectionLabel: {
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    marginBottom: spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  manageCategoriesBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary + '30',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  manageCategoriesText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryEmoji: {
    fontSize: 16,
  },
  categoryAction: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  categoryActionText: {
    color: colors.subText,
    fontSize: 16,
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  settingRowLeft: {
    flex: 1,
    marginRight: spacing.sm,
  },
  chevron: {
    fontSize: 22,
    color: colors.subText,
  },
  settingValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.subText,
  },
  version: {
    textAlign: 'center',
    color: colors.subText,
    fontSize: 12,
    marginBottom: spacing.xl,
    marginTop: -spacing.sm,
  },
});

export default SettingsScreen;
