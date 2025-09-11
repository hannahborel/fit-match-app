import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text
        style={{
          marginTop: 16,
          fontSize: 16,
          color: theme.colors.onBackground,
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default LoadingScreen;
