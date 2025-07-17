import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';

import BgView from '@/components/elements/BgView';
import { addActivity, LogActivityInput } from '@/mutations/addActivity';
import { useAuth } from '@clerk/clerk-expo';
import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ActivityDefinitions, ActivityType } from 'hustle-types';
import { Image, StickyNote } from 'lucide-react-native';
import NumberScroll from '../../../../components/library/NumberScroll';

export default function LogWorkoutScreen() {
  const [minutes, setMinutes] = useState(34);
  const theme = useTheme();
  const { typeName } = useLocalSearchParams(); // from route
  const { userId, getToken } = useAuth();

  const leagueId = '20a4f7d3-989f-47a7-a6ef-e80342d385e8';
  const matchId = '6fe084c9-efd8-4e67-905f-5d5780b20e6c';

  const mutation = useMutation({
    mutationFn: async (activity: LogActivityInput) => {
      const token = await getToken();
      return addActivity(activity, token);
    },
    onSuccess: () => {
      Alert.alert('Success', 'Workout logged successfully!');
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Failed to log workout');
    },
  });

  const activityData = ActivityDefinitions[typeName as ActivityType];

  const handleLogWorkout = async () => {
    if (!leagueId || !matchId || !typeName || !userId) {
      Alert.alert('Missing Info', 'Required info is missing.');
      return;
    }

    const activity: LogActivityInput = {
      leagueId,
      matchId,
      activityType: typeName as ActivityType,
      duration: minutes,
      sets: 0,
      reps: 0,
      photoUrl: 'https://dummyimage.com/300',
      userId,
      activityNote: 'dummy note',
    };

    mutation.mutate(activity);
  };

  return (
    <BgView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {activityData?.name ?? 'Unknown Activity'}
        </Text>
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
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
        onPress={handleLogWorkout}
        loading={mutation.isPending}
        disabled={mutation.isPending}
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
    fontWeight: '600',
  },
});
