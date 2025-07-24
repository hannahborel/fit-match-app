import { League } from 'hustle-types';
type StandingEntry = {
  userId: string;
  totalPoints: number;
  cardioPoints: number;
  strengthPoints: number;
  isBot: boolean;
};
export function getLeagueStandings(league: League): StandingEntry[] {
  // Create a map to hold user points
  const userCardioPoints: Record<string, number> = {};
  const userStrengthPoints: Record<string, number> = {};

  // Sum all points from logged activities
  for (const activity of league.loggedActivities) {
    const { userId, cardioPoints, strengthPoints } = activity;

    // const total = (cardioPoints || 0) + (strengthPoints || 0);

    if (!userCardioPoints[userId]) {
      userCardioPoints[userId] = 0;
    } else if (!userStrengthPoints[userId]) {
      userStrengthPoints[userId] = 0;
    }

    userCardioPoints[userId] += cardioPoints;
    userStrengthPoints[userId] += strengthPoints;
    // userPoints[userId] += total;
  }

  // Build standings list from leaguesToUsers
  const standings = league.leaguesToUsers.map((entry: any) => {
    return {
      userId: entry.userId,
      isBot: entry.isBot,
      cardioPoints: userCardioPoints[entry.userId] | 0,
      strengthPoints: userStrengthPoints[entry.userId] | 0,
      totalPoints:
        (userCardioPoints[entry.userId] + userStrengthPoints[entry.userId]) | 0,
    };
  });

  // Sort descending by totalPoints
  standings.sort((a, b) => b.totalPoints - a.totalPoints);

  return standings;
}
