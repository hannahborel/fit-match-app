import { API_URL } from '@/lib/setApiUrl';
import { CreateLeagueInput } from 'hustle-types';

export const createLeague = async (
  data: CreateLeagueInput,
  token: string | null,
) => {
  // Check if API_URL is configured
  if (!API_URL) {
    console.error('API_URL is not configured');
    throw new Error('API URL is not configured');
  }

  // Check if token is available
  if (!token) {
    console.error('No authentication token available');
    throw new Error('Authentication token is missing');
  }

  console.log('Creating league with data:', data);
  console.log('API URL:', `${API_URL}/create-league`);
  console.log('Token available:', !!token);

  const res = await fetch(`${API_URL}/create-league`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const response = await res.json();

  console.log('API Response status:', res.status);
  console.log('API Response:', response);

  if (!res.ok) {
    const errorMessage =
      response?.error || response?.message || 'Failed to create league';
    console.error('Create league failed:', errorMessage);
    throw new Error(errorMessage);
  }

  return response;
};
