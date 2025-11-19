import React, { useState } from 'react';
import LeagueDurationPicker from '../EditLeague/components/LeagueDurationPicker';
import BottomSheet from '../elements/BottomSheet';
import SettingsRow from './SettingsRow';

type LeagueDurationProps = {
  leagueId: string;
  weeks: number;
  onValueChange?: (newWeeks: number) => void;
};

const LeagueDuration = ({ leagueId, weeks, onValueChange }: LeagueDurationProps) => {
  const [newWeeks, setNewWeeks] = useState(weeks);
  const [showModal, setShowModal] = useState(false);
  const [initialValue, setInitialValue] = useState(weeks);

  const handleConfirm = () => {
    if (showModal) {
      // Picker is closing - check if value changed
      if (newWeeks !== initialValue) {
        setInitialValue(newWeeks);
        // Notify parent of change instead of updating immediately
        onValueChange?.(newWeeks);
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
