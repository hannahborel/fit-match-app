import { BaseCard } from '@/components/elements/Card';
import CountdownTimer from '@/components/library/CountdownTimer';

import { leagueAtom } from '@/atoms/leaugeAtom';
import {
  allMatchupsWithPointsAtom,
  currentMatchAtom,
} from '@/atoms/matchesAtom';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import CustomHeader from '@/components/library/CustomHeader';
import {
  getCurrentWeekMatchIds,
  transformLeagueToSchedule,
} from '@/helpers/matchesHelper';
import { router } from 'expo-router';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const Home = () => {
  const leagueData = useAtomValue(leagueAtom);
  const setCurrentMatchId = useSetAtom(currentMatchAtom);
  const [, setSchedule] = useAtom(allMatchupsWithPointsAtom);
  useEffect(() => {
    if (leagueData) {
      const currentMatch = getCurrentWeekMatchIds(leagueData);
      const allMatches = transformLeagueToSchedule(leagueData);
      setCurrentMatchId(currentMatch);
      setSchedule(allMatches);
    }
  }, [leagueData]);
  const theme = useTheme();

  return (
    <>
      <CustomHeader title={'Home'} />

      {leagueData && (
        <View
          style={{
            backgroundColor: theme.colors.background,
            flex: 1,
            padding: 16,
            gap: 16,
          }}
        >
          <BaseCard title={'YOUR LEAGUE STARTS IN'}>
            <CountdownTimer targetTime={leagueData.startDate} />
          </BaseCard>
          <ButtonPrimary
            onPress={() =>
              router.push({
                pathname: 'createLeague/inviteFriends',
                params: {
                  slug: leagueData.slug,
                },
              })
            }
          >
            <Text>Invite Friends</Text>
          </ButtonPrimary>
        </View>
      )}
    </>
  );
};

export default Home;
