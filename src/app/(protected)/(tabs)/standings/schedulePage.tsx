import {
  currentMatchAtom,
  allMatchupsWithPointsAtom,
} from '@/atoms/matchesAtom';
import { leagueAtom } from '@/atoms/leagueAtom';
import ScheduleFlatList from '@/components/library/ScheduleFlatList';
import SchedulePlaceholder from '@/components/elements/SchedulePlaceholder';
import {
  shouldShowSchedule,
  getMembersNeeded,
  hasLeagueStarted,
} from '@/helpers/leagueStatus';

import { useAtomValue } from 'jotai';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

const SchedulePage = () => {
  const matchupScheduleAtom = useAtomValue(allMatchupsWithPointsAtom);
  const currentWeek = useAtomValue(currentMatchAtom);
  const leagueData = useAtomValue(leagueAtom);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const totalPages = matchupScheduleAtom?.leagueSchedule.length;

  const isReady = matchupScheduleAtom && currentWeek;

  // Check if schedule should be shown
  const showSchedule = leagueData ? shouldShowSchedule(leagueData) : false;
  const membersNeeded = leagueData ? getMembersNeeded(leagueData) : 0;
  const leagueHasStarted = leagueData ? hasLeagueStarted(leagueData) : false;

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
    const currentPage = pageIndex + 1;

    if (currentPage == totalPages) {
      return;
    } else {
      setPageIndex((prev) => prev + 1);
    }
  };

  // Show placeholder if schedule shouldn't be displayed
  if (!showSchedule) {
    return (
      <SchedulePlaceholder
        membersNeeded={membersNeeded}
        hasStarted={leagueHasStarted}
      />
    );
  }

  if (!isReady) {
    // If we don't have schedule data, show the placeholder
    return (
      <SchedulePlaceholder
        membersNeeded={membersNeeded}
        hasStarted={leagueHasStarted}
      />
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
