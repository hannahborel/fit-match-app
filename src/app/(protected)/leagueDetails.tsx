import ThemeWrapperBg from '@/components/elements/ThemeWrapperBg';

import React from 'react';
import { Avatar, Text, useTheme } from 'react-native-paper';

import { useQueryClient } from '@tanstack/react-query';
import { View } from 'react-native';
import { LeagueResponse } from '@/types/types';
import { Row } from '@/components/elements/Table/TableElements';
import { formatDate } from '@/helpers/helpers';

const leagueDetails = () => {
  // const theme = useTheme();
  const queryClient = useQueryClient();
  const theme = useTheme();
  const cachedLeagueResponse: LeagueResponse | undefined =
    queryClient.getQueryData(['league']);

  const leagueDetails = cachedLeagueResponse?.league;
  const leaguePlayers = cachedLeagueResponse?.league.leaguesToUsers;

  return (
    <ThemeWrapperBg>
      <View style={{ gap: 12 }}>
        {leagueDetails ? (
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
                col2={formatDate(leagueDetails.startDate) + ' weeks'}
              />
              <Row
                col1={'Duration'}
                col2={leagueDetails.weeks.toString()}
                lastRow={true}
              />
            </View>
            <View>
              {leaguePlayers?.map((user, index) => (
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
              ))}
            </View>
          </>
        ) : (
          <View>
            <Text> No data or undefined</Text>
          </View>
        )}
      </View>
    </ThemeWrapperBg>
  );
};

export default leagueDetails;
