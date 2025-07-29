import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';

import MatchWeek from './MatchWeek';
import { WeeklyMatchups } from '@/helpers/matchesHelper';

type ScheduleFlatListProps = {
  weeks: WeeklyMatchups[];
  page: number;
};
const ScheduleFlatList = ({ weeks, page }: ScheduleFlatListProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: page, animated: true });
  }, [[page]]);
  const ITEM_WIDTH = Dimensions.get('window').width;
  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={weeks}
      pagingEnabled
      keyExtractor={(item) => item.week.toString()}
      renderItem={({ item }) => <MatchWeek week={item} />}
      contentContainerStyle={{ paddingBottom: 32 }}
      getItemLayout={(data, index) => ({
        length: ITEM_WIDTH, // <- replace with actual width of each item
        offset: ITEM_WIDTH * index,
        index,
      })}
    />
  );
};

export default ScheduleFlatList;
