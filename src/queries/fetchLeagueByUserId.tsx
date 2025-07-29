import { API_URL } from '@/lib/setApiUrl';
import { League } from 'hustle-types';

export const fetchLeagueByUserId = async (
  token: string | null,
): Promise<League> => {
  const res = await fetch(`${API_URL}/league-by-user-id`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('Server returned error status', res.status, data);
    throw new Error(data.message || 'Fetch League Failed');
  }

  return data?.league ?? null;
};
