import { League } from 'hustle-types';

export type StandingEntry = {
  userId: string;
  firstName: string;
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
  for (const activity of league.loggedActivities || []) {
    const { userId, cardioPoints, strengthPoints } = activity;

    if (!userCardioPoints[userId]) {
      userCardioPoints[userId] = 0;
    }
    if (!userStrengthPoints[userId]) {
      userStrengthPoints[userId] = 0;
    }

    userCardioPoints[userId] += cardioPoints;
    userStrengthPoints[userId] += strengthPoints;
  }

  // Build standings list from leaguesToUsers using firstName directly
  const standings = (league.leaguesToUsers || []).map((entry) => {
    const cardio = userCardioPoints[entry.userId] || 0;
    const strength = userStrengthPoints[entry.userId] || 0;

    return {
      userId: entry.userId,
      firstName: entry.firstName,
      isBot: entry.isBot,
      cardioPoints: cardio,
      strengthPoints: strength,
      totalPoints: cardio + strength,
    };
  });

  // Sort descending by totalPoints
  standings.sort((a, b) => b.totalPoints - a.totalPoints);

  return standings;
}
