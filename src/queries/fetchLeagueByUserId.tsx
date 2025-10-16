// src/queries/fetchLeagueByUserId.tsx
import { API_URL } from '@/lib/setApiUrl';
import { League } from 'hustle-types';

export const fetchLeagueByUserId = async (
  token: string | null,
): Promise<League | null> => {
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

    // ✅ FIX: Return the league property, not the whole response
    // API returns { league: {...} } or null
    return data?.league || null;
  } catch (error) {
    clearTimeout(timeoutId);

    throw new Error(
      error instanceof Error ? error.message : 'An unexpected error occurred',
    );
  }
};
