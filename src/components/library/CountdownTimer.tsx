// CountdownTimer.tsx
import { calculateTimeLeft } from '@/helpers/helpers';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

type CountdownTimerProps = {
  targetTime: string; // ISO date string
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const theme = useTheme();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const styles = StyleSheet.create({
    timerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },

    timeUnit: {
      alignItems: 'center',
    },
    timeValue: {
      fontSize: 24,
      fontWeight: '700',
      color: theme.colors.onSurface,
    },
    timeLabel: {
      color: '#AAAAAA',
      fontSize: 12,
      marginTop: 2,
    },
  });
  return (
    <View style={styles.timerContainer}>
      {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
        <View key={unit} style={styles.timeUnit}>
          <Text style={styles.timeValue}>
            {timeLeft[unit as keyof typeof timeLeft]}
          </Text>
          <Text style={styles.timeLabel}>
            {unit.charAt(0).toUpperCase() + unit.slice(1)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default CountdownTimer;
