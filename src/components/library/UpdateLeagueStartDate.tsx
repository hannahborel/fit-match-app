import { useAuth } from '@clerk/clerk-expo';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import SettingsRow from './SettingsRow';
import { useUpdateLeague } from '@/hooks/useUpdateLeague';

type UpdateLeagueStartDateDemo = {
  startDate: Date;
  leagueId: string;
};

export default function UpdateLeagueStartDateDemo({
  startDate,
  leagueId,
}: UpdateLeagueStartDateDemo) {
  const [newStartDate, setNewStartDate] = useState(new Date(startDate));
  const [showPicker, setShowPicker] = useState(false);
  const [initialValue, setInitialValue] = useState(new Date(startDate));
  const { getToken } = useAuth();

  const mutation = useUpdateLeague('Start date updated! 🎉');

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setNewStartDate(selectedDate);
    }
  };

  const handleUpdate = async () => {
    const token = await getToken();
    if (!token) return;

    mutation.mutate({
      token,
      updates: {
        id: leagueId,
        startDate: newStartDate,
      },
    });
  };

  const handlePickerToggle = () => {
    if (showPicker) {
      // Picker is closing - check if value changed
      if (newStartDate.toISOString() !== initialValue.toISOString()) {
        handleUpdate();
      }
    } else {
      // Picker is opening - save initial value
      setInitialValue(newStartDate);
    }
    setShowPicker(!showPicker);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <>
      <SettingsRow
        label="Start Date"
        value={formatDate(newStartDate)}
        onPress={handlePickerToggle}
        isActive={showPicker}
        style={{
          borderBottomWidth: 0,
          borderBottomEndRadius: 8,
          borderBottomStartRadius: 8,
        }}
      />
      {showPicker && (
        <DateTimePicker
          value={newStartDate}
          mode="date"
          display={'spinner'}
          onChange={onChange}
          minimumDate={new Date()}
          style={{ width: '100%' }}
        />
      )}
    </>
  );
}
{
  /* <View style={{ marginTop: 8 }}>
{status !== '' && (
  <Text
    style={{
      marginTop: 12,
      color: status.includes('Error') ? 'red' : 'green',
    }}
  >
    {status}
  </Text>
)}
</View> */
}
