import { useUpdateLeague } from '@/hooks/useUpdateLeague';
import { useAuth } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import LeagueDurationPicker from '../EditLeague/components/LeagueDurationPicker';
import BottomSheet from '../elements/BottomSheet';
import SettingsRow from './SettingsRow';

type LeagueDurationProps = {
  leagueId: string;
  weeks: number;
};

const LeagueDuration = ({ leagueId, weeks }: LeagueDurationProps) => {
  const [newWeeks, setNewWeeks] = useState(weeks);
  const [showModal, setShowModal] = useState(false);
  const [initialValue, setInitialValue] = useState(weeks);
  const theme = useTheme();
  const { getToken } = useAuth();

  const mutation = useUpdateLeague('League duration updated! 🎉');

  console.log(initialValue, newWeeks);

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

  const handleConfirm = () => {
    console.log(handleConfirm);
    if (showModal) {
      // Picker is closing - check if value changed
      if (newWeeks !== initialValue) {
        setInitialValue(newWeeks);
        handleUpdate();
      }
    } else {
      // Picker is opening - save initial value
      setInitialValue(newWeeks);
    }
    setShowModal(!showModal);
  };

  return (
    <>
      <SettingsRow
        label="League Duration"
        value={`${initialValue} weeks`}
        onPress={() => setShowModal(true)}
      />

      <BottomSheet
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Edit League Duration"
        size="sm"
        iconRight="Check"
        onIconRightPress={handleConfirm}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        <LeagueDurationPicker
          setNewWeeks={setNewWeeks}
          initialValue={initialValue}
        />
      </BottomSheet>
    </>
  );
};

export default LeagueDuration;
