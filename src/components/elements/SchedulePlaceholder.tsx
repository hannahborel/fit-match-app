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

  if (hasStarted) {
    return (
      <View style={styles.container}>
        <BaseCard title="Schedule Coming Soon">
          <View style={styles.content}>
            <Text variant="bodyLarge" style={styles.message}>
              The league has started! The schedule will be available once all
              members have joined.
            </Text>
          </View>
        </BaseCard>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BaseCard title="Waiting for Members">
        <View style={styles.content}>
          <Text variant="bodyLarge" style={styles.message}>
            There are {membersNeeded} member{membersNeeded !== 1 ? 's' : ''} of
            your league left to join
          </Text>
          <Text
            variant="bodyMedium"
            style={[
              styles.subMessage,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            The schedule will be visible once the league is full or starts
          </Text>
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
