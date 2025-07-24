import ExpandedRows from '@/components/library/standingsComponents/expandedRows';

import { getLeagueStandings } from '@/helpers/getLeagueStandings';
import { useGetLeague } from '@/hooks/useGetLeague';

import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';

const StandingsTab = () => {
  const { data: leagueData } = useGetLeague();
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(
    new Set(),
  );

  const standingsList = leagueData ? getLeagueStandings(leagueData) : [];

  // console.log(JSON.stringify(leagueData, null, 3));
  // console.log(JSON.stringify(standingsList, null, 2));
  const theme = useTheme();

  const styles = getStyles(theme);
  return (
    <ScrollView>
      <View style={{ gap: 16, padding: 16 }}>
        {leagueData &&
          standingsList.map((player, index) => {
            const isExpanded = expandedIndexes.has(index);
            return (
              <ExpandedRows
                key={index}
                index={index}
                player={player}
                setIsExpanded={setExpandedIndexes}
                isExpanded={isExpanded}
              />
            );
          })}
      </View>
    </ScrollView>
  );
};

export default StandingsTab;
const getStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.colors.onSurface,
      borderBottomColor: 'rgba(51, 60, 78, 0.53)',
      borderBottomWidth: 1,
      padding: 8,
      paddingHorizontal: 16,
    },
    text_characters: {
      color: theme.colors.onSurface,
      fontWeight: 500,
      fontSize: 16,
      letterSpacing: 0,
    },
    text_numbers: {
      color: theme.colors.onSurface,
      fontSize: 18,
      fontWeight: 600,
    },
    listItem_left: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
    },
  });
