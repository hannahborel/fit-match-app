import { differenceInWeeks } from 'date-fns';

export const getCurrentWeek = (startDate: string): number => {
  const earlierDate = new Date(startDate);
  const laterDate = new Date();
  const diff = differenceInWeeks(laterDate, earlierDate);
  return diff;
};
