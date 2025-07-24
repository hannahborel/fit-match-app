import { getAvatarByIndex } from '@/assets/avatar';
import { WeeklyMatchups } from '@/helpers/matchesHelper';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

export type MatchListProps = {
  week: WeeklyMatchups;
};

let avatarIndex = 0;

const MatchWeek = ({ week }: MatchListProps) => {
  const theme = useTheme();
  const PAGE_WIDTH = Dimensions.get('window').width;

  if (week.matchups)
    return (
      <ScrollView
        contentContainerStyle={[
          styles.wrapper,
          {
            width: PAGE_WIDTH,
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
                  {team.players.map((player, index) => {
                    avatarIndex += 1;
                    return (
                      <View style={styles.player}>
                        <Avatar.Image
                          size={35}
                          source={getAvatarByIndex(avatarIndex)}
                        />
                        <Text
                          ellipsizeMode={'clip'}
                          style={{ color: theme.colors.onSurface }}
                        >
                          Player {index}
                        </Text>
                      </View>
                    );
                  })}
                </View>
                <View style={styles.points}>
                  <Text
                    style={{
                      color: theme.colors.onSurface,
                      fontWeight: 700,
                      fontSize: 18,
                    }}
                  >
                    {team.totalPoints}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    );
};

export default MatchWeek;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 16,
  },
  matchContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 6,
    gap: 8,
  },
  teamContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
    padding: 8,
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
