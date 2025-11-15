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
    // Handle error object properly - check if it's an empty object
    let errorMessage = 'Failed to create league';

    if (typeof response?.error === 'string' && response.error) {
      errorMessage = response.error;
    } else if (typeof response?.message === 'string' && response.message) {
      errorMessage = response.message;
    } else if (response?.error && typeof response.error === 'object') {
      errorMessage = response.error.message || `Server error (${res.status})`;
    } else {
      errorMessage = `Server error (${res.status})`;
    }

    console.error('Create league failed:', errorMessage);
    throw new Error(errorMessage);
  }

  return response;
};
