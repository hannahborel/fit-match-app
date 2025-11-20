import React from 'react';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import SchedulePage from './components/Schedule/schedulePage';
import StandingsTab from './components/Standings/standingsPage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

const Calendar = () => {
  const theme = useTheme();
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
};

export default Calendar;
