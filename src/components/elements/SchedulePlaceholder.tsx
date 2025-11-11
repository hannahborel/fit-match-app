import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { BaseCard } from './Card';

interface SchedulePlaceholderProps {
  membersNeeded: number;
  hasStarted: boolean;
}

const SchedulePlaceholder: React.FC<SchedulePlaceholderProps> = ({
  membersNeeded,
  hasStarted,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <BaseCard title="Waiting for Members">
        <View style={styles.content}>
          <Text variant="bodyLarge" style={styles.message}>
            {membersNeeded} more {membersNeeded !== 1 ? 'members' : 'member'}{' '}
            needed to start
          </Text>
          <Text
            variant="bodyMedium"
            style={[
              styles.subMessage,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            The schedule will be generated once the league is full
          </Text>
          {hasStarted && (
            <Text
              variant="bodySmall"
              style={[
                styles.subMessage,
                { color: theme.colors.error, marginTop: 8 },
              ]}
            >
              League start date has passed. Waiting for remaining members...
            </Text>
          )}
        </View>
      </BaseCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    alignItems: 'center',
    gap: 8,
  },
  message: {
    textAlign: 'center',
    fontWeight: '500',
  },
  subMessage: {
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default SchedulePlaceholder;
