import { BaseCard } from '@/components/elements/Card';
import BgView from '@/components/elements/BgView';
import CountdownTimer from '@/components/library/CountdownTimer';

import React from 'react';
import UpdateLeagueStartDateDemo from '@/components/demo/UpdateLeagueStartDate';
import { useAtomValue } from 'jotai';
import { leagueAtom } from '@/atoms/leagueAtom';

const Home = () => {
  const dummyTime = '2025-08-23T17:11:29.300Z';
  const leagueData = useAtomValue(leagueAtom);

  return (
    <BgView>
      {leagueData && (
        <>
          <BaseCard title={'YOUR LEAGUE STARTS IN'}>
            <CountdownTimer targetTime={leagueData.startDate} />
          </BaseCard>
          <UpdateLeagueStartDateDemo
            startDate={new Date(leagueData.startDate)}
            leagueId={leagueData.id}
          />
        </>
      )}
    </BgView>
  );
};

export default Home;
