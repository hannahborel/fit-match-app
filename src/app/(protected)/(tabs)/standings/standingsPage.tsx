import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import BgView from '@/components/elements/BgView';
import { getDefaultStore, useAtomValue } from 'jotai';
import { leagueAtom } from '@/atoms/leagueAtom';
import { League } from 'hustle-types';
import { getLeagueStandings } from '@/helpers/getLeagueStandings';
import { BaseCard } from '@/components/elements/Card';
import { Avatar, useTheme } from 'react-native-paper';
import { getAvatarByIndex } from '@/assets/avatar';

const StandingsTab = () => {
  const leagueData = useAtomValue(leagueAtom);
  console.log(JSON.stringify(leagueData, null, 2));
  const standingsList = leagueData ? getLeagueStandings(leagueData) : [];
  console.log(standingsList);
  const theme = useTheme();
  return (
    <BgView>
      <View style={{ gap: 8 }}>
        {leagueData ? (
          standingsList.map((player, index) => (
            <TouchableOpacity
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
    </BgView>
  );
};

export default StandingsTab;
