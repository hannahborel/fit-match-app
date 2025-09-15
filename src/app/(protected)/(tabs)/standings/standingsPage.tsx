import ExpandedRows from '@/components/library/standingsComponents/expandedRows';

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';

const StandingsTab = () => {
  return (
    <ScrollView>
      <View style={{ gap: 16, padding: 16 }}>
        <Text>Standings</Text>
        {/* {leagueData &&
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
          })} */}
      </View>
    </ScrollView>
  );
};

export default StandingsTab;
