import { useAuthCache } from '@/hooks/useAuthCashe';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

const LogoutButton = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const { clearCache } = useAuthCache();
  const theme = useTheme();
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
    <TouchableOpacity
      onPress={handleLogout}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontWeight: 500, color: theme.colors.primary }}>
        Sign Out
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
