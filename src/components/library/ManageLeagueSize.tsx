import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { useUpdateLeague } from '@/hooks/useUpdateLeague';
import { Picker } from '@react-native-picker/picker';
import SettingsRow from './SettingsRow';

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
  const [initialValue, setInitialValue] = useState(leagueSize);
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

  const handlePickerToggle = () => {
    if (showPicker) {
      // Picker is closing - check if value changed
      if (newSize !== initialValue) {
        handleUpdate();
      }
    } else {
      // Picker is opening - save initial value
      setInitialValue(newSize);
    }
    setShowPicker(!showPicker);
  };

  return (
    <>
      <SettingsRow
        label="League Size"
        value={newSize}
        onPress={handlePickerToggle}
        isActive={showPicker}
      />
      {showPicker && (
        <Picker
          itemStyle={{
            fontSize: 18,
            height: 150,
          }}
          selectedValue={newSize}
          onValueChange={(itemValue) => setNewSize(itemValue)}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 4,
            borderBottomWidth: 1,
            borderColor: theme.colors.outline,
          }}
        >
          {[...Array(20)].map((_, i) => {
            const value = i + 2; // minimum size = 2
            return <Picker.Item key={value} label={`${value}`} value={value} />;
          })}
        </Picker>
      )}
    </>
  );
};

export default ManageLeagueSize;

// {mutation.isError && (
//   <Text style={{ marginTop: 8, color: 'red' }}>
//     {mutation.error instanceof Error ? mutation.error.message : 'Error'}
//   </Text>
// )}
