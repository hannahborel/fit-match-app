import { ScrollView, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const BgView = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
        {children}
      </View>
    </ScrollView>
  );
};

export default BgView;
