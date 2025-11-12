import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import { addActivity, LogActivityInput } from '@/mutations/addActivity';
import { useAuth } from '@clerk/clerk-expo';
import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ActivityDefinitions, ActivityType, League } from 'hustle-types';
import { Image, StickyNote } from 'lucide-react-native';
import NumberScroll from '../../../../components/library/NumberScroll';
import { leagueAtom } from '@/atoms/leagueAtom';
import { currentMatchAtom } from '@/atoms/matchesAtom';
import { queryClient } from '@/lib/queryClient';
import { useAtomValue } from 'jotai';
import { hasLeagueStarted } from '@/helpers/leagueStatus';

export default function LogWorkoutScreen() {
  const [minutes, setMinutes] = useState(34);
  const [sets, setSets] = useState(4);
  const [reps, setReps] = useState(12);

  const { typeName } = useLocalSearchParams();
  const { userId, getToken } = useAuth();
  const league = useAtomValue(leagueAtom);
  const currentMatch = useAtomValue(currentMatchAtom);

  const activityData = ActivityDefinitions[typeName as ActivityType];
  const formula = activityData?.activityFormula;

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

  const handleLogWorkout = async () => {
    if (!league || !typeName || !userId) {
      Alert.alert('Missing Info', 'Required info is missing.');
      return;
    }

    const activity: LogActivityInput = {
      leagueId: league.id,
      matchId: currentMatch?.id as string,
      activityType: typeName as ActivityType,
      duration: formula === 'DURATION' ? minutes : 0,
      sets: formula === 'SETSANDREPS' ? sets : 0,
      reps: formula === 'SETSANDREPS' ? reps : 0,
      photoUrl: 'https://dummyimage.com/300',
      userId,
      activityNote: 'dummy note',
    };

    mutation.mutate(activity);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {activityData?.name ?? 'Unknown Activity'}
      </Text>

      {formula === 'DURATION' && (
        <View style={styles.centered}>
          <NumberScroll
            min={0}
            max={120}
            initial={34}
            onValueChange={setMinutes}
            unit={'MINUTES'}
          />
        </View>
      )}

      {formula === 'SETSANDREPS' && (
        <View style={styles.dualScroll}>
          <NumberScroll
            min={0}
            max={10}
            initial={sets}
            onValueChange={setSets}
            unit={'SETS'}
          />
        </View>
      )}

      {/* Example Add Photo + Button UI */}
      <View style={styles.bottomActions}>
        <Button
          mode="contained"
          onPress={handleLogWorkout}
          loading={mutation.isPending}
          disabled={mutation.isPending || !hasLeagueStarted(league as League)}
          style={{ width: '60%' }}
        >
          <Text>Log Workout</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  dualScroll: {
    gap: 20,
  },
  bottomActions: {
    marginTop: 32,
    alignItems: 'center',
  },
});

{
  /* <View style={{ flexDirection: 'row', gap: 8 }}>
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
      </View> */
}
