import { leagueAtom } from '@/atoms/leagueAtom';
import DeleteLeagueButton from '@/components/library/DeleteLeagueButton';
import LeagueDuration from '@/components/library/LeagueDuration';
import ManageLeagueSize from '@/components/library/ManageLeagueSize';
import ManageLeagueName from '@/components/library/ManageUserDetails';
import UpdateLeagueStartDateDemo from '@/components/library/UpdateLeagueStartDate';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const LeagueDetails = () => {
  const theme = useTheme();
  const leagueDetails = useAtomValue(leagueAtom);

  return (
    <SafeAreaView>
      <View style={{ gap: 20, padding: 8 }}>
        {leagueDetails && (
          <>
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <ManageLeagueName leagueName={leagueDetails.name} />

              <LeagueDuration
                leagueId={leagueDetails.id}
                weeks={leagueDetails.weeks}
              />

              <ManageLeagueSize
                leagueId={leagueDetails.id}
                leagueSize={leagueDetails.size}
              />
              <UpdateLeagueStartDateDemo
                startDate={new Date(leagueDetails.startDate)}
                leagueId={leagueDetails.id}
              />
            </View>
            <View style={{ gap: 12 }}>
              <DeleteLeagueButton leagueId={leagueDetails.id} />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LeagueDetails;
