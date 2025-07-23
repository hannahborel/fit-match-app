import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';

import { addActivity, LogActivityInput } from '@/mutations/addActivity';
import { useAuth } from '@clerk/clerk-expo';
import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ActivityDefinitions, ActivityType } from 'hustle-types';
import { Image, StickyNote } from 'lucide-react-native';
import NumberScroll from '../../../../components/library/NumberScroll';
import { useGetLeague } from '@/hooks/useGetLeague';

import { useAtom, useAtomValue } from 'jotai';
import { currentMatchAtom } from '@/atoms/matchesAtom';
import { queryClient } from '@/lib/queryClient';
import { leagueAtom } from '@/atoms/leaugeAtom';

export default function LogWorkoutScreen() {
  const [minutes, setMinutes] = useState(34);
  const theme = useTheme();
  const { typeName } = useLocalSearchParams(); // from route
  const { userId, getToken } = useAuth();
  const league = useAtomValue(leagueAtom);
  const currentMatch = useAtomValue(currentMatchAtom);

  const mutation = useMutation({
    mutationFn: async (activity: LogActivityInput) => {
      const token = await getToken();
      return addActivity(activity, token);
    },
    onSuccess: () => {
      Alert.alert('Success', 'Workout logged successfully!');
      queryClient.invalidateQueries({ queryKey: ['league'] });
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Failed to log workout');
    },
  });

  const activityData = ActivityDefinitions[typeName as ActivityType];

  const handleLogWorkout = async () => {
    if (!league || !typeName || !userId) {
      Alert.alert('Missing Info', 'Required info is missing.');

      return;
    }

    const activity: LogActivityInput = {
      leagueId: league.id,
      matchId: currentMatch?.id as string,
      activityType: typeName as ActivityType,
      duration: minutes,
      sets: 0,
      reps: 0,
      photoUrl: 'https://dummyimage.com/300',
      userId,
      activityNote: 'dummy note',
    };

    console.log(activity.activityType);

    mutation.mutate(activity);
  };

  return (
    <>
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
    </>
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
