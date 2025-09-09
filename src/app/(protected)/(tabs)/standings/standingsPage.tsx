import ExpandedRows from '@/components/library/standingsComponents/expandedRows';

import { getLeagueStandings } from '@/helpers/getLeagueStandings';
import { useGetLeague } from '@/hooks/useGetLeague';

import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

const StandingsTab = () => {
  const { data: leagueData } = useGetLeague();
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(
    new Set(),
  );

  const standingsList = leagueData ? getLeagueStandings(leagueData) : [];

  // console.log(JSON.stringify(leagueData, null, 3));
  // console.log(JSON.stringify(standingsList, null, 2));

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
