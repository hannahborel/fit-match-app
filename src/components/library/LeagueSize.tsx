import { useUpdateLeague } from '@/hooks/useUpdateLeague';
import { useAuth } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import LeagueSizePicker from '../EditLeague/components/LeagueSizePicker';
import BottomSheet from '../elements/BottomSheet';
import SettingsRow from './SettingsRow';

type LeagueSizeProps = {
  leagueId: string;
  leagueSize: number;
};

const LeagueSize = ({ leagueId, leagueSize }: LeagueSizeProps) => {
  const [newSize, setNewSize] = useState(leagueSize);
  const [showModal, setShowModal] = useState(false);
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

  const handleConfirm = () => {
    if (showModal) {
      // Picker is closing - check if value changed
      if (newSize !== initialValue) {
        setInitialValue(newSize);
        handleUpdate();
      }
    } else {
      // Picker is opening - save initial value
      setInitialValue(newSize);
    }
    setShowModal(!showModal);
  };

  return (
    <>
      <SettingsRow
        label="League Size"
        value={initialValue}
        onPress={() => setShowModal(true)}
      />

      <BottomSheet
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Edit League Size"
        size="sm"
        iconRight="Check"
        onIconRightPress={handleConfirm}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        <LeagueSizePicker setNewSize={setNewSize} initialValue={initialValue} />
      </BottomSheet>
    </>
  );
};

export default LeagueSize;
