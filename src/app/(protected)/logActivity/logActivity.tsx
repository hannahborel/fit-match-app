import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';

import { Image, StickyNote } from 'lucide-react-native';
import NumberScroll from '../../../components/library/NumberScroll';
import BgView from '@/components/elements/BgView';
import { useLocalSearchParams } from 'expo-router';

export default function LogWorkoutScreen() {
  const [minutes, setMinutes] = useState(34);
  const theme = useTheme();
  const { activityType } = useLocalSearchParams();
  return (
    <BgView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{activityType}</Text>
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
    </BgView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 600,
  },
});
