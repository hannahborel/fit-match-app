import BgView from '@/components/elements/BgView';
import { MatchToUser } from 'hustle-types';
import { View } from 'lucide-react-native';
import React from 'react';
type Matches = {
  matchId: string;
  team1: MatchToUser[];
  team2: MatchToUser[];
};
type AllMatchups = Record<number, Matches>;
const SchedulePage = () => {
  return (
    <BgView>
      <View style={{ borderWidth: 1, borderColor: 'white' }}></View>
    </BgView>
  );
};

export default SchedulePage;
