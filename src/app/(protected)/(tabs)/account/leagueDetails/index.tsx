import { leagueAtom } from '@/atoms/leagueAtom';
import BottomSheet from '@/components/elements/BottomSheet/BottomSheet';
import ButtonPrimary from '@/components/elements/Buttons/ButtonPrimary';
import InputPrimary from '@/components/elements/Input/InputPrimary';
import DeleteLeagueButton from '@/app/(protected)/(tabs)/account/leagueDetails/components/DeleteLeagueButton';
import LeagueDuration from './components/LeagueDuration';
import LeagueSize from '@/app/(protected)/(tabs)/account/leagueDetails/components/LeagueSize';
import ManageLeagueName from '@/app/(protected)/(tabs)/account/leagueDetails/components/LeagueName';

import UpdateLeagueStartDateDemo from '@/app/(protected)/(tabs)/account/leagueDetails/components/StartDate';
import { useUpdateLeague } from '@/hooks/useUpdateLeague';
import { useIsLeagueManager } from '@/hooks/useIsLeagueManager';
import { useAuth } from '@clerk/clerk-expo';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import NumberAvatar from '@/components/library/NumberAvatar';
import InviteFriendsButton from './components/InviteFriendsButton';
import ManageLeagueButton from './components/ManageLeague/ManageLeagueButton';

const LeagueDetails = () => {
  const theme = useTheme();
  const leagueDetails = useAtomValue(leagueAtom);
  const navigation = useNavigation();
  const { getToken } = useAuth();
  const isLeagueManager = useIsLeagueManager();

  // Track pending changes
  const [pendingChanges, setPendingChanges] = useState<{
    weeks?: number;
    size?: number;
  }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);

  // Edit form state
  const [editLeagueName, setEditLeagueName] = useState('');
  const [editLeagueSize, setEditLeagueSize] = useState<number>(0);
  const [editRegularWeeks, setEditRegularWeeks] = useState<number>(0);
  const [editSelectedDate, setEditSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateText, setDateText] = useState('');

  const mutation = useUpdateLeague();
  const shouldAllowNavigation = useRef(false);

  // Update navigation header with Edit button (only for league manager and league is upcoming)
  useEffect(() => {
    const canEdit = isLeagueManager && leagueDetails?.status === 'upcoming';
    navigation.setOptions({
      headerRight: canEdit
        ? () => (
            <TouchableOpacity onPress={handleOpenEditSheet}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                  paddingRight: 16,
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          )
        : undefined,
    });
  }, [
    navigation,
    theme.colors.primary,
    isLeagueManager,
    leagueDetails?.status,
  ]);

  // Initialize edit form when opening the sheet
  const handleOpenEditSheet = () => {
    if (leagueDetails) {
      setEditLeagueName(leagueDetails.name);
      setEditLeagueSize(leagueDetails.size);
      setEditRegularWeeks(leagueDetails.weeks);
      const startDate = new Date(leagueDetails.startDate);
      setEditSelectedDate(startDate);
      setDateText(startDate.toLocaleDateString());
    }
    setShowEditSheet(true);
  };

  const handleWeeksChange = (newWeeks: number) => {
    setPendingChanges((prev) => ({ ...prev, weeks: newWeeks }));
  };

  const handleSizeChange = (newSize: number) => {
    setPendingChanges((prev) => ({ ...prev, size: newSize }));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    // On Android, the picker automatically closes after selection
    // On iOS, we need to handle it manually
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      const currentDate = selectedDate;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (currentDate >= today) {
        setEditSelectedDate(currentDate);
        setDateText(currentDate.toLocaleDateString());
      }
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Check if any changes have been made
  const hasEditChanges = () => {
    if (!leagueDetails) return false;

    return (
      editLeagueName !== leagueDetails.name ||
      editLeagueSize !== leagueDetails.size ||
      editRegularWeeks !== leagueDetails.weeks ||
      editSelectedDate.toDateString() !==
        new Date(leagueDetails.startDate).toDateString()
    );
  };

  const handleSaveEdit = async () => {
    if (!leagueDetails) return;

    setIsLoading(true);

    const token = await getToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    mutation.mutate(
      {
        token,
        updates: {
          id: leagueDetails.id,
          name: editLeagueName,
          size: editLeagueSize,
          weeks: editRegularWeeks,
          startDate: editSelectedDate,
        },
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          setShowEditSheet(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <SafeAreaView>
      <View style={{ gap: 20, padding: 8 }}>
        {leagueDetails && (
          <>
            <View
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <ManageLeagueName leagueName={leagueDetails.name} disabled />

              <LeagueDuration
                leagueId={leagueDetails.id}
                weeks={pendingChanges.weeks ?? leagueDetails.weeks}
                onValueChange={handleWeeksChange}
                disabled
              />

              <LeagueSize
                leagueId={leagueDetails.id}
                leagueSize={pendingChanges.size ?? leagueDetails.size}
                onValueChange={handleSizeChange}
                disabled
              />
              <UpdateLeagueStartDateDemo
                startDate={new Date(leagueDetails.startDate)}
                leagueId={leagueDetails.id}
                disabled
              />
            </View>
            <View style={{ gap: 8 }}>
              {isLeagueManager && (
                <ManageLeagueButton leagueId={leagueDetails.id} />
              )}
              {isLeagueManager && (
                <DeleteLeagueButton leagueId={leagueDetails.id} />
              )}
            </View>
          </>
        )}
      </View>

      <BottomSheet
        visible={showEditSheet}
        onClose={() => setShowEditSheet(false)}
        title="Edit League Details"
        size="lg"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: 'space-between' }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={0}
        >
          <View style={{ flex: 1, gap: 36 }}>
            <View style={{ gap: 8, marginTop: 8 }}>
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                FACEOFF NAME
              </Text>
              <InputPrimary
                mode="outlined"
                value={editLeagueName}
                onChangeText={setEditLeagueName}
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
                initialValue={editLeagueSize}
                setValue={setEditLeagueSize}
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
                initialValue={editRegularWeeks}
                setValue={setEditRegularWeeks}
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
                onPressIn={toggleDatePicker}
                editable={false}
                right={
                  <TextInput.Icon icon="calendar" onPress={toggleDatePicker} />
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
                    value={editSelectedDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                  />
                </View>
              )}
            </View>
          </View>
          <View style={{ marginBottom: 8 }}>
            <ButtonPrimary
              onPress={handleSaveEdit}
              disabled={!hasEditChanges()}
              loading={isLoading}
              replaceTextWithSpinner={true}
            >
              <Text>Save Changes</Text>
            </ButtonPrimary>
          </View>
        </KeyboardAvoidingView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default LeagueDetails;
