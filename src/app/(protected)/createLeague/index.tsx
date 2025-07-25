import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useTheme } from 'react-native-paper';
import BgView from '@/components/elements/BgView';
import LogoutButton from '@/components/library/LogoutButton';

const startPage = () => {
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
    <BgView>
      <View style={{ padding: 16, gap: 16 }}>
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
            color: '#666',
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
      <LogoutButton />
    </BgView>
  );
};

export default startPage;
