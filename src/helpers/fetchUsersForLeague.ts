import { League } from 'hustle-types';

export type UserData = {
  userId: string;
  firstName: string;
  isBot: boolean;
};

export const fetchUsersForLeague = async (
  league: League,
): Promise<UserData[]> => {
  // Get all user IDs from the league
  const userIds = league.leaguesToUsers
    .filter((entry) => !entry.isBot)
    .map((entry) => entry.userId);

  if (userIds.length === 0) return [];

  try {
    // Call the API endpoint to fetch real user data
    const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${apiUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userIds }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.users.map((user: any) => ({
      userId: user.userId,
      firstName: user.firstName,
      isBot: false,
    }));
  } catch (error) {
    console.error('Failed to fetch users for league:', error);
    // Fallback to placeholder data if API fails
    return userIds.map((userId) => ({
      userId,
      firstName: `User ${userId.slice(-4)}`,
      isBot: false,
    }));
  }
};
