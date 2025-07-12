import { BaseCard } from '@/components/elements/Card';
import BgView from '@/components/elements/BgView';
import CountdownTimer from '@/components/library/CountdownTimer';

import React from 'react';

const Home = () => {
  const dummyTime = '2025-08-23T17:11:29.300Z';

  return (
    <BgView>
      <BaseCard title={'YOUR LEAGUE STARTS IN'}>
        <CountdownTimer targetTime={dummyTime} />
      </BaseCard>
    </BgView>
  );
};

export default Home;
