import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { useTheme } from 'react-native-paper';
interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 150 }) => {
  const { width, height } = Dimensions.get('window');
  const theme = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View
        style={{ height: height, width: width, justifyContent: 'center', alignItems: 'center' }}
      >
     Loading
      </View>
    </View>
  );
};

export default LoadingSpinner;
