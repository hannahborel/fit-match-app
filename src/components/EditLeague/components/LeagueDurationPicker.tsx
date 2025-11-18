import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { View } from 'react-native';

type LeagueDurationPickerProps = {
  setNewWeeks: (weeks: number) => void;
  initialValue: number;
};

const LeagueDurationPicker = ({
  setNewWeeks,
  initialValue,
}: LeagueDurationPickerProps) => {
  const [pickerValue, setPickerValue] = useState(initialValue);

  const handleValueChange = (itemValue: number) => {
    setPickerValue(itemValue);
    setNewWeeks(itemValue);
  };

  return (
    <Picker
      itemStyle={{
        fontSize: 18,
        height: 150,
      }}
      selectedValue={pickerValue}
      onValueChange={handleValueChange}
      style={{
        borderRadius: 4,
      }}
    >
      {[4, 8, 12, 16].map((value) => (
        <Picker.Item key={value} label={`${value} weeks`} value={value} />
      ))}
    </Picker>
  );
};

export default LeagueDurationPicker;
