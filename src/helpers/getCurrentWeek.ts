import { differenceInWeeks } from 'date-fns';

export const getCurrentWeek = () => {
  const earlierDate = new Date('2025-06-01');
  const laterDate = new Date();
  console.log('earlierDate: ', earlierDate, 'later date:', laterDate);
  const diff = differenceInWeeks(earlierDate, laterDate);
  console.log(diff);
};
