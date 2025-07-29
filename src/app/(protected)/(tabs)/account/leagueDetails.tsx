import { leagueAtom } from '@/atoms/leaugeAtom';
import DeleteLeagueButton from '@/components/library/deleteLeagueButton';
import ManageLeagueSize from '@/components/library/ManageLeagueSize';
import UpdateLeagueStartDateDemo from '@/components/library/UpdateLeagueStartDate';
import BgView from '@/components/elements/BgView';
import { Row } from '@/components/elements/Table/TableElements';
import { useAtomValue } from 'jotai';
import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import { router } from 'expo-router';

const leagueDetails = () => {
  const theme = useTheme();

  const leagueDetails = useAtomValue(leagueAtom);

  return (
    <BgView>
      <View style={{ gap: 12 }}>
        {leagueDetails && (
          <>
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 6,
              }}
            >
              <Row col1={'League Name'} col2={leagueDetails.name} />

              {/* <Row
                col1={'Start Date'}
                col2={formatDate(leagueDetails.startDate)}
              /> */}

              <Row
                col1={'Duration'}
                col2={leagueDetails.weeks.toString() + ' weeks'}
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
            <DeleteLeagueButton leagueId={leagueDetails.id} />

            <View>
              {/* {leagueDeta ils.leaguesToUsers.map((user, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                  key={user.id}
                >
                  <View>
                    <Avatar.Image
                      size={24}
                      source={{
                        uri: `https://ui-avatars.com/api/?name=John+Doe&background=random`,
                      }}
                    />
                  </View>
                  <View>
                    <Text>User {index + 1}</Text>
                  </View>
                </View>
              ))} */}
            </View>
          </>
        )}
      </View>
    </BgView>
  );
};

export default leagueDetails;
