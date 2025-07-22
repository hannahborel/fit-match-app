import { BaseCard } from '@/components/elements/Card';
import CountdownTimer from '@/components/library/CountdownTimer';

import { leagueQueryAtom } from '@/atoms/leagueQueryAtom';
import ManageLeagueSettings from '@/components/demo/ManageLeagueSettings';
import UpdateLeagueStartDateDemo from '@/components/demo/UpdateLeagueStartDate';
import DeleteLeagueButton from '@/components/demo/deleteLeagueButton';
import CustomHeader from '@/components/library/CustomHeader';
import { useAtom } from 'jotai';
import React from 'react';

const Home = () => {
  const [{ data: leagueData }] = useAtom(leagueQueryAtom);

  return (
    <>
      <CustomHeader title={'Home'} />
      {leagueData && (
        <>
          <BaseCard title={'YOUR LEAGUE STARTS IN'}>
            <CountdownTimer targetTime={leagueData.startDate} />
          </BaseCard>
          <UpdateLeagueStartDateDemo
            startDate={new Date(leagueData.startDate)}
            leagueId={leagueData.id}
          />
          <ManageLeagueSettings
            leagueId={leagueData.id}
            leagueSize={leagueData.size}
          />
          <DeleteLeagueButton leagueId={leagueData.id} />
        </>
      )}
    </>
  );
};

export default Home;
