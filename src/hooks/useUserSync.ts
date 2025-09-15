import { useCallback } from 'react';
import { useAuth } from '@clerk/clerk-expo';

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://your-api-domain.com';

export function useUserSync() {
  const { getToken } = useAuth();

  const syncUser = useCallback(async () => {
    try {
      const token = await getToken();

      const response = await fetch(`${API_BASE_URL}/api/sync-user`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to sync user');
      }

      const data = await response.json();
      console.log('User synced:', data);
      return data;
    } catch (error) {
      console.error('Error syncing user:', error);
      throw error;
    }
  }, [getToken]);

  return { syncUser };
}
