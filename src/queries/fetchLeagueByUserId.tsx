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

      // Provide more specific error messages based on status codes
      if (res.status === 401) {
        throw new Error('Authentication failed. Please sign in again.');
      } else if (res.status === 403) {
        throw new Error(
          "Access denied. You don't have permission to view this league.",
        );
      } else if (res.status === 404) {
        throw new Error(
          'League not found. You may not be part of any league yet.',
        );
      } else if (res.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error(data.message || 'Failed to fetch league data');
      }
    }

    return data?.league ?? null;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error(
          'Request timed out. Please check your internet connection and try again.',
        );
      } else if (error.message.includes('Failed to fetch')) {
        throw new Error(
          'Network error. Please check your internet connection and try again.',
        );
      }
      throw error;
    }

    throw new Error('An unexpected error occurred while fetching league data');
  }
};
