import { BaseCard } from '@/components/elements/Card';
import { CountdownTimer, InviteFriendsSection } from '@/components/Dashboard';
import CustomHeader from '@/components/library/CustomHeader';

import { leagueAtom } from '@/atoms/leagueAtom';
import {
  allMatchupsWithPointsAtom,
  currentMatchAtom,
} from '@/atoms/matchesAtom';
import {
  getCurrentWeekMatchIds,
  transformLeagueToSchedule,
} from '@/helpers/matchesHelper';
import { enrichScheduleWithUsers } from '@/helpers/enrichScheduleWithUsers';
import { shouldShowSchedule } from '@/helpers/leagueStatus';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

const Home = () => {
  // Use the atom which is now updated by the main loading page
  const leagueData = useAtomValue(leagueAtom);
  const setCurrentMatchId = useSetAtom(currentMatchAtom);
  const [, setSchedule] = useAtom(allMatchupsWithPointsAtom);
  useEffect(() => {
    if (leagueData) {
      // Only generate schedule if it should be shown
      if (shouldShowSchedule(leagueData)) {
        const currentMatch = getCurrentWeekMatchIds(leagueData);
        const allMatches = transformLeagueToSchedule(leagueData);
        setCurrentMatchId(currentMatch);

        // Enrich schedule with user names
        enrichScheduleWithUsers(allMatches, leagueData).then(
          (enrichedSchedule) => {
            setSchedule(enrichedSchedule);
          },
        );
      } else {
        // Clear schedule data when it shouldn't be shown
        setCurrentMatchId(null);
        setSchedule(undefined);
      }
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

          <InviteFriendsSection league={leagueData} />
        </View>
      )}
    </>
  );
};

export default Home;
