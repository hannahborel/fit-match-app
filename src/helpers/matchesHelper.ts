import { TAllMatchesIdAtom, TCurrentMatchIdAtom } from '@/atoms/matchesAtom';
import { League, Match } from 'hustle-types';
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
