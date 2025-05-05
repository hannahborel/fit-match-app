import NumberAvatar from '../../components/library/NumberAvatar';
import { useRouter, useNavigation } from 'expo-router';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import InputPrimary from '../../components/library/InputPrimary';
import CustomHeader from '../../components/library/CustomHeader';
import ButtonPrimary from '../../components/library/ButtonPrimary';
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-expo';

const FaceOffSetup = () => {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  const [leagueName, setLeagueName] = useState('');
  const [leagueSize, setLeagueSize] = useState(4);
  const [regularWeeks, setRegularWeeks] = useState(4);

  const disableCreateLeague = !leagueName.trim() || leagueSize <= 0 || regularWeeks <= 0 || !user;

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="FaceOff Setup" />
      <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 28, marginTop: 36 }}>
        <View style={{ gap: 24, width: '100%' }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>FACEOFF NAME</Text>
            <InputPrimary mode="outlined" value={leagueName} onChangeText={setLeagueName} />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>LEAGUE SIZE</Text>
            <NumberAvatar start={4} end={98} step={2} setValue={setLeagueSize} />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>REGULAR SEASON WEEKS</Text>
            <NumberAvatar start={4} end={16} step={4} setValue={setRegularWeeks} />
          </View>
          <ButtonPrimary style={{ marginTop: 24 }} disabled={disableCreateLeague}>
            Create League
          </ButtonPrimary>
        </View>
      </View>
    </View>
  );
};

export default FaceOffSetup;
