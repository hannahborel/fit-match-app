import { leagueAtom } from '@/atoms/leagueAtom';
import BgView from '@/components/elements/BgView';
import DeleteLeagueButton from '@/components/library/DeleteLeagueButton';
import ManageLeagueSize from '@/components/library/ManageLeagueSize';
import UpdateLeagueStartDateDemo from '@/components/library/UpdateLeagueStartDate';
import { useAtomValue } from 'jotai';
import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import ManageLeagueName from '@/components/library/ManageUserDetails';
import ManageLeagueDuration from '@/components/library/ManageLeagueDuration';
import EditLeagueButton from '@/components/DeleteAccount/EditLeagueButton';

const LeagueDetails = () => {
  const theme = useTheme();
  const leagueDetails = useAtomValue(leagueAtom);
  console.log(leagueDetails);

  return (
    <BgView>
      <View style={{ gap: 20 }}>
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

              <ManageLeagueDuration
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
              <EditLeagueButton />
              <DeleteLeagueButton leagueId={leagueDetails.id} />
            </View>
          </>
        )}
      </View>
    </BgView>
  );
};

export default LeagueDetails;
