import CardElement from '@/components/elements/CardElement';
import ThemeWrapperBg from '@/components/elements/ThemeWrapperBg';
import CountdownTimer from '@/components/library/CountdownTimer';

import React from 'react';

const Home = () => {
  const dummyTime = '2025-08-23T17:11:29.300Z';

  return (
    <ThemeWrapperBg>
      <CardElement title={'YOUR LEAGUE STARTS IN'}>
        <CountdownTimer targetTime={dummyTime} />
      </CardElement>
    </ThemeWrapperBg>
  );
};

export default Home;
