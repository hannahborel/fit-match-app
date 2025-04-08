import ButtonPrimary from '@/components/library/ButtonPrimary';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useTheme } from 'react-native-paper';

const leagueEntry = () => {
  const theme = useTheme();
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const firstName = user?.firstName || 'there';

  useEffect(() => {
    if (!isSignedIn) {
      router.replace('/login-email');
    }
  }, [isSignedIn]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#666' }}>
          You're all set! Now you can join an existing league or create your own.
        </Text>
        <ButtonPrimary>Join an Exiting League</ButtonPrimary>
        <ButtonPrimary>Create a New League</ButtonPrimary>
        <Button mode="contained" onPress={handleLogout}>
          Log Out
        </Button>
      </View>
    </View>
  );
};

export default leagueEntry;
