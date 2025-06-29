import ThemeWrapperBg from '@/components/elements/ThemeWrapperBg';
import { View } from 'lucide-react-native';
import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'react-native-paper';
// import { useQueryClient } from '@tanstack/react-query';

const leagueDetails = () => {
  const theme = useTheme();
  // const queryClient = useQueryClient();

  // Replace 'getLeague' with your actual query key
  // const cachedLeagueData = queryClient.getQueryData(['league']);
  // console.log('-----------------cached------------------------');
  // console.log(cachedLeagueData);
  return (
    <ThemeWrapperBg>
      <View
        style={{
          flex: 1,
        }}
      >
        <Text>Content</Text>
      </View>
    </ThemeWrapperBg>
  );
};

export default leagueDetails;
