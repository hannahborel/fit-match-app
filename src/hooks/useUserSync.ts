import { useCallback } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { API_URL } from '@/lib/setApiUrl';

export function useUserSync() {
  const { getToken } = useAuth();

  const syncUser = useCallback(async () => {
    try {
      const token = await getToken();

      const response = await fetch(`${API_URL}/sync-user`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to sync user: ${response.status} - ${responseText.substring(0, 200)}`);
      }

      const data = JSON.parse(responseText);
      console.log('User synced:', data);
      return data;
    } catch (error) {
      console.error('Error syncing user:', error);
      throw error;
    }
  }, [getToken]);

  return { syncUser };
}
