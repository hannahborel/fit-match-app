import { useAuth } from '@clerk/clerk-expo';

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://your-api-domain.com';

export interface UserSyncResult {
  message: string;
  action: 'created' | 'updated';
  user: {
    clerkId: string;
    firstName: string | null;
    lastName: string | null;
    email: string | undefined;
    thumbnailUrl: string | null;
  };
}

export async function syncUserWithServer(): Promise<UserSyncResult> {
  try {
    // Get the auth token from Clerk
    const { getToken } = useAuth();
    const token = await getToken();

    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await fetch(`${API_BASE_URL}/api/sync-user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to sync user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error syncing user with server:', error);
    throw error;
  }
}

// Helper function to sync user on app focus/startup
export async function syncUserOnAppStart() {
  try {
    const result = await syncUserWithServer();
    console.log('User synced on app start:', result);
    return result;
  } catch (error) {
    console.error('Failed to sync user on app start:', error);
    // Don't throw here - app should still work even if sync fails
  }
}
