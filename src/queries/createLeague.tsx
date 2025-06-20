import { apiUrl } from '@/constants/auth';
import { CreateLeagueInput } from '@/types/types';
import { useAuth } from '@clerk/clerk-expo';

export const createLeague = async (data: CreateLeagueInput) => {
  console.log('createLeague query fn hit');
  const getToken = useAuth();
  const token = getToken;
  const res = await fetch(`${apiUrl}/create-league`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();

  if (!res.ok) {
    throw new Error('Failed to create league');
  }

  return response;
};
