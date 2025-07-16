import BgView from '@/components/elements/BgView';
import { useGetLeague } from '@/hooks/useGetLeague';
import React from 'react';
import { Text } from 'react-native';

const Standings = () => {
  const { data, error } = useGetLeague();

  const parsedData = JSON.stringify(data, null, 2);

  return (
    <BgView>
      <Text style={{ color: 'white' }}>{parsedData}</Text>
    </BgView>
  );
};

export default Standings;
