import DevModeDial from '@/components/demo/devModeOptions';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { leagueAtom } from '@/atoms/leagueAtom';
import { useAtomValue } from 'jotai';

const createOrJoinLeague = () => {
  const theme = useTheme();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const league = useAtomValue(leagueAtom);
  const firstName = user?.firstName || 'there';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ width: 350, gap: 20 }}>
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'left',
                color: theme.colors.onBackground,
              }}
            >
              Welcome to Hustle {firstName}!
            </Text>
          </View>
          <View style={{ gap: 10 }}>
            <Button
              mode="contained"
              textColor={theme.colors.onSurface}
              style={{
                backgroundColor: theme.colors.surface,
                height: 65,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Join an Exiting Challenge</Text>
            </Button>
            <Button
              onPress={() => router.push('createLeague/selectChallengeType')}
              mode="contained"
              textColor={theme.colors.onSurface}
              style={{
                backgroundColor: theme.colors.surface,
                height: 65,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text>Create a New Challenge</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default createOrJoinLeague;
