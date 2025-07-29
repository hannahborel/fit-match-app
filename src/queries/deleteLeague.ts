import { API_URL } from '@/lib/setApiUrl';

type DeleteLeagueArgs = {
  token: string;
  leagueId: string;
};

export const deleteLeague = async ({ token, leagueId }: DeleteLeagueArgs) => {
  const res = await fetch(`${API_URL}/delete-league`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ leagueId }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to delete league');
  }

  return data;
};
