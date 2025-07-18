import { leagueAtom } from '@/atoms/leagueAtom';
import { differenceInWeeks } from 'date-fns';
import { League } from 'hustle-types';
import { useAtomValue } from 'jotai';

export const getCurrentWeek = (startDate: Date) => {
  const leagueData = useAtomValue(leagueAtom);

  if (leagueData) {
    const earlierDate = new Date(leagueData.startDate);
    const laterDate = new Date();
    const diff = differenceInWeeks(laterDate, earlierDate);
    console.log('earlierDate: ', earlierDate, 'later date:', laterDate);
    console.log('diff: ', diff);
    return diff;
  }
};
