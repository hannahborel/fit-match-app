import { leagueAtom } from '@/atoms/leaugeAtom';
import { AllMatchesIdAtom } from '@/atoms/matchesAtom';
import { mapMatchesWithTeamPoints } from '@/helpers/matchesHelper';
import { Match } from 'hustle-types';

import { useAtomValue } from 'jotai';

import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const SchedulePage = () => {
  const matchList = useAtomValue(AllMatchesIdAtom);
  const league = useAtomValue(leagueAtom);

  // console.log(JSON.stringify(league?.matches, null, 2));
  // console.log(JSON.stringify(league, null, 2));

  const matches = league?.matches;
  const activity = league?.loggedActivities;
  if (matches && activity) {
    const result = mapMatchesWithTeamPoints(matches, activity);
    console.log(JSON.stringify(result, null, 2));
  }

  const theme = useTheme();
  return (
    <View style={{ gap: 8, flex: 1 }}>
      {Object.entries(matchList).map(([weekIndex, matchId]) => (
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 6,
            padding: 16,
            flex: 1,
          }}
          key={weekIndex}
        >
          <Text style={{ color: theme.colors.onSurface }}>
            Week {weekIndex}
          </Text>
          <Text style={{ color: theme.colors.onSurface }}>
            Match Id: {matchId}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default SchedulePage;
