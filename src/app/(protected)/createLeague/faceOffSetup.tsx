import NumberAvatar from '@/components/library/NumberAvatar';

import { useCreateLeague } from '@/hooks/useCrateLeague';
import { CreateLeagueInput } from '@/types/types';
import { useUser } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import ButtonPrimary from '@/components/elements/ButtonPrimary';

import InputPrimary from '@/components/elements/InputPrimary';

const FaceOffSetup = () => {
  const { user } = useUser();
  const { mutate: createLeague } = useCreateLeague();
  const [leagueName, setLeagueName] = useState('');
  const [leagueSize, setLeagueSize] = useState<number>(0);
  const [regularWeeks, setRegularWeeks] = useState<number>(0);

  const disableCreateLeague =
    !leagueName.trim() || leagueSize <= 0 || regularWeeks <= 0 || !user;

  const handleCreateLeague = () => {
    const newLeague: CreateLeagueInput = {
      name: leagueName,
      size: leagueSize,
      weeks: regularWeeks,
      description: 'Test Face off 1',
      startDate: new Date(),
    };
    createLeague(newLeague);
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          paddingHorizontal: 28,
          marginTop: 36,
        }}
      >
        <View style={{ gap: 24, width: '100%' }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              FACEOFF NAME
            </Text>
            <InputPrimary
              mode="outlined"
              value={leagueName}
              onChangeText={setLeagueName}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              LEAGUE SIZE
            </Text>
            <NumberAvatar
              start={4}
              end={98}
              step={2}
              setValue={setLeagueSize}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              REGULAR SEASON WEEKS
            </Text>
            <NumberAvatar
              start={4}
              end={16}
              step={4}
              setValue={setRegularWeeks}
            />
          </View>
          <ButtonPrimary
            style={{ marginTop: 24 }}
            disabled={disableCreateLeague}
            onPress={handleCreateLeague}
          >
            <Text>Create League</Text>
          </ButtonPrimary>
        </View>
      </View>
    </View>
  );
};

export default FaceOffSetup;
