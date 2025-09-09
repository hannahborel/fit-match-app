import ExpandedRows from '@/components/library/standingsComponents/expandedRows';

import { getLeagueStandings } from '@/helpers/getLeagueStandings';
import { fetchUsersForLeague, UserData } from '@/helpers/fetchUsersForLeague';
import { useGetLeague } from '@/hooks/useGetLeague';

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';

const StandingsTab = () => {
  const { data: leagueData } = useGetLeague();
  const [expandedIndexes, setExpandedIndexes] = useState<Set<number>>(
    new Set(),
  );
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (leagueData) {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const userData = await fetchUsersForLeague(leagueData);
          console.log('Fetched users:', JSON.stringify(userData, null, 2));
          setUsers(userData);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [leagueData]);

  const standingsList = leagueData ? getLeagueStandings(leagueData, users) : [];

  // console.log(JSON.stringify(leagueData, null, 3));
  console.log('Standings List:', JSON.stringify(standingsList, null, 2));

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading standings...</Text>
      </View>
    );
  }

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
