import { leagueQueryAtom } from '@/atoms/leagueQueryAtom';
import BgView from '@/components/elements/BgView';
import { League, MatchToUser } from 'hustle-types';
import { useAtom } from 'jotai';
import { View } from 'lucide-react-native';
import React from 'react';
type Matches = {
  matchId: string;
  team1: MatchToUser[];
  team2: MatchToUser[];
};
type AllMatchups = Record<number, Matches>;
const SchedulePage = () => {
  const [{ data: leagueData }] = useAtom(leagueQueryAtom);

  return (
    <BgView>
      <View style={{ borderWidth: 1, borderColor: 'white' }}></View>
    </BgView>
  );
};

export default SchedulePage;
