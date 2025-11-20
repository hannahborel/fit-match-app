import { leagueAtom } from '@/atoms/leagueAtom';
import DeleteLeagueButton from '@/components/library/DeleteLeagueButton';
import LeagueDuration from '@/components/library/LeagueDuration';
import LeagueSize from '@/components/library/LeagueSize';
import ManageLeagueName from '@/components/library/ManageUserDetails';
import UpdateLeagueStartDateDemo from '@/components/library/UpdateLeagueStartDate';
import Snackbar from '@/components/elements/Snackbar';
import UnsavedChangesSheet from '@/components/elements/UnsavedChangesSheet';
import BottomSheet from '@/components/elements/BottomSheet';
import NumberAvatar from '@/components/library/NumberAvatar';
import InputPrimary from '@/components/elements/InputPrimary';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import { useUpdateLeague } from '@/hooks/useUpdateLeague';
import { useAuth } from '@clerk/clerk-expo';
import { useAtomValue } from 'jotai';
import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Text, useTheme, Portal, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const LeagueDetails = () => {
  const theme = useTheme();
  const leagueDetails = useAtomValue(leagueAtom);
  const navigation = useNavigation();
  const { getToken } = useAuth();

  // Track pending changes
  const [pendingChanges, setPendingChanges] = useState<{
    weeks?: number;
    size?: number;
  }>({});
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [showUnsavedChangesSheet, setShowUnsavedChangesSheet] = useState(false);
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

  const hasPendingChanges = Object.keys(pendingChanges).length > 0;

  // Intercept back navigation to show unsaved changes warning
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // If we've explicitly allowed navigation, let it through
      if (shouldAllowNavigation.current) {
        shouldAllowNavigation.current = false;
        return;
      }

      if (!hasPendingChanges) {
        // No pending changes, allow navigation
        return;
      }

      // Prevent default navigation
      e.preventDefault();

      // Show unsaved changes sheet
      setShowUnsavedChangesSheet(true);
    });

    return unsubscribe;
  }, [navigation, hasPendingChanges]);

  // Update navigation header with Edit button
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
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
      ),
    });
  }, [navigation, theme.colors.primary]);

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
    setShowEditSheet(false);

    const token = await getToken();
    if (!token) return;

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
          setShowSuccessSnackbar(true);
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    );
  };

  const handleSave = async () => {
    if (!leagueDetails) return;
    // Show loading immediately
    setIsLoading(true);

    const token = await getToken();
    if (!token) return;

    // Save all pending changes
    mutation.mutate(
      {
        token,
        updates: {
          id: leagueDetails.id,
          ...pendingChanges,
        },
      },
      {
        onSuccess: () => {
          // Clear pending changes
          setPendingChanges({});
          // Hide loading
          setIsLoading(false);
          // Show success snackbar
          setShowSuccessSnackbar(true);
        },
        onError: () => {
          // Hide loading on error
          setIsLoading(false);
        },
      },
    );
  };

  const handleDiscardAndGoBack = () => {
    // Clear pending changes
    setPendingChanges({});
    setShowUnsavedChangesSheet(false);
    // Allow navigation and go back
    shouldAllowNavigation.current = true;
    navigation.goBack();
  };

  const handleSaveAndGoBack = async () => {
    if (!leagueDetails) return;

    const token = await getToken();
    if (!token) return;

    // Close the unsaved changes sheet first
    setShowUnsavedChangesSheet(false);

    // Show loading immediately
    setIsLoading(true);

    // Save all pending changes
    mutation.mutate(
      {
        token,
        updates: {
          id: leagueDetails.id,
          ...pendingChanges,
        },
      },
      {
        onSuccess: () => {
          // Clear pending changes
          setPendingChanges({});
          // Hide loading
          setIsLoading(false);
          // Show success snackbar
          setShowSuccessSnackbar(true);
        },
        onError: () => {
          // Hide loading on error
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
            <View style={{ gap: 12 }}>
              <DeleteLeagueButton leagueId={leagueDetails.id} />
            </View>
          </>
        )}
      </View>

      <Snackbar
        visible={showSuccessSnackbar}
        type="success"
        title="Changes saved"
        text="Your league details have been updated"
        onDismiss={() => setShowSuccessSnackbar(false)}
        duration={3000}
        position="bottom"
      />

      <UnsavedChangesSheet
        visible={showUnsavedChangesSheet}
        onSave={handleSaveAndGoBack}
        onDiscard={handleDiscardAndGoBack}
        onClose={() => setShowUnsavedChangesSheet(false)}
      />

      {isLoading && (
        <Portal>
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        </Portal>
      )}

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
            >
              <Text>Save Changes</Text>
            </ButtonPrimary>
          </View>
        </KeyboardAvoidingView>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default LeagueDetails;
