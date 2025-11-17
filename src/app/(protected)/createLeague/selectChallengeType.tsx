import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import FaceOffImg from '../../../assets/svg/faceOffImg.svg';
import { router } from 'expo-router';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
const selectChallengeType = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: 'rgba(0, 206, 184, 0.1)',
              borderWidth: 1,
              borderColor: 'rgba(0, 206, 184, 1)',
            },
          ]}
        >
          <FaceOffImg />
          <Text style={{ fontSize: 12, color: theme.colors.onSurface }}>
            Grab 4 or more friends for this league-style competition. FaceOff
            against your friends in weekly battles to see where you stack up.
          </Text>
        </View>

        <View>
          <ButtonPrimary
            onPress={() => router.push('/createLeague/faceOffSetup')}
          >
            <Text>Start</Text>
          </ButtonPrimary>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  container: {
    width: '100%',
    height: '30%',
    flexDirection: 'column',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
});
export default selectChallengeType;

{
  /*
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
        </TouchableOpacity> */
}
