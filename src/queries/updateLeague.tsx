import { API_URL } from '@/lib/setApiUrl';

type UpdateLeagueProps = {
  token: string;
  updates: Record<string, any>; // generic fields to update
};

export const updateLeague = async ({ token, updates }: UpdateLeagueProps) => {
  const res = await fetch(`${API_URL}/update-league`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Update failed');
  }

  return data;
};
