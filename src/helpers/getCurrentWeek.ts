import { TAllMatchesIdAtom, TCurrentMatchIdAtom } from '@/atoms/matchesAtom';
import { differenceInWeeks } from 'date-fns';
import { League, Match } from 'hustle-types';

export const getCurrentWeek = (startDate: string): number => {
  const earlierDate = new Date(startDate);
  const laterDate = new Date();
  const diff = differenceInWeeks(laterDate, earlierDate);
  return diff;
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

export const mapAllWeeksToMatchIds = (matches: Match[]): TAllMatchesIdAtom => {
  return matches.reduce<TAllMatchesIdAtom>((acc, match) => {
    acc[match.week] = match.id;

    return acc;
  }, {});
};
