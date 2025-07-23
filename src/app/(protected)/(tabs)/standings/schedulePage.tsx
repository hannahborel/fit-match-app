import { leagueAtom } from '@/atoms/leaugeAtom';
import { AllMatchesIdAtom, currentMatchAtom } from '@/atoms/matchesAtom';
import MatchList from '@/components/library/MatchList';
import { getCurrentWeek } from '@/helpers/getCurrentWeekHelper';
import {
  mapMatchesWithTeamPoints,
  WeeklySchedule,
} from '@/helpers/matchesHelper';
import { Match } from 'hustle-types';

import { useAtomValue } from 'jotai';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

const SchedulePage = () => {
  const matchList = useAtomValue(AllMatchesIdAtom);
  const league = useAtomValue(leagueAtom);
  const currentWeek = useAtomValue(currentMatchAtom);
  const [pageIndex, setPageIndex] = useState(0);

  const extractMatches = league?.matches;
  const extractActivity = league?.loggedActivities;
  let data: WeeklySchedule[] = [];

  useEffect(() => {
    if (extractMatches && extractActivity && currentWeek) {
      data = mapMatchesWithTeamPoints(extractMatches, extractActivity);
      console.log(currentWeek.id);
      console.log(JSON.stringify(data[0]['week'], null, 2));
      setPageIndex(currentWeek.week);
    }
  }, [league?.matches]);

  // console.log(JSON.stringify(league?.matches, null, 2));
  // console.log(JSON.stringify(league, null, 2));

  // if (extractMatches && extractActivity) {
  //   const data = mapMatchesWithTeamPoints(extractMatches, extractActivity);
  //   console.log(JSON.stringify(data, null, 2));
  //   console.log(data.length);
  //   console.log('current week', currentWeek) ;
  // }

  const isReady = data && currentWeek;
  const theme = useTheme();
  return (
    <View style={{ gap: 16, flex: 1, alignItems: 'center' }}>
      {isReady && (
        <>
          <View style={styles.switchContainer}>
            <IconButton
              size={18}
              icon={() => <ChevronLeft color={theme.colors.onSurface} />}
            />
            <Text>{'Week ' + Number(currentWeek.week + 1)}</Text>
            <IconButton
              size={18}
              icon={() => <ChevronRight color={theme.colors.onSurface} />}
            />
          </View>
          <ScrollView style={{ flexGrow: 0 }} pagingEnabled horizontal>
            <MatchList />
            <MatchList />
          </ScrollView>
        </>
      )}
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
