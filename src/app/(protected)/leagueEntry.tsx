import ButtonPrimary from '@/components/library/ButtonPrimary';
import InputPrimary from '@/components/library/InputPrimary';
import { router } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
const leagueEntry = () => {
  const { signOut } = useAuth();
  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 300, gap: 16 }}>
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
