// src/components/elements/ScheduleNotification.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Info } from 'lucide-react-native';

interface ScheduleNotificationProps {
  membersNeeded: number;
  hasStarted: boolean;
}

const ScheduleNotification: React.FC<ScheduleNotificationProps> = ({
  membersNeeded,
  hasStarted,
}) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surfaceVariant },
      ]}
    >
      <Info size={20} color={theme.colors.primary} />
      <View style={styles.textContainer}>
        <Text
          variant="bodyMedium"
          style={[styles.title, { color: theme.colors.onSurfaceVariant }]}
        >
          Preview Mode
        </Text>
        <Text
          variant="bodySmall"
          style={[styles.message, { color: theme.colors.onSurfaceVariant }]}
        >
          {membersNeeded} more {membersNeeded !== 1 ? 'members' : 'member'}{' '}
          needed. Schedule will update with real players once league is full.
        </Text>
        {hasStarted && (
          <Text
            variant="bodySmall"
            style={[styles.warning, { color: theme.colors.error }]}
          >
            League start date has passed
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    gap: 12,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontWeight: '600',
  },
  message: {
    opacity: 0.8,
  },
  warning: {
    fontWeight: '500',
    marginTop: 4,
  },
});

export default ScheduleNotification;
