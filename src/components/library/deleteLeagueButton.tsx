import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { deleteLeague } from '@/queries/deleteLeague';

type DeleteLeagueButtonProps = {
  leagueId: string;
};

const DeleteLeagueButton = ({ leagueId }: DeleteLeagueButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
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
              setLoading(true);
              const token = await getToken();

              if (!token) return;

              const result = await deleteLeague({ token, leagueId });
              Alert.alert('Deleted', result.message || 'League deleted');
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Something went wrong');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <TouchableOpacity
      onPress={handleDelete}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text style={{ fontWeight: 500, color: theme.colors.error }}>
        Delete League
      </Text>
    </TouchableOpacity>
  );
};

export default DeleteLeagueButton;
