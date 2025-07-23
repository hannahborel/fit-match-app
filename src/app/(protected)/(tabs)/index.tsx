import { BaseCard } from '@/components/elements/Card';
import CountdownTimer from '@/components/library/CountdownTimer';

import { leagueAtom } from '@/atoms/leaugeAtom';
import { AllMatchesIdAtom, currentMatchAtom } from '@/atoms/matchesAtom';
import ManageLeagueSettings from '@/components/demo/ManageLeagueSettings';
import UpdateLeagueStartDateDemo from '@/components/demo/UpdateLeagueStartDate';
import DeleteLeagueButton from '@/components/demo/deleteLeagueButton';
import CustomHeader from '@/components/library/CustomHeader';
import {
  getCurrentWeekMatchIds,
  mapAllWeeksToMatchIds,
} from '@/helpers/matchesHelper';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

const Home = () => {
  const leagueData = useAtomValue(leagueAtom);
  const setCurrentMatchId = useSetAtom(currentMatchAtom);
  const setMatchIdList = useSetAtom(AllMatchesIdAtom);
  useEffect(() => {
    if (leagueData) {
      const currentMatch = getCurrentWeekMatchIds(leagueData);
      const allMatchIds = mapAllWeeksToMatchIds(leagueData.matches);
      setCurrentMatchId(currentMatch);
      setMatchIdList(allMatchIds);
    }
  }, [leagueData]);
  const theme = useTheme();

  return (
    <>
      <CustomHeader title={'Home'} />

      {leagueData && (
        <View
          style={{
            backgroundColor: theme.colors.background,
            flex: 1,
            padding: 16,
            gap: 16,
          }}
        >
          <BaseCard title={'YOUR LEAGUE STARTS IN'}>
            <CountdownTimer targetTime={leagueData.startDate} />
          </BaseCard>
          <UpdateLeagueStartDateDemo
            startDate={new Date(leagueData.startDate)}
            leagueId={leagueData.id}
          />
          <ManageLeagueSettings
            leagueId={leagueData.id}
            leagueSize={leagueData.size}
          />
          <DeleteLeagueButton leagueId={leagueData.id} />
        </View>
      )}
    </>
  );
};

export default Home;
