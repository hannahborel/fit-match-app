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
import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

const Home = () => {
  // Use the atom which is now updated by the main loading page
  const leagueData = useAtomValue(leagueAtom);
  const setCurrentMatchId = useSetAtom(currentMatchAtom);
  const [, setSchedule] = useAtom(allMatchupsWithPointsAtom);
  const router = useRouter();

  // Safety check: if user somehow gets to dashboard without a league, redirect them
  useEffect(() => {
    if (leagueData === null) {
      router.replace('/(protected)/createLeague');
    }
  }, [leagueData, router]);

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

  // Show loading state while league data is being fetched
  if (leagueData === undefined) {
    return (
      <>
        <CustomHeader title={'Home'} />
        <View
          style={{
            backgroundColor: theme.colors.background,
            flex: 1,
            padding: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: theme.colors.onBackground }}>
            Loading your league...
          </Text>
        </View>
      </>
    );
  }

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
