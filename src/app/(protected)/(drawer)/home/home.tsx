import CardElement from '@/components/elements/CardElement';
import ThemeWrapperBg from '@/components/elements/ThemeWrapperBg';
import CountdownTimer from '@/components/library/CountdownTimer';
import { useGetLeague } from '@/hooks/useGetLeague';
import React from 'react';

const Home = () => {
  const { data: LeagueData } = useGetLeague();

  const dummyTime = '2025-08-23T17:11:29.300Z';
  console.log(JSON.stringify(LeagueData, null, 2));
  return (
    <ThemeWrapperBg>
      <CardElement title={'YOUR LEAGUE STARTS IN'}>
        <CountdownTimer targetTime={dummyTime} />
      </CardElement>
    </ThemeWrapperBg>
  );
};

export default Home;
