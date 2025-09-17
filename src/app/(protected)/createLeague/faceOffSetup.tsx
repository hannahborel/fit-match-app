import NumberAvatar from '@/components/library/NumberAvatar';

import { useCreateLeague } from '@/hooks/useCrateLeague';
import { CreateLeagueInput } from 'hustle-types';

import { useUser } from '@clerk/clerk-expo';
import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import { Text, TextInput, useTheme, Button } from 'react-native-paper';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import LoadingScreen from '@/components/elements/LoadingScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

import InputPrimary from '@/components/elements/InputPrimary';

const FaceOffSetup = () => {
  const { user } = useUser();
  const { mutate: createLeague, isPending, isError, error } = useCreateLeague();
  const theme = useTheme();
  const [leagueName, setLeagueName] = useState('');
  const [leagueSize, setLeagueSize] = useState<number>(0);
  const [regularWeeks, setRegularWeeks] = useState<number>(0);

  // Date picker state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateText, setDateText] = useState('');

  // UI state
  const [showError, setShowError] = useState(false);

  // Initialize date text on component mount
  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    setDateText(today.toLocaleDateString());
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison

    // Check if selected date is not in the past
    if (currentDate >= today) {
      setSelectedDate(currentDate);
      setDateText(currentDate.toLocaleDateString());
    }

    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const disableCreateLeague =
    !leagueName.trim() ||
    leagueSize <= 0 ||
    regularWeeks <= 0 ||
    !user ||
    !selectedDate;

  const handleCreateLeague = () => {
    console.log('Starting league creation process...');
    console.log('User:', user?.id);

    const newLeague: CreateLeagueInput = {
      name: leagueName,
      size: leagueSize,
      weeks: regularWeeks,
      description: 'Test Face off 1',
      startDate: selectedDate.toISOString(),
    };

    console.log('League data to be created:', newLeague);

    createLeague(newLeague, {
      onSuccess: (data) => {
        console.log('League created successfully:', data);
        // Use a longer timeout to ensure all state updates are complete
        setTimeout(() => {
          router.replace('/(protected)/(tabs)');
        }, 500);
      },
      onError: (error) => {
        console.error('League creation failed:', error);
        // Show error state
        setShowError(true);
      },
    });
  };

  const handleRetry = () => {
    setShowError(false);
  };
  // Loading state
  if (isPending) {
    return <LoadingScreen message="Your league is being created..." />;
  }

  // Error state
  if (showError || isError) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.colors.error,
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          There was an error creating your league
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.colors.onBackground,
            marginBottom: 24,
            textAlign: 'center',
          }}
        >
          {error?.message ||
            'Please try again or contact support if the problem persists.'}
        </Text>
        <Button
          mode="contained"
          onPress={handleRetry}
          style={{ marginBottom: 12 }}
        >
          Try Again
        </Button>
        <Button mode="outlined" onPress={() => router.back()}>
          Go Back
        </Button>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{
          flex: 1,
          width: 300,
        }}
      >
        <View style={{ gap: 24, width: '100%', marginTop: 30 }}>
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
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              LEAGUE START DATE
            </Text>
            <TextInput
              mode="outlined"
              theme={{ roundness: 12 }}
              outlineColor={theme.colors.surface}
              value={dateText}
              onPressIn={showDatePickerModal}
              editable={false}
              right={
                <TextInput.Icon icon="calendar" onPress={showDatePickerModal} />
              }
              style={{
                width: '100%',
                borderRadius: 12,
                backgroundColor: theme.colors.background,
                height: 45,
              }}
            />
            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
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
