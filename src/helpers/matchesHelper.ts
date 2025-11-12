import { TCurrentMatchIdAtom } from '@/atoms/matchesAtom';
import { ActivityType, League, LoggedActivity, Match } from 'hustle-types';
import { getCurrentWeek } from './getCurrentWeekHelper';
import { ActivityDefinitions } from 'hustle-types';

export type Player = {
  name?: string;
  userId: string;
  id: string;
  isPlaceholder?: boolean;
};

export type Team = {
  teamIndex: number;
  players: Player[];
  totalPoints: number;
};

export type Matchup = Team[];

export type WeeklyMatchups = {
  week: number;
  matchups: Matchup[];
};

export type LeagueSchedule = {
  leagueId: string;
  leagueSchedule: WeeklyMatchups[];
};
export const getCurrentWeekMatchIds = (
  leagueData: League,
): TCurrentMatchIdAtom => {
  const currentWeek = getCurrentWeek(leagueData.startDate);

  const match = leagueData.matches.find((match) => match.week === currentWeek);

  if (match) {
    return { week: currentWeek, id: match.id };
  } else {
    return null;
  }
};

export function calculatePointsForUser(
  userId: string,
  loggedActivities: LoggedActivity[],
): number {
  return loggedActivities
    .filter((activity) => activity.userId === userId)
    .reduce((total, activity) => {
      const cardio = activity.cardioPoints ?? 0;
      const strength = activity.strengthPoints ?? 0;
      return total + cardio + strength;
    }, 0);
}

export function transformLeagueToSchedule(data: League): LeagueSchedule {
  const userMap = new Map<string, Player>(
    (data.leaguesToUsers || [])
      .filter((user: any) => user.userId && user.id) // Ensures required fields are present
      .map((user: any) => [
        user.userId,
        {
          userId: user.userId,
          id: user.id,
          name: user.userId.startsWith('bot') ? 'Bot' : undefined,
        },
      ]),
  );
  const weeksMap = new Map<number, Map<string, Map<number, Player[]>>>();

  data.matches.forEach((match: any) => {
    const week = match.week;
    const matchId = match.id;

    // Get or create the week's matches map
    if (!weeksMap.has(week)) {
      weeksMap.set(week, new Map());
    }
    const weekMatches = weeksMap.get(week)!;

    // Get or create the match's teams map
    if (!weekMatches.has(matchId)) {
      weekMatches.set(matchId, new Map());
    }
    const teamsMap = weekMatches.get(matchId)!;

    // Group players by team index within this match
    match.matchesToUsers.forEach((entry: any) => {
      const team = teamsMap.get(entry.teamIndex) || [];
      const player = userMap.get(entry.userId);
      if (player) {
        team.push(player);
      }
      teamsMap.set(entry.teamIndex, team);
    });
  });

  // Transform the nested maps into the final structure
  const leagueSchedule: WeeklyMatchups[] = Array.from(weeksMap.entries())
    .map(([week, matchesMap]) => {
      const matchups: Matchup[] = Array.from(matchesMap.values()).map((teamsMap) => {
        return Array.from(teamsMap.entries())
          .sort(([teamIndexA], [teamIndexB]) => teamIndexA - teamIndexB)
          .map(([teamIndex, players]) => {
            const totalPoints = players.reduce(
              (sum, player) =>
                sum + calculatePointsForUser(player.userId, data.loggedActivities),
              0,
            );

            return {
              teamIndex,
              players,
              totalPoints,
            };
          });
      });

      return { week, matchups };
    })
    .sort((a, b) => a.week - b.week);

  return {
    leagueId: data.id,
    leagueSchedule,
  };
}
