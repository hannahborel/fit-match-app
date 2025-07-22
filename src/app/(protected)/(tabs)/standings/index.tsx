import { useGetLeague } from '@/hooks/useGetLeague';
import React from 'react';
import { Tabs, TabScreen, TabsProvider } from 'react-native-paper-tabs';
import SchedulePage from './schedulePage';
import StandingsTab from './standingsPage';

const Standings = () => {
  return (
    <TabsProvider>
      <Tabs showTextLabel={true}>
        <TabScreen label={'Standings'}>
          <StandingsTab />
        </TabScreen>
        <TabScreen label={'Schedule'}>
          <SchedulePage />
        </TabScreen>
      </Tabs>
    </TabsProvider>
  );
};

export default Standings;
