// src/app/(protected)/(tabs)/standings/schedulePage.tsx
import { leagueAtom } from '@/atoms/leagueAtom';
import {
  allMatchupsWithPointsAtom,
  currentMatchAtom,
} from '@/atoms/matchesAtom';

import {
  getMembersNeeded,
  hasLeagueStarted,
  isLeagueFull,
} from '@/helpers/leagueStatus';
import { generateSchedulePreview } from '@/helpers/sheduleHelpers/generateSchedulePreview';

import { useAtomValue } from 'jotai';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

import ScheduleFlatList from '@/app/(protected)/(tabs)/calendar/components/Schedule/ScheduleFlatList';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';

const SchedulePage = () => {
  const matchupScheduleAtom = useAtomValue(allMatchupsWithPointsAtom);

  const currentWeek = useAtomValue(currentMatchAtom);
  const leagueData = useAtomValue(leagueAtom);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const theme = useTheme();

  const membersNeeded = leagueData ? getMembersNeeded(leagueData) : 0;
  const leagueHasStarted = leagueData ? hasLeagueStarted(leagueData) : false;
  const leagueFull = leagueData ? isLeagueFull(leagueData) : false;

  // Generate preview schedule or use real schedule
  const scheduleToDisplay = useMemo(() => {
    if (leagueFull && matchupScheduleAtom) {
      // League is full, use real schedule with actual match data
      return matchupScheduleAtom;
    } else if (leagueData) {
      // League not full, generate preview schedule with placeholders
      return generateSchedulePreview(leagueData);
    }
    return null;
  }, [leagueData, matchupScheduleAtom, leagueFull]);

  const totalPages = scheduleToDisplay?.leagueSchedule.length || 0;

  console.log(JSON.stringify(scheduleToDisplay, null, 2));
  useEffect(() => {
    if (currentWeek) {
      setPageIndex(currentWeek.week);
    }
  }, [currentWeek]);

  const handlePageLeft = () => {
    if (pageIndex === 0) return;
    setPageIndex((prev) => prev - 1);
  };

  const handlePageRight = () => {
    if (pageIndex + 1 === totalPages) return;
    setPageIndex((prev) => prev + 1);
  };

  if (!scheduleToDisplay || !leagueData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: theme.colors.onBackground }}>
          Loading schedule...
        </Text>
      </View>
    );
  }

  const atPageEnd = pageIndex + 1 === totalPages;
  const atPageBeginning = pageIndex === 0;

  return (
    <View style={styles.container}>
      {/* Show notification when league isn't full */}
      {/* {!leagueFull && (
        <ScheduleNotification
          membersNeeded={membersNeeded}
          hasStarted={leagueHasStarted}
        />
      )} */}

      {/* Schedule navigation */}
      <View style={styles.switchContainer}>
        <IconButton
          onPress={handlePageLeft}
          disabled={atPageBeginning}
          size={18}
          icon={() => (
            <ChevronLeft
              color={!atPageBeginning ? theme.colors.onSurface : 'transparent'}
            />
          )}
        />
        <View style={styles.titleTextContainer}>
          <Text>{'WEEK '}</Text>
          <View style={{ width: 10, alignItems: 'center' }}>
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

      {/* Schedule list */}
      <ScheduleFlatList
        weeks={scheduleToDisplay.leagueSchedule}
        page={pageIndex}
        isPreview={!leagueFull}
      />
    </View>
  );
};

export default SchedulePage;

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
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
});
