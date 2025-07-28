import { updateLeagueStartTime } from '@/queries/updateLeagueStartTime';
import { useAuth } from '@clerk/clerk-expo';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
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
  const [status, setStatus] = useState('');
  const theme = useTheme();
  const { getToken } = useAuth();

  const isDisabled = startDate.toISOString() === newStartDate.toISOString();

  const { mutate, isPending } = useMutation({
    mutationFn: updateLeagueStartTime,
    onSuccess: () => setStatus('Start date updated'),
    onError: (err) => setStatus(`Error: ${err?.message}`),
  });

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setNewStartDate(selectedDate);
    }
    // setShowPicker(false);
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
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 12,
        }}
      >
        <View style={{ width: '40%' }}>
          <Text style={{ color: theme.colors.onSurface, fontSize: 14 }}>
            Start Date
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
            {formatDate(newStartDate)}
          </Text>
        </View>
      </View>
      {showPicker && (
        <>
          <DateTimePicker
            value={newStartDate}
            mode="date"
            display={'spinner'}
            onChange={onChange}
            style={{ width: '100%' }}
          />

          {!isDisabled && (
            <Button
              disabled={isDisabled}
              loading={isPending}
              mode="contained"
              onPress={handleSubmit}
              style={{
                backgroundColor: isDisabled
                  ? theme.colors.surfaceDisabled
                  : theme.colors.primary,
              }}
            >
              <Text>Update</Text>
            </Button>
          )}
        </>
      )}

      <View style={{ marginTop: 8 }}>
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
      </View>
    </View>
  );
}
