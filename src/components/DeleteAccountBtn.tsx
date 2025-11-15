import { useAuthCache } from '@/hooks/useAuthCashe';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import { deleteAccount } from '@/queries/deleteAccount';

type DeleteAccountButtonProps = {
  setActionInProgress: (isInProgress: boolean) => void;
};
const DeleteAccountButton = ({
  setActionInProgress,
}: DeleteAccountButtonProps) => {
  const { signOut, getToken } = useAuth();
  const router = useRouter();
  const { clearCache } = useAuthCache();
  const theme = useTheme();

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Delete Account',
      'Deleting your account will remove all account information. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setActionInProgress(true);
              const token = await getToken();

              if (!token) {
                setActionInProgress(false);
                return;
              }

              // Delete account from database and Clerk
              await deleteAccount({ token });

              // Clear all cached data BEFORE signing out
              await clearCache();

              // Sign out from Clerk
              await signOut();

              // Reset navigation state and redirect to login
              // Use a small delay to ensure signOut completes
              setTimeout(() => {
                router.replace('/(auth)/login-email');
              }, 100);
            } catch (err: any) {
              setActionInProgress(false);
              Alert.alert('Error', err.message || 'Something went wrong');
            }
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      testID="delete-account-button"
      onPress={handleDeleteAccount}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontWeight: 500, color: theme.colors.error }}>
        Delete Account
      </Text>
    </TouchableOpacity>
  );
};

export default DeleteAccountButton;
