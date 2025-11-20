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

/**
 * Home/Dashboard Tab
 *
 * Displays league countdown and invite friends section.
 * League data is fetched at the parent layout level (tabs/_layout.tsx)
 * and accessed via the leagueAtom.
 *
 * IMPORTANT: Defensive loading state prevents race conditions.
 * Even though index.tsx populates the atom before navigation,
 * we still handle the null case to prevent any potential flashing
 * during React hydration or tab switching.
 */
const Home = () => {
  // Read from atom - data is fetched in the parent layout
  const leagueData = useAtomValue(leagueAtom);
  const setCurrentMatchId = useSetAtom(currentMatchAtom);
  const [, setSchedule] = useAtom(allMatchupsWithPointsAtom);
  const theme = useTheme();

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

  // Defensive: Show empty SafeAreaView while league data is loading
  // This prevents blank screen flash during React hydration or race conditions
  if (!leagueData) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}
      />
    );
  }

  return (
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
  );
};

export default Home;
