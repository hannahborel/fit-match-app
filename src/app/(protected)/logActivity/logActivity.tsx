import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';

import { Image, StickyNote } from 'lucide-react-native';
import NumberScroll from './NumberScroll';

export default function LogWorkoutScreen() {
  const [minutes, setMinutes] = useState(34);
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ELLIPTICAL</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          gap: 8,
        }}
      >
        <NumberScroll
          min={0}
          max={120}
          initial={34}
          onValueChange={setMinutes}
        />
        <Text style={styles.label}>MINUTES</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <IconButton
          mode="outlined"
          style={{ borderColor: theme.colors.onPrimaryContainer }}
          icon={() => <Image color={theme.colors.onPrimaryContainer} />}
          size={24}
        />
        <IconButton
          mode="outlined"
          style={{ borderColor: theme.colors.onPrimaryContainer }}
          iconColor={'red'}
          icon={() => <StickyNote color={theme.colors.onPrimaryContainer} />}
          size={24}
        />
      </View>
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
  },
  titleContainer: {
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
});
