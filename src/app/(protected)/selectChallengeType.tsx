import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import StepsChallageImg from '../../assets/svg/stepsChallageImg.svg';
import FaceOffImg from '../../assets/svg/faceOffImg.svg';
import DuelImg from '../../assets/svg/duelImg.svg';
import { Card } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { router } from 'expo-router';
const selectChallengeType = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <View style={{ width: 350, height: '70%', gap: 16 }}>
        <Card
          onPress={() => router.push('/faceOffSetup')}
          style={{
            backgroundColor: 'rgba(41, 49, 66, 1)',
            height: '33%',
            paddingVertical: 16,
          }}
        >
          <Card.Content
            style={{
              alignItems: 'center',
              height: '100%',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <FaceOffImg />
            <Text style={{ fontSize: 12, color: theme.colors.onSurface, textAlign: 'center' }}>
              Grab 4 or more friends for this league-style competition. FaceOff against your friends
              in weekly battles to see where you stack up.
            </Text>
          </Card.Content>
        </Card>
        <Card
          style={{
            backgroundColor: 'rgba(0, 206, 184, 0.1)',
            height: '33%',
            paddingVertical: 20,
          }}
        >
          <Card.Content
            style={{ alignItems: 'center', height: '100%', justifyContent: 'space-between' }}
          >
            <StepsChallageImg />
            <Text style={{ fontSize: 12, color: theme.colors.onSurface }}>
              Anyone can talk the talk, but who can walk the walk? Log the most steps, take home the
              title
            </Text>
          </Card.Content>
        </Card>

        <Card
          style={{
            backgroundColor: 'rgba(47, 112, 250, 0.16)',
            height: '33%',
            paddingVertical: 20,
          }}
        >
          <Card.Content
            style={{ alignItems: 'center', height: '100%', justifyContent: 'space-between' }}
          >
            <DuelImg />
            <Text style={{ fontSize: 12, color: theme.colors.onSurface }}>
              Call someone out in this head to head battle.
            </Text>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

export default selectChallengeType;
