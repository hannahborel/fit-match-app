import { updateLeagueStartTime } from '@/queries/updateLeagueStartTime';
import { useAuth } from '@clerk/clerk-expo';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { Row } from '../elements/Table/TableElements';

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
  const isDisabled = startDate.toISOString() === newStartDate.toISOString();
  const [status, setStatus] = useState('');
  const theme = useTheme();
  const { getToken } = useAuth();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: updateLeagueStartTime,
    onSuccess: () => {
      setStatus('Start date updated');
    },
    onError: (err) => {
      setStatus(`Error: ${err?.message}`);
    },
  });

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) setNewStartDate(selectedDate);
    setShowPicker(false);
  };

  const handleSubmit = async () => {
    setStatus('');
    const token = await getToken();
    if (token) {
      mutate({ leagueId, newStartDate, token });
    } else {
      console.log('no token found');
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short', // use "long" for full month name
      day: 'numeric',
    });
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShowPicker(!showPicker)}>
        <Row col1={'Start Date'} col2={formatDate(new Date(newStartDate))} />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      )}
      <View style={{ marginTop: 20 }}>
        <Button
          disabled={isDisabled}
          style={{
            backgroundColor: isDisabled ? 'grey' : theme.colors.onSurface,
          }}
          textColor={theme.colors.surface}
          onPress={handleSubmit}
        >
          <Text>Update</Text>
        </Button>
      </View>
      {status !== '' && (
        <Text
          style={{
            marginTop: 15,
            color: status.includes('Error') ? 'red' : 'green',
          }}
        >
          {status}
        </Text>
      )}
    </>
  );
}
