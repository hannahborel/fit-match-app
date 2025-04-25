import NumberAvatar from '../../components/library/NumberAvatar';
import { useRouter } from 'expo-router';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import InputPrimary from '../../components/library/InputPrimary';
import CustomHeader from '../../components/library/CustomHeader';
import ButtonPrimary from '../../components/library/ButtonPrimary';
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-expo';
import { useApiClient } from '../../../utils/apiClient';

const FaceOffSetup = () => {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const { authenticatedFetch } = useApiClient();

  const [leagueName, setLeagueName] = useState('');
  const [leagueSize, setLeagueSize] = useState(4);
  const [regularWeeks, setRegularWeeks] = useState(4);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateLeague = async () => {
    if (!leagueName.trim()) {
      Alert.alert('Missing Info', 'Please enter a league name.');
      return;
    }
    if (!isSignedIn || !user) {
      Alert.alert('Not Signed In', 'Authentication session issue. Please sign in again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const placeholderMagicLink = `fitmatch://invite/${leagueName.replace(/\s+/g, '-')}-${Date.now()}`;

    const leagueDataForApi = {
      name: leagueName.trim(),
      description: 'test description',
      ownerId: user.id,
      size: leagueSize,
      weeks: regularWeeks,
      start_date: new Date().toISOString(),
      magic_link: placeholderMagicLink,
    };

    try {
      console.log('Attempting to create league with data:', leagueDataForApi);
      const newLeague = await authenticatedFetch('/api/league/create', {
        method: 'POST',
        body: JSON.stringify(leagueDataForApi),
      });

      console.log('League created successfully:', newLeague);
      Alert.alert('Success', `League "${newLeague.name || leagueName}" created!`);
      router.replace('/(protected)/home');
    } catch (err: any) {
      console.error('Failed to create league:', err);
      const errorMessage = err.message || 'An unexpected error occurred creating the league.';
      setError(errorMessage);
      Alert.alert('Creation Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const disableCreateLeague =
    !leagueName.trim() || leagueSize <= 0 || regularWeeks <= 0 || !user || isLoading;

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="FaceOff Setup" />
      <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 28, marginTop: 36 }}>
        <View style={{ gap: 24, width: '100%' }}>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>FACEOFF NAME</Text>
            <InputPrimary
              mode="outlined"
              value={leagueName}
              onChangeText={setLeagueName}
              disabled={isLoading}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>LEAGUE SIZE</Text>
            <NumberAvatar start={4} end={98} step={2} setValue={setLeagueSize} />
          </View>
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>REGULAR SEASON WEEKS</Text>
            <NumberAvatar start={4} end={16} step={4} setValue={setRegularWeeks} />
          </View>
          {error && (
            <Text style={{ color: theme.colors.error, textAlign: 'center', marginBottom: 10 }}>
              {error}
            </Text>
          )}
          {isLoading && (
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
              style={{ marginTop: 10, marginBottom: 10 }}
            />
          )}
          <ButtonPrimary
            style={{ marginTop: 24 }}
            onPress={handleCreateLeague}
            disabled={disableCreateLeague}
            loading={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create League'}
          </ButtonPrimary>
        </View>
      </View>
    </View>
  );
};

export default FaceOffSetup;
