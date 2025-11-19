import { leagueAtom } from '@/atoms/leagueAtom';
import DeleteLeagueButton from '@/components/library/DeleteLeagueButton';
import LeagueDuration from '@/components/library/LeagueDuration';
import LeagueSize from '@/components/library/LeagueSize';
import ManageLeagueName from '@/components/library/ManageUserDetails';
import UpdateLeagueStartDateDemo from '@/components/library/UpdateLeagueStartDate';
import ConfirmationModal from '@/components/elements/ConfirmationModal';
import UnsavedChangesSheet from '@/components/elements/UnsavedChangesSheet';
import { useUpdateLeague } from '@/hooks/useUpdateLeague';
import { useAuth } from '@clerk/clerk-expo';
import { useAtomValue } from 'jotai';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

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
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showUnsavedChangesSheet, setShowUnsavedChangesSheet] = useState(false);

  const mutation = useUpdateLeague();

  const hasPendingChanges = Object.keys(pendingChanges).length > 0;

  // Intercept back navigation to show unsaved changes warning
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
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

  // Update navigation header when pending changes state changes
  useEffect(() => {
    navigation.setOptions({
      headerRight: hasPendingChanges
        ? () => (
            <TouchableOpacity onPress={handleSave}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: theme.colors.primary,
                  paddingRight: 16,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          )
        : undefined,
    });
  }, [hasPendingChanges, navigation, theme.colors.secondary, pendingChanges]);

  const handleWeeksChange = (newWeeks: number) => {
    setPendingChanges((prev) => ({ ...prev, weeks: newWeeks }));
  };

  const handleSizeChange = (newSize: number) => {
    setPendingChanges((prev) => ({ ...prev, size: newSize }));
  };

  const handleSave = async () => {
    if (!leagueDetails) return;

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
          // Show confirmation modal
          setShowConfirmationModal(true);
        },
      },
    );
  };

  const handleDiscardAndGoBack = () => {
    // Clear pending changes and allow navigation
    setPendingChanges({});
    setShowUnsavedChangesSheet(false);
    // Navigate back after clearing changes
    navigation.goBack();
  };

  const handleSaveAndGoBack = async () => {
    if (!leagueDetails) return;

    const token = await getToken();
    if (!token) return;

    // Close the unsaved changes sheet first
    setShowUnsavedChangesSheet(false);

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
          // Show confirmation modal
          setShowConfirmationModal(true);
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
              <ManageLeagueName leagueName={leagueDetails.name} />

              <LeagueDuration
                leagueId={leagueDetails.id}
                weeks={pendingChanges.weeks ?? leagueDetails.weeks}
                onValueChange={handleWeeksChange}
              />

              <LeagueSize
                leagueId={leagueDetails.id}
                leagueSize={pendingChanges.size ?? leagueDetails.size}
                onValueChange={handleSizeChange}
              />
              <UpdateLeagueStartDateDemo
                startDate={new Date(leagueDetails.startDate)}
                leagueId={leagueDetails.id}
              />
            </View>
            <View style={{ gap: 12 }}>
              <DeleteLeagueButton leagueId={leagueDetails.id} />
            </View>
          </>
        )}
      </View>

      <ConfirmationModal
        visible={showConfirmationModal}
        message="Your changes have been saved"
        onDismiss={() => setShowConfirmationModal(false)}
      />

      <UnsavedChangesSheet
        visible={showUnsavedChangesSheet}
        onSave={handleSaveAndGoBack}
        onDiscard={handleDiscardAndGoBack}
        onClose={() => setShowUnsavedChangesSheet(false)}
      />
    </SafeAreaView>
  );
};

export default LeagueDetails;
