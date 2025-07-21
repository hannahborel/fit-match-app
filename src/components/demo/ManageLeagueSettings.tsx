import React, { useRef, useState } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';
import { Card, Button, useTheme, TextInput, Text } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { useUpdateLeague } from '@/hooks/useUpdateLeague';

type ManageLeagueSettingsProps = {
  leagueId: string;
  leagueSize: number;
};

const ManageLeagueSettings = ({
  leagueId,
  leagueSize,
}: ManageLeagueSettingsProps) => {
  const [newSize, setNewSize] = useState(String(leagueSize));
  const theme = useTheme();
  const { getToken } = useAuth();
  const inputRef = useRef<RNTextInput>(null);

  const mutation = useUpdateLeague('League size updated! 🎉');

  const handleUpdate = async () => {
    const token = await getToken();

    if (!token) {
      return console.log('notoken');
    }
    mutation.mutate({
      token,
      updates: {
        id: leagueId,
        size: Number(newSize),
      },
    });
  };

  return (
    <Card
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 16 }}>League Size</Text>
        <TextInput
          ref={inputRef}
          style={{ width: 80 }}
          value={newSize}
          keyboardType="number-pad"
          onChangeText={setNewSize}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleUpdate}
        style={{ marginTop: 12 }}
        disabled={mutation.isPending || newSize === String(leagueSize)}
        loading={mutation.isPending}
      >
        <Text>Update</Text>
      </Button>

      {mutation.isSuccess && (
        <Text style={{ marginTop: 8, color: theme.colors.primary }}>
          League size updated!
        </Text>
      )}
      {mutation.isError && (
        <Text style={{ marginTop: 8, color: 'red' }}>
          {mutation.error instanceof Error ? mutation.error.message : 'Error'}
        </Text>
      )}
    </Card>
  );
};

export default ManageLeagueSettings;
