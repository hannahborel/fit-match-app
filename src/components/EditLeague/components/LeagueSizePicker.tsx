import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { View } from 'react-native';

type LeagueSizePickerProps = {
  setNewSize: (size: number) => void;
  initialValue: number;
};

const LeagueSizePicker = ({
  setNewSize,
  initialValue,
}: LeagueSizePickerProps) => {
  const [pickerValue, setPickerValue] = useState(initialValue);

  const handleValueChange = (itemValue: number) => {
    setPickerValue(itemValue);
    setNewSize(itemValue);
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
      {[...Array(20)].map((_, i) => {
        const value = i + 2; // minimum size = 2
        return <Picker.Item key={value} label={`${value}`} value={value} />;
      })}
    </Picker>
  );
};

export default LeagueSizePicker;
