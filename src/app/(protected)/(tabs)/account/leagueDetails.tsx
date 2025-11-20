import { leagueAtom } from '@/atoms/leagueAtom';
import DeleteLeagueButton from '@/components/library/DeleteLeagueButton';
import LeagueDuration from '@/components/library/LeagueDuration';
import LeagueSize from '@/components/library/LeagueSize';
import ManageLeagueName from '@/components/library/ManageUserDetails';
import UpdateLeagueStartDateDemo from '@/components/library/UpdateLeagueStartDate';
import Snackbar from '@/components/elements/Snackbar';
import UnsavedChangesSheet from '@/components/elements/UnsavedChangesSheet';
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
} from 'react-native';
import { Text, useTheme, Portal } from 'react-native-paper';
import { useNavigation, CommonActions } from '@react-navigation/native';

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
