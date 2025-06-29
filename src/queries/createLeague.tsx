import { apiUrl } from '@/constants/auth';
import { CreateLeagueInput } from '@/types/types';

export const createLeague = async (
  data: CreateLeagueInput,
  token: string | null,
) => {
  const res = await fetch(`${apiUrl}/api/create-league`, {
    method: 'POST',

    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();

  if (!res.ok) {
    throw new Error('Failed to create league');
  }

  return response;
};
