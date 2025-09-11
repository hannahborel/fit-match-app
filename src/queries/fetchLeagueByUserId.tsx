import { API_URL } from '@/lib/setApiUrl';
import { League } from 'hustle-types';

export const fetchLeagueByUserId = async (
  token: string | null,
): Promise<League> => {
  // Check if API_URL is configured
  if (!API_URL) {
    throw new Error(
      'API configuration is missing. Please check your app configuration.',
    );
  }

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const res = await fetch(`${API_URL}/league-by-user-id`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await res.json();

    if (!res.ok) {
      console.error('Server returned error status', res.status, data);
    }

    return data?.league ?? null;
  } catch (error) {
    clearTimeout(timeoutId);

    throw new Error(
      error instanceof Error ? error.message : 'An unexpected error occurred',
    );
  }
};
