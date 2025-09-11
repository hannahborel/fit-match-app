import React, { useState } from 'react';
import { View } from 'react-native';
import { Card, Button, useTheme, Text } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { useUpdateLeague } from '@/hooks/useUpdateLeague';
import { Picker } from '@react-native-picker/picker'; // <-- Make sure this is installed

type ManageLeagueSettingsProps = {
  leagueId: string;
  leagueSize: number;
};

const ManageLeagueSize = ({
  leagueId,
  leagueSize,
}: ManageLeagueSettingsProps) => {
  const [newSize, setNewSize] = useState(leagueSize);
  const [showPicker, setShowPicker] = useState(false);
  const theme = useTheme();
  const { getToken } = useAuth();

  const mutation = useUpdateLeague('League size updated! 🎉');

  const handleUpdate = async () => {
    const token = await getToken();
    if (!token) return;

    mutation.mutate({
      token,
      updates: {
        id: leagueId,
        size: newSize,
      },
    });
  };

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: 12,
            borderBottomWidth: 1,
            borderColor: theme.colors.surfaceVariant,
          }}
        >
          <View style={{ width: '40%' }}>
            <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>
              League Size
            </Text>
          </View>
          <View
            style={{
              width: '60%',
              alignItems: 'flex-end',
            }}
          >
            <Text
              onPress={() => setShowPicker(!showPicker)}
              style={{
                color: theme.colors.onSurface,
                fontWeight: 500,
                fontSize: 14,
                flexWrap: 'nowrap',
              }}
            >
              {leagueSize}
            </Text>
          </View>
        </View>
        {showPicker && (
          <>
            <Picker
              selectedValue={newSize}
              onValueChange={(itemValue) => setNewSize(itemValue)}
              style={{
                backgroundColor: theme.colors.surface,
                borderRadius: 4,
              }}
            >
              {[...Array(20)].map((_, i) => {
                const value = i + 2; // minimum size = 2
                return (
                  <Picker.Item key={value} label={`${value}`} value={value} />
                );
              })}
            </Picker>
            <Button
              mode="contained"
              onPress={handleUpdate}
              style={{ marginTop: 12 }}
              disabled={mutation.isPending || newSize === leagueSize}
              loading={mutation.isPending}
            >
              <Text>Update</Text>
            </Button>
          </>
        )}
      </View>

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
    </>
  );
};

export default ManageLeagueSize;
