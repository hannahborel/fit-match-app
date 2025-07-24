import { leagueAtom } from '@/atoms/leaugeAtom';
import DeleteLeagueButton from '@/components/demo/deleteLeagueButton';
import UpdateLeagueSize from '@/components/demo/ManageLeagueSettings';
import ManageLeagueSettings from '@/components/demo/ManageLeagueSettings';
import BgView from '@/components/elements/BgView';
import { Row } from '@/components/elements/Table/TableElements';
import { formatDate } from '@/helpers/helpers';
import { useAtom, useAtomValue } from 'jotai';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

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

              <Row
                col1={'Start Date'}
                col2={formatDate(leagueDetails.startDate)}
              />

              <Row
                col1={'Duration'}
                col2={leagueDetails.weeks.toString() + ' weeks'}
              />
              <UpdateLeagueSize
                leagueId={leagueDetails.id}
                leagueSize={leagueDetails.size}
              />
            </View>
            <DeleteLeagueButton leagueId={leagueDetails.id} />

            <View>
              {/* {leagueDetails.leaguesToUsers.map((user, index) => (
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
