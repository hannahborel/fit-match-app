import { getAvatarByIndex } from '@/assets/avatar';
import { leagueAtom } from '@/atoms/leagueAtom';
import { getLeagueStandings } from '@/helpers/getLeagueStandings';
import { useAtomValue } from 'jotai';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

const StandingsTab = () => {
  const leagueData = useAtomValue(leagueAtom);

  const standingsList = leagueData ? getLeagueStandings(leagueData) : [];

  const theme = useTheme();
  // console.log(standingsList);
  // console.log(JSON.stringify(leagueData, null, 2));
  return (
    <ScrollView>
      <View style={{ gap: 16, padding: 16 }}>
        {leagueData ? (
          standingsList.map((player, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: theme.colors.surface,
                borderRadius: 6,
                paddingVertical: 8,
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <Avatar.Image size={40} source={getAvatarByIndex(index)} />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}
              >
                <Text
                  style={{
                    color: theme.colors.onSurface,
                    fontSize: 16,
                    fontWeight: 400,
                  }}
                >
                  {player.totalPoints}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Not Ready</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default StandingsTab;
