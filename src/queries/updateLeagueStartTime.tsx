import { apiUrl } from '@/constants/auth';
import { useMutation } from '@tanstack/react-query';

type updateLeagueStartTimeProps = {
  leagueId: string;
  newStartDate: Date;
  token: string;
};
export const updateLeagueStartTime = async ({
  leagueId,
  newStartDate,
  token,
}: updateLeagueStartTimeProps) => {
  const res = await fetch(`${apiUrl}/api/update-league`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: leagueId,
      startDate: newStartDate,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const errorData = data;
    console.log(errorData);
    throw new Error(errorData.message || 'Update failed');
  }
  return data;
};
