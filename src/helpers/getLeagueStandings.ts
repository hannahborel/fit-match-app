import { League } from 'hustle-types';

export type StandingEntry = {
  userId: string;
  firstName: string;
  totalPoints: number;
  cardioPoints: number;
  strengthPoints: number;
  isBot: boolean;
  isPlaceholder?: boolean;
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
      isPlaceholder: false,
      cardioPoints: cardio,
      strengthPoints: strength,
      totalPoints: cardio + strength,
    };
  });

  // Add virtual placeholders for remaining slots
  const currentCount = league.leaguesToUsers?.length || 0;
  const placeholdersNeeded = league.size - currentCount;

  for (let i = 1; i <= placeholdersNeeded; i++) {
    standings.push({
      userId: `placeholder-${currentCount + i}`,
      firstName: `Player ${currentCount + i}`,
      isBot: false,
      isPlaceholder: true,
      cardioPoints: 0,
      strengthPoints: 0,
      totalPoints: 0,
    });
  }

  // Sort descending by totalPoints (placeholders will naturally be at bottom with 0 points)
  standings.sort((a, b) => b.totalPoints - a.totalPoints);

  return standings;
}
