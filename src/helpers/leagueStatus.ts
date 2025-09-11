import { League } from 'hustle-types';

/**
 * Determines if a league is full based on the number of members vs league size
 */
export const isLeagueFull = (league: League): boolean => {
  const memberCount = league.leaguesToUsers?.length || 1; // Default to 1 (owner)
  return memberCount >= league.size;
};

/**
 * Determines if a league has started based on the start date
 */
export const hasLeagueStarted = (league: League): boolean => {
  const now = new Date();
  const startDate = new Date(league.startDate);
  return now >= startDate;
};

/**
 * Gets the number of members still needed to join the league
 */
export const getMembersNeeded = (league: League): number => {
  const memberCount = league.leaguesToUsers?.length || 1; // Default to 1 (owner)
  return Math.max(0, league.size - memberCount);
};

/**
 * Determines if the schedule should be visible
 * Schedule is visible when league is full OR league has started
 */
export const shouldShowSchedule = (league: League): boolean => {
  return isLeagueFull(league) || hasLeagueStarted(league);
};
