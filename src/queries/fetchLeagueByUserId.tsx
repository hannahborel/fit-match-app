import { apiUrl } from '@/constants/auth';
import { League } from 'hustle-types';

export const fetchLeagueByUserId = async (
  token: string | null,
): Promise<League> => {
  const res = await fetch(`${apiUrl}/api/league-by-user-id`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) {
    console.error('Server returned error status', res.status, data);
    throw new Error(data.message || 'Fetch League Failed');
  }

  // Optional: sanity check for expected shape
  if (!data.league) {
    console.warn(
      '[fetchLeagueByUserId] Response did not include league:',
      data,
    );
    throw new Error('No league found');
  }
  return data;
};
