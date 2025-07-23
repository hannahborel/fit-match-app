import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const MatchList = () => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.matchContainer,
        {
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <View style={styles.teamContainer}>
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
      <View style={styles.teamContainer}>
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
  );
};

export default MatchList;
const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    gap: 8,
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
