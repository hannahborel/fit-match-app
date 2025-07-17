import BgView from '@/components/elements/BgView';
import { useGetLeague } from '@/hooks/useGetLeague';
import React from 'react';
import { Text } from 'react-native';
import {
  TabsProvider,
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import StandingsTab from './standingsPage';
import SchedulePage from './schedulePage';

const Standings = () => {
  const { data, error } = useGetLeague();

  const parsedData = JSON.stringify(data, null, 2);
  console.log(parsedData);

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
