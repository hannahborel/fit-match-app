import { getAvatarByIndex } from '@/assets/avatar';
import { Team, WeeklyMatchups } from '@/helpers/matchesHelper';
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
  const AVATAR_SIZE = 32;

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
              },
            ]}
          >
            {matchup.map((team, teamIndex) => (
              <View
                style={[
                  styles.teamContainer,
                  {
                    backgroundColor: theme.colors.surface,
                  },
                ]}
              >
                {teamIndex == 1 && (
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
                )}
                <View style={styles.playerContainer}>
                  {team.players.map((player, index) => {
                    avatarIndex += 1;
                    if (teamIndex == 0) {
                      //renders a left aligned container or a right aligned container
                      return (
                        <View
                          key={`${player} - ${index}`}
                          style={styles.player}
                        >
                          <Avatar.Image
                            size={AVATAR_SIZE}
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
                    } else {
                      return (
                        <View
                          key={`${player} - ${index}`}
                          style={styles.player}
                        >
                          <Text
                            ellipsizeMode={'clip'}
                            style={{ color: theme.colors.onSurface }}
                          >
                            Player {index}
                          </Text>
                          <Avatar.Image
                            size={AVATAR_SIZE}
                            source={getAvatarByIndex(avatarIndex)}
                          />
                        </View>
                      );
                    }
                  })}
                </View>
                {teamIndex == 0 && (
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
                )}
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
    gap: 16,
  },
  player: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  points: {},
});
