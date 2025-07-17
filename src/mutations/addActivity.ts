import { ActivityType } from 'hustle-types';
import { apiUrl } from '@/constants/auth';
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
  const res = await fetch(`${apiUrl}/api/log-activity`, {
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
    const errorId = Math.random().toString(36).substring(2, 15);
    const logMessage = `[${errorId}] Error logging activity: ${res.status} - ${res.statusText}`;
    console.error(logMessage, { request: activity, response: responseData });

    // Zod issue formatting (if present)
    const zodIssues = responseData?.error?.issues;
    if (Array.isArray(zodIssues)) {
      const messages = zodIssues.map((issue: any) => {
        const path = issue.path?.join('.') || 'field';
        return `${path}: ${issue.message}`;
      });
      throw new Error(messages.join('\n'));
    }

    // Check for known message fields
    const message =
      responseData?.message ||
      responseData?.error?.message ||
      'An unknown error occurred while logging the activity.';

    throw new Error(message);
  }

  return responseData;
};
