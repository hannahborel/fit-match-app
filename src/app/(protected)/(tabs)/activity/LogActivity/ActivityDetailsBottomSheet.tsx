import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { addActivity, LogActivityInput } from '@/mutations/addActivity';
import { useAuth } from '@clerk/clerk-expo';
import { useMutation } from '@tanstack/react-query';
import { ActivityDefinitions, ActivityType } from 'hustle-types';
import NumberScroll from './components/NumberScroll';
import { leagueAtom, hasLeagueStartedAtom } from '@/atoms/leagueAtom';
import { currentMatchAtom } from '@/atoms/matchesAtom';
import { queryClient } from '@/lib/queryClient';
import { useAtomValue } from 'jotai';
import BottomSheet from '@/components/elements/BottomSheet/BottomSheet';

interface ActivityDetailsBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  activityType: ActivityType | null;
}

const ActivityDetailsBottomSheet: React.FC<ActivityDetailsBottomSheetProps> = ({
  visible,
  onClose,
  activityType,
}) => {
  const [minutes, setMinutes] = useState(34);
  const [sets, setSets] = useState(4);
  const [reps, setReps] = useState(10);

  const { userId, getToken } = useAuth();
  const league = useAtomValue(leagueAtom);
  const leagueHasStarted = useAtomValue(hasLeagueStartedAtom);
  const currentMatch = useAtomValue(currentMatchAtom);

  const activityData = activityType ? ActivityDefinitions[activityType] : null;
  const formula = activityData?.activityFormula;

  const mutation = useMutation({
    mutationFn: async (activity: LogActivityInput) => {
      const token = await getToken();
      return addActivity(activity, token);
    },
    onSuccess: () => {
      Alert.alert('Success', 'Workout logged successfully!');
      queryClient.invalidateQueries({ queryKey: ['league'] });
      onClose();
    },
    onError: (error: any) => {
      Alert.alert('Error', error.message || 'Failed to log workout');
    },
  });

  const handleLogWorkout = async () => {
    if (!league || !activityType || !userId) {
      Alert.alert('Missing Info', 'Required info is missing.');
      return;
    }

    const activity: LogActivityInput = {
      leagueId: league.id,
      matchId: currentMatch?.id as string,
      activityType: activityType,
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
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={activityData?.name ?? 'Unknown Activity'}
      size="lg"
      contentContainerStyle={{
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      <View style={styles.container}>
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
            <NumberScroll
              min={0}
              max={10}
              initial={reps}
              onValueChange={setReps}
              unit={'REPS'}
            />
          </View>
        )}

        {/* Example Add Photo + Button UI */}
        <View style={styles.bottomActions}>
          <Button
            mode="contained"
            onPress={handleLogWorkout}
            loading={mutation.isPending}
            disabled={mutation.isPending || !leagueHasStarted}
            style={{ width: '60%' }}
          >
            <Text>Log Workout</Text>
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    width: '100%',
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

export default ActivityDetailsBottomSheet;
