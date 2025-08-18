import { ScrollView, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

type BgViewProps = {
  padding?: number;
  children: React.ReactNode;
};
const BgView = ({ padding, children }: BgViewProps) => {
  const theme = useTheme();

  const paddingHorOverrride = padding ? padding : 16;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: paddingHorOverrride,
          paddingVertical: 8,
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </ScrollView>
  );
};

export default BgView;
