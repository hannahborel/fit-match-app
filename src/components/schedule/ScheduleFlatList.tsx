// src/components/library/ScheduleFlatList.tsx
import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';

import MatchWeek from './MatchWeek';
import { WeeklyMatchups } from '@/helpers/matchesHelper';

type ScheduleFlatListProps = {
  weeks: WeeklyMatchups[];
  page: number;
  isPreview?: boolean; // Add this prop
};

const ScheduleFlatList = ({
  weeks,
  page,
  isPreview = false,
}: ScheduleFlatListProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({ index: page, animated: true });
  }, [page]);

  const ITEM_WIDTH = Dimensions.get('window').width;

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={weeks}
      pagingEnabled
      keyExtractor={(item) => item.week.toString()}
      renderItem={({ item }) => <MatchWeek week={item} isPreview={isPreview} />}
      contentContainerStyle={{ paddingBottom: 32 }}
      getItemLayout={(data, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
    />
  );
};

export default ScheduleFlatList;
