import { leagueAtom } from '@/atoms/leagueAtom';
import BgView from '@/components/elements/BgView';
import {
  getCurrentWeekMatchIds,
  mapAllWeeksToMatchIds,
} from '@/helpers/getCurrentWeek';
import { useAtomValue } from 'jotai';
import React from 'react';
import { Text } from 'react-native';

const SchedulePage = () => {
  const leagueData = useAtomValue(leagueAtom);
  leagueData;
  if (leagueData) {
    console.log(mapAllWeeksToMatchIds(leagueData?.matches));
    console.log(getCurrentWeekMatchIds(leagueData));
  }

  return (
    <BgView>
      <Text>schedule</Text>
    </BgView>
  );
};

export default SchedulePage;
