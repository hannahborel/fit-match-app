import { TCurrentMatchIdAtom } from '@/atoms/matchesAtom';
import { League, LoggedActivity, Match } from 'hustle-types';
import { getCurrentWeek } from './getCurrentWeekHelper';

export const getCurrentWeekMatchIds = (
  leagueData: League,
): TCurrentMatchIdAtom => {
  const currentWeek = getCurrentWeek(leagueData.startDate);

  const match = leagueData.matches.find((match) => match.week === currentWeek);

  console.log(match);
  if (match) {
    return { week: currentWeek, id: match.id };
  } else {
    return null;
  }
};

// export const mapAllWeeksToMatchIds = (matches: Match[]):
//
// TAllMatchesIdAtom => {
//   return matches.reduce<TAllMatchesIdAtom>((acc, match) => {
//     acc[match.week] = match.id;

//     return acc;
//   }, {});
// };
export type Player = {
  name?: string;
  userId: string;
  id: string;
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

export function transformLeagueToSchedule(data: any): LeagueSchedule {
  const userMap = new Map<string, Player>(
    data.leaguesToUsers
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
  const weeksMap = new Map<number, Matchup[]>();

  data.matches.forEach((match: any) => {
    const teamsMap = new Map<number, Player[]>();

    match.matchesToUsers.forEach((entry: any) => {
      const team = teamsMap.get(entry.teamIndex) || [];
      const player = userMap.get(entry.userId);
      if (player) {
        team.push(player);
      }
      teamsMap.set(entry.teamIndex, team);
    });

    const matchup: Matchup = Array.from(teamsMap.entries()).map(
      ([teamIndex, players]) => ({
        teamIndex,
        players,
        totalPoints: 0, // You can compute this using loggedActivities
      }),
    );

    const weekMatchups = weeksMap.get(match.week) || [];
    weekMatchups.push(matchup);
    weeksMap.set(match.week, weekMatchups);
  });

  const leagueSchedule: WeeklyMatchups[] = Array.from(weeksMap.entries())
    .map(([week, matchups]) => ({ week, matchups }))
    .sort((a, b) => a.week - b.week);

  return {
    leagueId: data.id,
    leagueSchedule,
  };
}
