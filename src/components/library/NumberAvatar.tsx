import * as React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, useTheme } from 'react-native-paper';

interface NumberAvatarProps {
  start: number;
  end: number;
  step?: number;
  size?: number;
  onSelect?: (number: number) => void;
}

const NumberAvatar: React.FC<NumberAvatarProps> = ({
  start,
  end,
  step = 2,
  size = 45,
  onSelect,
}) => {
  const theme = useTheme();
  const numbers = Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
        {numbers.map(num => (
          <TouchableOpacity key={num} onPress={() => onSelect?.(num)}>
            <Avatar.Text
              style={{ backgroundColor: theme.colors.surface }}
              size={size}
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
