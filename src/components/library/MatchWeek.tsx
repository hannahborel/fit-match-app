import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { LeagueSchedule, WeeklyMatchups } from '@/helpers/matchesHelper';

export type MatchListProps = {
  week: WeeklyMatchups;
};

const MatchWeek = ({ week }: MatchListProps) => {
  const theme = useTheme();
  const PAGE_WIDTH = Dimensions.get('window').width;

  const testMap = () => {
    week.matchups.map((matchup, index) => {
      console.log('-----Matchup------');
      console.log(matchup, index);
      // console.log(JSON.stringify(matchup, null, 2));
      // matchup.map((teams, index) => {
      //   console.log('---TEAMS----');
      //   console.log(JSON.stringify(teams, null, 2));
      // });
    });
  };
  console.log(testMap());
  // console.log(JSON.stringify(week, null, 2));
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
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <Text>{index}</Text>
          </View>
        ))}
        {/* <View style={styles.matchContainer}>
        {week.matchups.map((matchup, index) => (
          <View
            style={[
              styles.teamContainer,
              {
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            {matchup.map((team, index) => (
              <>
                <View style={styles.playerContainer}>
                  {team.players.map((player, index) => (
                    <View>
                      <Text
                        ellipsizeMode={'clip'}
                        style={{ color: theme.colors.onSurface }}
                      >
                        Player + {index}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.points}>
                  <Text style={{ color: theme.colors.onSurface }}>
                    {team.totalPoints}
                  </Text>
                </View>
              </>
            ))}
          </View>
        ))}
      </View> */}
      </View>
    );
};

export default MatchWeek;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 8,
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
    padding: 16,
    backgroundColor: 'green',
  },

  playerContainer: {},
  points: {},
});
