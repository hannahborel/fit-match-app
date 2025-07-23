import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const MatchList = () => {
  const theme = useTheme();
  const PAGE_WIDTH = Dimensions.get('window').width;

  return (
    <View style={[styles.wrapper, { width: PAGE_WIDTH - 32 }]}>
      <View style={styles.matchContainer}>
        <View
          style={[
            styles.teamContainer,
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <View style={styles.playerContainer}>
            <View>
              <Text style={{ color: theme.colors.onSurface }}>Player 1</Text>
            </View>
            <View>
              <Text style={{ color: theme.colors.onSurface }}>Player 2</Text>
            </View>
          </View>
          <View style={styles.points}>
            <Text style={{ color: theme.colors.onSurface }}>Points</Text>
          </View>
        </View>
        <View
          style={[
            styles.teamContainer,
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <View style={styles.points}>
            <Text style={{ color: theme.colors.onSurface }}>Points</Text>
          </View>
          <View style={styles.playerContainer}>
            <View>
              <Text style={{ color: theme.colors.onSurface }}>Player 1</Text>
            </View>
            <View>
              <Text style={{ color: theme.colors.onSurface }}>Player 2</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MatchList;
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',

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
  },

  playerContainer: {},
  points: {},
});
