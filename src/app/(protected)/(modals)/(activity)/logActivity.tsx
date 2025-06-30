import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NumberScroller } from '@/app/(protected)/(tabs)/activity/components/NumberScroll';

export default function LogWorkoutScreen() {
  const [minutes, setMinutes] = useState(34);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ELLIPTICAL</Text>
      <NumberScroller
        min={0}
        max={120}
        initial={34}
        onValueChange={setMinutes}
      />
      <Text style={styles.label}>MINUTES</Text>
      <Button
        mode="contained"
        onPress={() => console.log(`Logged: ${minutes} min`)}
      >
        <Text>Log Workout</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121826',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 16,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginVertical: 16,
  },
});
