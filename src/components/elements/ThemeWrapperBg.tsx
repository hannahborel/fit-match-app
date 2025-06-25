import { View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

const ThemeWrapperBg = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {children}
    </View>
  );
};

export default ThemeWrapperBg;
