import { View, Text } from 'react-native';
import React from 'react';
import BgView from '@/components/elements/BgView';
import { differenceInWeeks } from 'date-fns';

const SchedulePage = () => {
  const weeks = differenceInWeeks(new Date(2025, 6, 17), new Date(2025, 6, 10));
  console.log('Weeks', weeks);
  return (
    <BgView>
      <Text>schedule</Text>
    </BgView>
  );
};

export default SchedulePage;
