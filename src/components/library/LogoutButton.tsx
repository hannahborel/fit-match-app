import { Text } from 'react-native';
import React from 'react';
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
      // 1. Clear all cached data FIRST
      await clearCache();

      // 2. Sign out from Clerk
      // Wrap in try-catch to handle potential "origin" error
      try {
        if (signOut) {
          await signOut();
        }
      } catch (signOutError) {
        console.log('Clerk signOut error (non-critical):', signOutError);
        // Continue with logout even if Clerk fails
      }

      // 3. Navigate directly to login page (bypass index.tsx)
      router.replace('/(auth)/login-email');
    } catch (error) {
      console.error('Error logging out:', error);
      // Even if everything fails, try to navigate to login
      router.replace('/(auth)/login-email');
    }
  };
  return (
    <Button mode="outlined" style={{ borderRadius: 8 }} onPress={handleLogout}>
      <Text>Log Out</Text>
    </Button>
  );
};

export default LogoutButton;
