import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import { useAuth } from '@clerk/clerk-expo';
import { useUpdateLeague } from '@/hooks/useUpdateLeague';
import { Picker } from '@react-native-picker/picker';
import SettingsRow from './SettingsRow';

type ManageLeagueDurationProps = {
  leagueId: string;
  weeks: number;
};

const ManageLeagueDuration = ({
  leagueId,
  weeks,
}: ManageLeagueDurationProps) => {
  const [newWeeks, setNewWeeks] = useState(weeks);
  const [showPicker, setShowPicker] = useState(false);
  const [initialValue, setInitialValue] = useState(weeks);
  const theme = useTheme();
  const { getToken } = useAuth();

  const mutation = useUpdateLeague('League duration updated! 🎉');

  const handleUpdate = async () => {
    const token = await getToken();
    if (!token) return;

    mutation.mutate({
      token,
      updates: {
        id: leagueId,
        weeks: newWeeks,
      },
    });
  };

  const handlePickerToggle = () => {
    if (showPicker) {
      // Picker is closing - check if value changed
      if (newWeeks !== initialValue) {
        handleUpdate();
      }
    } else {
      // Picker is opening - save initial value
      setInitialValue(newWeeks);
    }
    setShowPicker(!showPicker);
  };

  return (
    <>
      <SettingsRow
        label="League Duration"
        value={`${newWeeks} weeks`}
        onPress={handlePickerToggle}
        isActive={showPicker}
      />
      {showPicker && (
        <Picker
          itemStyle={{
            fontSize: 18,
            height: 150,
          }}
          selectedValue={newWeeks}
          onValueChange={(itemValue) => setNewWeeks(itemValue)}
          style={{
            backgroundColor: theme.colors.surface,
            borderRadius: 4,
            borderBottomWidth: 1,
            borderColor: theme.colors.outline,
          }}
        >
          {[4, 8, 12, 16].map((value) => (
            <Picker.Item key={value} label={`${value} weeks`} value={value} />
          ))}
        </Picker>
      )}
    </>
  );
};

export default ManageLeagueDuration;
