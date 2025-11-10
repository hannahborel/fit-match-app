import ExpandedRows from '@/components/library/standingsComponents/expandedRows';
import { leagueAtom } from '@/atoms/leagueAtom';
import { getLeagueStandings } from '@/helpers/getLeagueStandings';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SyncUserButton } from '@/components/SyncUserButton';

const StandingsTab = () => {
  const leagueData = useAtomValue(leagueAtom);
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(
    new Set(),
  );
  const theme = useTheme();

  // Show loading state while league data is being fetched
  if (!leagueData) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Text style={{ color: theme.colors.onBackground }}>
          Loading standings...
        </Text>
      </View>
    );
  }

  // Get standings using the helper - works for both pre-league (0 points) and active league
  const standings = getLeagueStandings(leagueData);
  console.log('standings', standings);

  // Show message if no players have joined yet
  if (standings.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Text style={{ color: theme.colors.onBackground }}>
          No players in this league yet
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{ gap: 16, padding: 16 }}>
        <SyncUserButton />
        {standings.map((player, index) => {
          const isExpanded = expandedIndexes.has(index);
          return (
            <ExpandedRows
              key={player.userId}
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
