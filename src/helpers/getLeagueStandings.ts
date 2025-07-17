import { League } from 'hustle-types';
type StandingEntry = {
  userId: string;
  totalPoints: number;
  isBot: boolean;
};
export function getLeagueStandings(league: League): StandingEntry[] {
  // Create a map to hold user points
  const userPoints: Record<string, number> = {};

  // Sum all points from logged activities
  for (const activity of league.loggedActivities) {
    const { userId, cardioPoints, strengthPoints } = activity;
    const total = (cardioPoints || 0) + (strengthPoints || 0);

    if (!userPoints[userId]) {
      userPoints[userId] = 0;
    }
    userPoints[userId] += total;
  }

  // Build standings list from leaguesToUsers
  const standings = league.leaguesToUsers.map((entry: any) => {
    return {
      userId: entry.userId,
      isBot: entry.isBot,
      totalPoints: userPoints[entry.userId] || 0,
    };
  });

  // Sort descending by totalPoints
  standings.sort((a, b) => b.totalPoints - a.totalPoints);

  return standings;
}
