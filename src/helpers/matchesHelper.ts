import { TAllMatchesIdAtom, TCurrentMatchIdAtom } from '@/atoms/matchesAtom';
import { League, LoggedActivity, Match } from 'hustle-types';
import { getCurrentWeek } from './getCurrentWeekHelper';

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

export const mapAllWeeksToMatchIds = (matches: Match[]): TAllMatchesIdAtom => {
  return matches.reduce<TAllMatchesIdAtom>((acc, match) => {
    acc[match.week] = match.id;

    return acc;
  }, {});
};

type TeamScore = {
  users: string[];
  totalPoints: number;
};
type MatchWithPoints = {
  matchId: string;
  week: number;
  teamA: TeamScore;
  teamB: TeamScore;
};

type WeeklySchedule = {
  week: number;
  matches: MatchWithPoints[];
};
export function mapMatchesWithTeamPoints(
  matches: Match[],
  loggedActivities: LoggedActivity[],
): WeeklySchedule[] {
  const weekMap = new Map<number, MatchWithPoints[]>();

  for (const match of matches) {
    const teamA: string[] = [];
    const teamB: string[] = [];

    for (const mt of match.matchesToUsers) {
      if (mt.teamIndex === 0) teamA.push(mt.userId);
      else teamB.push(mt.userId);
    }

    const calcPoints = (users: string[]) =>
      users.reduce((sum, uid) => {
        const userMatchPoints = loggedActivities
          .filter((act) => act.userId === uid && act.matchId === match.id)
          .reduce(
            (acc, act) =>
              acc + (act.cardioPoints || 0) + (act.strengthPoints || 0),
            0,
          );
        return sum + userMatchPoints;
      }, 0);

    const matchObj: MatchWithPoints = {
      matchId: match.id,
      week: match.week + 1,
      teamA: {
        users: teamA,
        totalPoints: calcPoints(teamA),
      },
      teamB: {
        users: teamB,
        totalPoints: calcPoints(teamB),
      },
    };

    if (!weekMap.has(match.week)) {
      weekMap.set(match.week, []);
    }
    weekMap.get(match.week)!.push(matchObj);
  }

  const result: WeeklySchedule[] = [];

  for (const [week, matches] of weekMap.entries()) {
    result.push({
      week: week + 1,
      matches,
    });
  }

  return result.sort((a, b) => a.week - b.week);
}
