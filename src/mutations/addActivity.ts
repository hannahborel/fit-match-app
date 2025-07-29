import { ActivityType } from 'hustle-types';
import { API_URL } from '@/lib/setApiUrl';
export type LogActivityInput = {
  leagueId: string;
  matchId: string;
  activityType: ActivityType;
  duration: number;
  sets: number;
  reps: number;
  photoUrl: string;
  userId?: string;
  activityNote?: string;
};

export const addActivity = async (
  activity: LogActivityInput,
  token: string | null,
) => {
  const res = await fetch(`${API_URL}/log-activity`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(activity),
  });

  let responseData: any = {};

  try {
    responseData = await res.json();
  } catch (e) {
    responseData = { message: 'Invalid JSON response from server' };
  }

  if (!res.ok) {
    // Check for known message fields
    const message =
      responseData?.message ||
      responseData?.error?.message ||
      'An unknown error occurred while logging the activity.';

    throw new Error(message);
  }

  return responseData;
};
