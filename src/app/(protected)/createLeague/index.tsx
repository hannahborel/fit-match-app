import DevModeDial from '@/components/demo/devModeOptions';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const createOrJoinLeague = () => {
  const theme = useTheme();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const firstName = user?.firstName || 'there';

  useEffect(() => {
    if (!isSignedIn) {
      router.replace('/login-email');
    }
  }, [isSignedIn]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        <View style={{ width: 300, gap: 16 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              color: theme.colors.onBackground,
            }}
          >
            Hey, {firstName}!
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              marginBottom: 20,
              color: theme.colors.onSurfaceVariant,
            }}
          >
            You&#39;re all set all set! Now you can join an existing league or
            create your own.
          </Text>
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

        <DevModeDial />
      </View>
    </SafeAreaView>
  );
};

export default createOrJoinLeague;
