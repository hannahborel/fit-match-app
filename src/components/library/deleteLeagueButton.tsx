import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Text, useTheme, ActivityIndicator } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { deleteLeague } from '@/queries/deleteLeague';
import { useAuthCache } from '@/hooks/useAuthCashe';
import { router } from 'expo-router';

type DeleteLeagueButtonProps = {
  leagueId: string;
};

const DeleteLeagueButton = ({ leagueId }: DeleteLeagueButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { getToken } = useAuth();
  const { clearLeagueData } = useAuthCache();
  const theme = useTheme();

  const handleDelete = async () => {
    Alert.alert(
      'Delete League',
      'Are you sure you want to delete this league?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsDeleting(true);
              const token = await getToken();

              if (!token) {
                setIsDeleting(false);
                return;
              }

              const result = await deleteLeague({ token, leagueId });

              // Clear league cache after successful deletion
              await clearLeagueData();

              // Redirect to home after everything is complete
              router.replace('/');
            } catch (err: any) {
              setIsDeleting(false);
              Alert.alert('Error', err.message || 'Something went wrong');
            }
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      onPress={handleDelete}
      disabled={isDeleting}
      style={{
        backgroundColor: 'transparent',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        opacity: isDeleting ? 0.7 : 1,
      }}
    >
      {isDeleting ? (
        <ActivityIndicator size="small" color={theme.colors.error} />
      ) : (
        <Text style={{ fontWeight: 500, color: theme.colors.error }}>
          Delete League
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default DeleteLeagueButton;
