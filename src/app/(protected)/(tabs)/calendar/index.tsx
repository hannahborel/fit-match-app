import React, { useState } from 'react';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import SchedulePage from './components/Schedule/schedulePage';
import StandingsTab from './components/Standings/standingsPage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { hasLeagueStarted } from '@/helpers/leagueStatus';
import PreLeagueInfo from './components/PreLeague/PreLeagueInfo';
import { useAtomValue } from 'jotai';
import { leagueAtom } from '@/atoms/leagueAtom';

const Calendar = () => {
  const theme = useTheme();
  // Determine if league has started
  const leagueData = useAtomValue(leagueAtom);
  const leagueHasStarted = leagueData ? hasLeagueStarted(leagueData) : false;
  const [showOnboarding, setShowOnboarding] = useState(true);
  // Show onboarding if league hasn't started and user hasn't completed it
  console.log('leagueHasStarted', leagueHasStarted);
  if (!leagueHasStarted && showOnboarding) {
    return <PreLeagueInfo onComplete={() => setShowOnboarding(false)} />;
  } else if (leagueHasStarted) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}
      >
        <TabsProvider defaultIndex={0}>
          <Tabs
            showTextLabel={true}
            style={{ backgroundColor: theme.colors.background }}
            theme={{
              colors: {
                primary: theme.colors.primary,
                onSurface: theme.colors.onSurface,
                onSurfaceVariant: theme.colors.onSurfaceVariant,
              },
            }}
          >
            <TabScreen label={'Standings'}>
              <StandingsTab />
            </TabScreen>
            <TabScreen label={'Schedule'}>
              <SchedulePage />
            </TabScreen>
          </Tabs>
        </TabsProvider>
      </SafeAreaView>
    );
  }
};

export default Calendar;
