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

import { leagueAtom } from '@/atoms/leaugeAtom';
import { currentMatchAtom } from '@/atoms/matchesAtom';
import { queryClient } from '@/lib/queryClient';
import { useAtomValue } from 'jotai';
import BgView from '@/components/elements/BgView';

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

    mutation.mutate(activity);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16, // optional spacing between elements
      }}
    >
      <Text style={styles.title}>
        {activityData?.name ?? 'Unknown Activity'}
      </Text>

      <NumberScroll min={0} max={120} initial={34} onValueChange={setMinutes} />

      {/* <View style={{ flexDirection: 'row', gap: 8 }}>
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
      </View> */}

      <Button
        mode="contained"
        onPress={handleLogWorkout}
        loading={mutation.isPending}
        disabled={mutation.isPending}
        style={{ width: '50%', marginTop: 16 }}
      >
        <Text>Log Workout</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {},
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
});
