import { useCreateLeague } from '@/hooks/useCrateLeague';
import { CreateLeagueInput } from 'hustle-types';

import { useUser } from '@clerk/clerk-expo';
import React, { useState, useEffect } from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useAuthCache } from '@/hooks/useAuthCashe';

import InputPrimary from '@/components/elements/InputPrimary';
import NumberAvatar from '@/components/library/NumberAvatar';

const FaceOffSetup = () => {
  const { user } = useUser();
  const { mutate: createLeague } = useCreateLeague();
  const theme = useTheme();
  const [leagueName, setLeagueName] = useState('');
  const [leagueSize, setLeagueSize] = useState<number>(0);
  const [regularWeeks, setRegularWeeks] = useState<number>(0);
  const { updateLeagueCache } = useAuthCache();

  // Date picker state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateText, setDateText] = useState('');

  // UI state
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

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

    // Close the date picker on both platforms after selection
    setShowDatePicker(false);
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

    setIsCreating(true);

    const newLeague: CreateLeagueInput = {
      name: leagueName,
      size: leagueSize,
      weeks: regularWeeks,
      description: 'Test Face off 1',
      startDate: selectedDate.toISOString(),
    };

    createLeague(newLeague, {
      onSuccess: async (data) => {
        await updateLeagueCache(true, data.id);
        // Keep loading state until after redirect completes
        router.replace('/(protected)/(tabs)');
      },
      onError: (error) => {
        // Show error message and reset creating state
        setIsCreating(false);
        setErrorMessage(
          error?.message ||
            'An error occurred while creating your league. Please try again.',
        );
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginVertical: 20,
          }}
        >
          <View
            style={{
              width: '100%',
              gap: 40,
            }}
          >
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
            <View style={{ gap: 8, position: 'relative' }}>
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
                  <TextInput.Icon
                    icon="calendar"
                    onPress={showDatePickerModal}
                  />
                }
                style={{
                  width: '100%',
                  borderRadius: 12,
                  backgroundColor: theme.colors.background,
                  height: 45,
                }}
              />
              {showDatePicker && (
                <View
                  style={{
                    position: 'absolute',
                    top: 70,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                  }}
                >
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                  />
                </View>
              )}
            </View>
          </View>
          <View>
            <ButtonPrimary
              style={{ marginTop: 24 }}
              disabled={disableCreateLeague}
              loading={isCreating}
              replaceTextWithSpinner={true}
              onPress={handleCreateLeague}
            >
              <Text>Create League</Text>
            </ButtonPrimary>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FaceOffSetup;
