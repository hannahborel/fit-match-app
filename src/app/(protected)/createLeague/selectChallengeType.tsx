import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import DuelImg from '../../../assets/svg/duelImg.svg';
import FaceOffImg from '../../../assets/svg/faceOffImg.svg';
import StepsChallageImg from '../../../assets/svg/stepsChallageImg.svg';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
const selectChallengeType = () => {
  const theme = useTheme();

  return (
    <View style={styles.parent}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(0, 206, 184, 0.1)',
            borderWidth: 1,
            borderColor: 'rgba(0, 206, 184, 1)',
          },
        ]}
        onPress={() => router.push('/createLeague/faceOffSetup')}
      >
        <FaceOffImg />
        <Text style={{ fontSize: 12, color: theme.colors.onSurface }}>
          Grab 4 or more friends for this league-style competition. FaceOff
          against your friends in weekly battles to see where you stack up.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(41, 49, 66, 1)',
            borderWidth: 1,
            borderColor: '  rgb(0, 42, 133)',
          },
        ]}
      >
        <StepsChallageImg />
        <Text style={{ fontSize: 12, color: theme.colors.onSurface }}>
          Anyone can talk the talk, but who can walk the walk? Log the most
          steps, take home the title
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(47, 112, 250, 0.16)',
            borderWidth: 1,
            borderColor: '  rgba(47, 112, 250, 1)',
          },
        ]}
      >
        <DuelImg />
        <Text style={{ fontSize: 12, color: theme.colors.onSurface }}>
          Call someone out in this head to head battle.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    height: '90%',
    justifyContent: 'space-around',
    padding: 20,
    gap: 20,
  },
  container: {
    width: '100%',
    height: '30%',
    flexDirection: 'column',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // flex: 1,
    gap: 20,
  },
});
export default selectChallengeType;
