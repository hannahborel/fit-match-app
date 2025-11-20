import React, { useState } from 'react';
import LeagueSizePicker from '../EditLeague/components/LeagueSizePicker';
import BottomSheet from '../elements/BottomSheet';
import SettingsRow from './SettingsRow';

type LeagueSizeProps = {
  leagueId: string;
  leagueSize: number;
  onValueChange?: (newSize: number) => void;
  disabled?: boolean;
};

const LeagueSize = ({ leagueId, leagueSize, onValueChange, disabled = false }: LeagueSizeProps) => {
  const [newSize, setNewSize] = useState(leagueSize);
  const [showModal, setShowModal] = useState(false);
  const [initialValue, setInitialValue] = useState(leagueSize);

  const handleConfirm = () => {
    if (showModal) {
      // Picker is closing - check if value changed
      if (newSize !== initialValue) {
        setInitialValue(newSize);
        // Notify parent of change instead of updating immediately
        onValueChange?.(newSize);
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
        onPress={disabled ? undefined : () => setShowModal(true)}
        disabled={disabled}
      />

      {!disabled && (
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
      )}
    </>
  );
};

export default LeagueSize;
