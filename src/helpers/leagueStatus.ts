import { League } from 'hustle-types';

/**
 * Determines if a league is full based on the number of members vs league size
 */
export const isLeagueFull = (league: League): boolean => {
  const memberCount = league.leaguesToUsers?.length || 1; // Default to 1 (owner)
  return memberCount >= league.size;
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
 * Schedule is only visible when league is full (has matches generated)
 */
export const shouldShowSchedule = (league: League): boolean => {
  return isLeagueFull(league);
};
