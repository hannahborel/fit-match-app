import { differenceInWeeks } from 'date-fns';
import { League } from 'hustle-types';

export const getCurrentWeek = (startDate: string): number => {
  const earlierDate = new Date(startDate);
  const laterDate = new Date();
  const diff = differenceInWeeks(laterDate, earlierDate);
  console.log('earlierDate: ', earlierDate, 'later date:', laterDate);
  console.log('diff: ', diff);
  return diff;
};

export const getMatchIdByWeek = (leagueData: League) => {
  const week = getCurrentWeek(leagueData.startDate);
  const match = leagueData.matches.find((match) => match.week === week);

  if (match) {
    return match.id;
  } else {
    console.log('match not found');
  }
};
