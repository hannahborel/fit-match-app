// src/helpers/schedulePreview.ts
import { League } from 'hustle-types';
import {
  LeagueSchedule,
  WeeklyMatchups,
  Matchup,
  Player,
} from '@/helpers/matchesHelper';

export function generateSchedulePreview(league: League): LeagueSchedule {
  const { size, weeks, leaguesToUsers } = league;

  // Create placeholder players for empty slots
  const allPlayers: Player[] = [];

  // Add actual members
  (leaguesToUsers || []).forEach((user, index) => {
    allPlayers.push({
      userId: user.userId,
      id: user.id,
      name: 'Player',
      isPlaceholder: false,
    });
  });

  // Add placeholders for remaining slots
  const placeholdersNeeded = size - allPlayers.length;
  for (let i = 1; i <= placeholdersNeeded; i++) {
    allPlayers.push({
      userId: `placeholder-${allPlayers.length + 1}`,
      id: `placeholder-id-${allPlayers.length + 1}`,
      name: 'Player',
      isPlaceholder: true,
    });
  }

  // Generate matchups using round-robin algorithm
  const leagueSchedule: WeeklyMatchups[] = [];

  // For a league, we want half the players on each team in a single matchup
  // For example: 4 players = 2 vs 2 (1 matchup), 8 players = 4 vs 4 (1 matchup)
  const playersPerTeam = Math.floor(size / 2);
  const numMatchups = 1; // One matchup per week with all players

  for (let week = 0; week < weeks; week++) {
    const matchups: Matchup[] = [];
    const team1Players: Player[] = [];
    const team2Players: Player[] = [];

    // Assign first half of players to team 1
    for (let i = 0; i < playersPerTeam; i++) {
      const playerIdx = (i + week) % allPlayers.length;
      team1Players.push(allPlayers[playerIdx]);
    }

    // Assign second half of players to team 2
    for (let i = 0; i < playersPerTeam; i++) {
      const playerIdx = (playersPerTeam + i + week) % allPlayers.length;
      team2Players.push(allPlayers[playerIdx]);
    }

    matchups.push([
      {
        teamIndex: 0,
        players: team1Players,
        totalPoints: 0,
      },
      {
        teamIndex: 1,
        players: team2Players,
        totalPoints: 0,
      },
    ]);

    leagueSchedule.push({
      week,
      matchups,
    });
  }

  return {
    leagueId: league.id,
    leagueSchedule,
  };
}
