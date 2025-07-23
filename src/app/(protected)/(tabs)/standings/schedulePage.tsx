import { leagueAtom } from '@/atoms/leaugeAtom';
import { AllMatchesIdAtom } from '@/atoms/matchesAtom';
import MatchList from '@/components/library/MatchList';
import { mapMatchesWithTeamPoints } from '@/helpers/matchesHelper';
import { Match } from 'hustle-types';

import { useAtomValue } from 'jotai';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

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
    <View style={{ gap: 16, flex: 1, alignItems: 'center' }}>
      <View style={styles.switchContainer}>
        <IconButton
          size={18}
          icon={() => <ChevronLeft color={theme.colors.onSurface} />}
        />
        <Text>WEEK X</Text>
        <IconButton
          size={18}
          icon={() => <ChevronRight color={theme.colors.onSurface} />}
        />
      </View>
      <MatchList />
    </View>
  );
};

{
  /* {Object.entries(matchList).map(([weekIndex, matchId]) => (
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
      ))} */
}

export default SchedulePage;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    gap: 8,
  },
});
