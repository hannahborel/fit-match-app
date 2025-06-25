import CardElement from '@/components/elements/CardElement';
import CountdownTimer from '@/components/library/CountdownTimer';
import { useGetLeague } from '@/hooks/useGetLeague';
import React from 'react';
import { View } from 'react-native';

const home = () => {
  const { data: LeagueData } = useGetLeague();

  const dummyTime = '2025-08-23T17:11:29.300Z';
  console.log(JSON.stringify(LeagueData, null, 2));
  return (
    <View style={{ flex: 1 }}>
      <CardElement title={'YOUR LEAGUE STARTS IN'}>
        <CountdownTimer targetTime={dummyTime} />
      </CardElement>
    </View>
  );
};

export default home;
