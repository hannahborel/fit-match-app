import { leagueAtom } from '@/atoms/leagueAtom';
import BgView from '@/components/elements/BgView';
import {
  getCurrentWeekMatchIds,
  mapAllWeeksToMatchIds,
} from '@/helpers/getCurrentWeek';
import { League, Match, MatchToUser } from 'hustle-types';
import { useAtomValue } from 'jotai';
import { View } from 'lucide-react-native';
import React from 'react';
import { Text } from 'react-native';
type Matches = {
  matchId: string;
  team1: MatchToUser[];
  team2: MatchToUser[];
};
type AllMatchups = Record<number, Matches>;
const SchedulePage = () => {
  const leagueData = useAtomValue(leagueAtom);
  const formattedMatchups: AllMatchups = {};

  const createMatchups = (leagueData: League) => {
    console.log('--------CREATE MATCHUP--------');
    for (const match of leagueData.matches) {
      console.log(console.log(JSON.stringify(match, null, 2)));
      let week = match.week;
      if (!formattedMatchups[week]) {
        formattedMatchups[week] = { matchId: '', team1: [], team2: [] };
      }
      for (const m of match.matchesToUsers) {
        const team = m.teamIndex;
        const matchId = m.matchId;

        if (formattedMatchups[week].matchId == '') {
          formattedMatchups[week].matchId;
        }
      }
    }
    console.log('formatted matchups', formattedMatchups);
  };

  if (leagueData) {
    console.log(JSON.stringify(leagueData, null, 2));
    // console.log(createMatchups(leagueData));
  }

  // console.log(leagueData);
  // console.log(mapAllWeeksToMatchIds(leagueData?.matches));
  // console.log(getCurrentWeekMatchIds(leagueData));

  return (
    <BgView>
      <View style={{ borderWidth: 1, borderColor: 'white' }}></View>
    </BgView>
  );
};

export default SchedulePage;
