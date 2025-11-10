import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { useUserSync } from '@/hooks/useUserSync';
import { useQueryClient } from '@tanstack/react-query';

interface SyncUserButtonProps {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
  buttonText?: string;
  mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
}

export const SyncUserButton: React.FC<SyncUserButtonProps> = ({
  onSuccess,
  onError,
  buttonText = 'Sync User Data from Clerk',
  mode = 'contained',
}) => {
  const { syncUser } = useUserSync();
  const queryClient = useQueryClient();
  const [syncing, setSyncing] = useState(false);

  const handleSyncUser = async () => {
    setSyncing(true);
    try {
      await syncUser();
      Alert.alert('Success', 'User data synced successfully!');
      // Refetch league data to get updated names
      await queryClient.invalidateQueries({ queryKey: ['league'] });
      onSuccess?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to sync user data');
      console.error('Sync error:', error);
      onError?.(error);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <Button
      mode={mode}
      onPress={handleSyncUser}
      loading={syncing}
      disabled={syncing}
    >
      {buttonText}
    </Button>
  );
};
