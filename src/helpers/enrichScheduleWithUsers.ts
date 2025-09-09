import {
  LeagueSchedule,
  WeeklyMatchups,
  Matchup,
  Team,
  Player,
} from '@/helpers/matchesHelper';
import { fetchUsersForLeague, UserData } from '@/helpers/fetchUsersForLeague';

export const enrichScheduleWithUsers = async (
  schedule: LeagueSchedule,
  league: any,
): Promise<LeagueSchedule> => {
  // Get all unique user IDs from the schedule
  const userIds = new Set<string>();

  schedule.leagueSchedule.forEach((week: WeeklyMatchups) => {
    week.matchups.forEach((matchup: Matchup) => {
      matchup.forEach((team: Team) => {
        team.players.forEach((player: Player) => {
          if (!player.userId.startsWith('bot')) {
            userIds.add(player.userId);
          }
        });
      });
    });
  });

  // Fetch user data
  const users = await fetchUsersForLeague(league);
  const userMap = new Map(users.map((u) => [u.userId, u]));

  // Enrich the schedule with user names
  const enrichedSchedule: LeagueSchedule = {
    ...schedule,
    leagueSchedule: schedule.leagueSchedule.map((week: WeeklyMatchups) => ({
      ...week,
      matchups: week.matchups.map((matchup: Matchup) =>
        matchup.map((team: Team) => ({
          ...team,
          players: team.players.map((player: Player) => ({
            ...player,
            name: player.userId.startsWith('bot')
              ? 'Bot'
              : userMap.get(player.userId)?.firstName ||
                `User ${player.userId.slice(-4)}`,
          })),
        })),
      ),
    })),
  };

  return enrichedSchedule;
};
