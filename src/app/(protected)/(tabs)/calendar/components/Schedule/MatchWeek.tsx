// src/components/library/MatchWeek.tsx
import { getAvatarByIndex } from '@/assets/avatar';
import { Team, WeeklyMatchups } from '@/helpers/matchesHelper';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

export type MatchListProps = {
  week: WeeklyMatchups;
  isPreview?: boolean; // Add this prop
};

let avatarIndex = 0;

const MatchWeek = ({ week, isPreview = false }: MatchListProps) => {
  const theme = useTheme();
  const PAGE_WIDTH = Dimensions.get('window').width;
  const AVATAR_SIZE = 24;

  if (week.matchups) {
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
            key={`${index}`}
            style={[
              styles.matchContainer,
              {
                backgroundColor: 'rgb(32, 38, 52)',
                opacity: isPreview ? 0.7 : 1, // Dim preview matches
              },
            ]}
          >
            {matchup.map((team, teamIndex) => (
              <View
                key={`${teamIndex} - ${index}`}
                style={[
                  styles.teamContainer,
                  {
                    backgroundColor: theme.colors.surface,
                  },
                ]}
              >
                {teamIndex === 1 && (
                  <View style={styles.points}>
                    <Text
                      style={{
                        color: theme.colors.onSurface,
                        fontWeight: '700',
                        fontSize: 18,
                      }}
                    >
                      {team.totalPoints}
                    </Text>
                  </View>
                )}
                <View style={styles.playerContainer}>
                  {team.players.map((player, playerIdx) => {
                    avatarIndex += 1;
                    const isPlaceholder = player.isPlaceholder || false;

                    if (teamIndex === 0) {
                      return (
                        <View
                          key={`${player.userId} - ${playerIdx}`}
                          style={styles.player}
                        >
                          {isPreview ? (
                            <View
                              style={{
                                width: AVATAR_SIZE,
                                height: AVATAR_SIZE,
                                borderRadius: AVATAR_SIZE / 2,
                                backgroundColor: theme.colors.primary,
                                opacity: 0.7,
                              }}
                            />
                          ) : (
                            <Avatar.Image
                              size={AVATAR_SIZE}
                              source={getAvatarByIndex(avatarIndex)}
                              style={{
                                opacity: isPlaceholder ? 0.3 : 1,
                              }}
                            />
                          )}
                          <Text
                            ellipsizeMode={'clip'}
                            style={{
                              color: theme.colors.onSurface,
                              opacity: 1,
                              fontStyle: isPlaceholder && !isPreview ? 'italic' : 'normal',
                            }}
                          >
                            {player.name || `User ${player.userId.slice(-4)}`}
                          </Text>
                        </View>
                      );
                    } else {
                      return (
                        <View
                          key={`${player.userId} - ${playerIdx}`}
                          style={styles.player}
                        >
                          <Text
                            ellipsizeMode={'clip'}
                            style={{
                              color: theme.colors.onSurface,
                              opacity: 1,
                              fontStyle: isPlaceholder && !isPreview ? 'italic' : 'normal',
                            }}
                          >
                            {player.name || `User ${player.userId.slice(-4)}`}
                          </Text>
                          {isPreview ? (
                            <View
                              style={{
                                width: AVATAR_SIZE,
                                height: AVATAR_SIZE,
                                borderRadius: AVATAR_SIZE / 2,
                                backgroundColor: theme.colors.primary,
                                opacity: 0.7,
                              }}
                            />
                          ) : (
                            <Avatar.Image
                              size={AVATAR_SIZE}
                              source={getAvatarByIndex(avatarIndex)}
                              style={{
                                opacity: isPlaceholder ? 0.3 : 1,
                              }}
                            />
                          )}
                        </View>
                      );
                    }
                  })}
                </View>
                {teamIndex === 0 && (
                  <View style={styles.points}>
                    <Text
                      style={{
                        color: theme.colors.onSurface,
                        fontWeight: '700',
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
  }
};

export default MatchWeek;

// ... styles remain the same
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
    paddingVertical: 8,
    paddingHorizontal: 12,
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
