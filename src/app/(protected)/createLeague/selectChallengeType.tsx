import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import DuelImg from '../../../assets/svg/duelImg.svg';
import FaceOffImg from '../../../assets/svg/faceOffImg.svg';
import StepsChallageImg from '../../../assets/svg/stepsChallageImg.svg';
const selectChallengeType = () => {
  const theme = useTheme();

  return (
    <View style={styles.parent}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(0, 206, 184, 0.1)',
          },
        ]}
      >
        <FaceOffImg />
        <Text style={{ fontSize: 12, color: theme.colors.onSurface }}>
          Grab 4 or more friends for this league-style competition. FaceOff
          against your friends in weekly battles to see where you stack up.
        </Text>
      </View>

      <View
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(41, 49, 66, 1)',
          },
        ]}
      >
        <StepsChallageImg />
        <Text style={{ fontSize: 12, color: theme.colors.onSurface }}>
          Anyone can talk the talk, but who can walk the walk? Log the most
          steps, take home the title
        </Text>
      </View>

      <View
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(47, 112, 250, 0.16)',
          },
        ]}
      >
        <DuelImg />
        <Text style={{ fontSize: 12, color: theme.colors.onSurface }}>
          Call someone out in this head to head battle.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    margin: 16,
    flex: 1,
    justifyContent: 'space-between',
    gap: 20,
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    flex: 1,
    gap: 20,
  },
});
export default selectChallengeType;
