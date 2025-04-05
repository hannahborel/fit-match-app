import ButtonPrimary from '@/components/library/ButtonPrimary';
import InputPrimary from '@/components/library/InputPrimary';
import React from 'react';
import { View, Text } from 'react-native';
const leagueEntry = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: 300, gap: 16 }}>
        <ButtonPrimary>Join an Exiting League</ButtonPrimary>
        <ButtonPrimary>Create a New League</ButtonPrimary>
      </View>
    </View>
  );
};

export default leagueEntry;
