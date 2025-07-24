import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Avatar, useTheme } from 'react-native-paper';
import { LeagueSchedule, WeeklyMatchups } from '@/helpers/matchesHelper';
import AvatarImage from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage';
import { getAvatarByIndex } from '@/assets/avatar';

export type MatchListProps = {
  week: WeeklyMatchups;
};

const MatchWeek = ({ week }: MatchListProps) => {
  const theme = useTheme();
  const PAGE_WIDTH = Dimensions.get('window').width;

  if (week.matchups)
    return (
      <View
        style={[
          styles.wrapper,
          {
            width: PAGE_WIDTH - 32,
          },
        ]}
      >
        {week.matchups.map((matchup, index) => (
          <View
            style={[
              styles.matchContainer,
              {
                backgroundColor: 'rgb(32, 38, 52)',
                padding: 8,
              },
            ]}
          >
            {matchup.map((team, index) => (
              <View
                style={[
                  styles.teamContainer,
                  {
                    backgroundColor: theme.colors.surface,
                  },
                ]}
              >
                <View style={styles.playerContainer}>
                  {team.players.map((player, index) => (
                    <View style={styles.player}>
                      <Avatar.Image
                        size={35}
                        source={getAvatarByIndex(index)}
                      />
                      <Text
                        ellipsizeMode={'clip'}
                        style={{ color: theme.colors.onSurface }}
                      >
                        Player {index}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.points}>
                  <Text style={{ color: theme.colors.onSurface }}>
                    {team.totalPoints}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
};

export default MatchWeek;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 16,
    marginHorizontal: 16,
  },
  matchContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 6,
    gap: 16,
  },
  teamContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
  },

  playerContainer: {
    gap: 8,
  },
  player: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  points: {},
});
