import * as React from 'react';
import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

interface NumberAvatarProps {
  start: number;
  end: number;
  step: number;
  setValue: (value: number) => void;
}

const NumberAvatar: React.FC<NumberAvatarProps> = ({
  start,
  end,
  step = 2,
  setValue,
}) => {
  const theme = useTheme();
  const numbers = Array.from(
    { length: (end - start) / step + 1 },
    (_, i) => start + i * step,
  );

  const [selectedNumber, setSelectedNumber] = useState(0);
  const handleSelect = (number: number) => {
    setSelectedNumber(number);
    setValue(number);
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
        {numbers.map((num) => (
          <TouchableOpacity key={num} onPress={() => handleSelect(num)}>
            <Avatar.Text
              style={{
                backgroundColor:
                  num == selectedNumber
                    ? theme.colors.primary
                    : theme.colors.surface,
              }}
              size={45}
              label={num.toString()}
              labelStyle={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default NumberAvatar;
