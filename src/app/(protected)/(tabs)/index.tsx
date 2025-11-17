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

import { shouldShowSchedule } from '@/helpers/leagueStatus';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  // Read from atom - data is fetched in the parent layout
  const leagueData = useAtomValue(leagueAtom);
  const setCurrentMatchId = useSetAtom(currentMatchAtom);
  const [, setSchedule] = useAtom(allMatchupsWithPointsAtom);

  // Safety check: if user somehow gets to dashboard withouct a league, redirect them

  useEffect(() => {
    if (leagueData) {
      // Only generate schedule if it should be shown
      if (shouldShowSchedule(leagueData)) {
        const currentMatch = getCurrentWeekMatchIds(leagueData);
        const allMatches = transformLeagueToSchedule(leagueData);
        setCurrentMatchId(currentMatch);

        // Enrich schedule with user names
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
      {leagueData && (
        <SafeAreaView
          style={{
            backgroundColor: theme.colors.background,
            flex: 1,
          }}
        >
          <View style={{ padding: 8, gap: 16 }}>
            <BaseCard title={'YOUR LEAGUE STARTS IN'}>
              <CountdownTimer targetTime={leagueData.startDate} />
            </BaseCard>

            <InviteFriendsSection league={leagueData} />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default Home;
