import { apiUrl } from '@/constants/auth';

export const fetchLeagueByUserId = async (token: string | null) => {
  const res = await fetch(`${apiUrl}/api/league-by-user-id`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data;
};
