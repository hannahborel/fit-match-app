import { View, Text } from 'react-native';
import React from 'react';
import ButtonPrimary from '../elements/ButtonPrimary';
import { useAuth } from '@clerk/clerk-expo';
import { Button } from 'react-native-paper';
import { useAuthCache } from '@/hooks/useAuthCashe';
import { useRouter } from 'expo-router';

const LogoutButton = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const { clearCache } = useAuthCache();
  const handleLogout = async () => {
    try {
      // 1. Clear all cached data
      await clearCache();

      // 2. Sign out from Clerk
      await signOut();

      // 3. Navigate to login (index.tsx will handle the rest)
      router.replace('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <Button mode="outlined" style={{ borderRadius: 8 }} onPress={handleLogout}>
      <Text>Log Out</Text>
    </Button>
  );
};

export default LogoutButton;
