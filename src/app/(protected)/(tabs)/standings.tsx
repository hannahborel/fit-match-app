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

const Standings = () => {
  const { data, error } = useGetLeague();

  const parsedData = JSON.stringify(data, null, 2);

  return (
    <BgView padding={0}>
      <TabsProvider
        defaultIndex={0}
        // onChangeIndex={handleChangeIndex} optional
      >
        <Tabs showTextLabel={true}>
          <Text>Standings</Text>
          <Text>Schedule</Text>
        </Tabs>
      </TabsProvider>
      <Text style={{ color: 'white' }}>{parsedData}</Text>
    </BgView>
  );
};

export default Standings;
