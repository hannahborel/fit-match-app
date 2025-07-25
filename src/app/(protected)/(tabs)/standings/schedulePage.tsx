import {
  currentMatchAtom,
  allMatchupsWithPointsAtom,
} from '@/atoms/matchesAtom';
import ScheduleFlatList from '@/components/library/ScheduleFlatList';

import { useAtomValue } from 'jotai';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

const SchedulePage = () => {
  const matchupScheduleAtom = useAtomValue(allMatchupsWithPointsAtom);
  const currentWeek = useAtomValue(currentMatchAtom);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const totalPages = matchupScheduleAtom?.leagueSchedule.length;

  const isReady = matchupScheduleAtom && currentWeek;

  useEffect(() => {
    if (matchupScheduleAtom && currentWeek) {
      setPageIndex(currentWeek.week);
    }
  }, [matchupScheduleAtom, currentWeek]);

  const handlePageLeft = () => {
    if (pageIndex == 0) {
      return;
    } else {
      setPageIndex((prev) => prev - 1);
    }
  };

  const handlePageRight = () => {
    let currentPage = pageIndex + 1;

    if (currentPage == totalPages) {
      return;
    } else {
      setPageIndex((prev) => prev + 1);
    }
  };

  if (!isReady) {
    return (
      <View>
        <Text>You Fucked Up</Text>
      </View>
    );
  }

  const atPageEnd = pageIndex + 1 == totalPages;
  const atPageBeginning = pageIndex == 0;

  const theme = useTheme();
  // console.log(JSON.stringify(matchupsArr, null, 2));

  return (
    <View style={{ gap: 16, flex: 1, alignItems: 'center' }}>
      <>
        <View style={styles.switchContainer}>
          <IconButton
            onPress={handlePageLeft}
            disabled={atPageBeginning}
            size={18}
            icon={() => (
              <ChevronLeft
                color={
                  !atPageBeginning ? theme.colors.onSurface : 'transparent'
                }
              />
            )}
          />
          <View style={styles.titleTextContainer}>
            <Text>{'WEEK '}</Text>
            <View
              style={{
                width: 10,
                alignItems: 'center',
              }}
            >
              <Text>{Number(pageIndex + 1)}</Text>
            </View>
          </View>

          <IconButton
            onPress={handlePageRight}
            disabled={atPageEnd}
            size={18}
            icon={() => (
              <ChevronRight
                color={!atPageEnd ? theme.colors.onSurface : 'transparent'}
              />
            )}
          />
        </View>
        <ScheduleFlatList
          weeks={matchupScheduleAtom.leagueSchedule}
          page={pageIndex}
        />
      </>
    </View>
  );
};

export default SchedulePage;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    gap: 8,
  },
  titleTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  disabled: {
    color: 'rgba(102, 119, 150, 1)',
  },
});
