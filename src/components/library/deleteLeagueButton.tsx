import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
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
              console.log(result);
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
    <View style={{ marginTop: 16 }}>
      <Button
        mode="outlined"
        onPress={handleDelete}
        loading={loading}
        disabled={loading}
        textColor={theme.colors.error}
        style={{ borderColor: theme.colors.error }}
      >
        <Text> Delete League</Text>
      </Button>
    </View>
  );
};

export default DeleteLeagueButton;
