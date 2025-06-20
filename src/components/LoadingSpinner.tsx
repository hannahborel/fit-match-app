import React from 'react';
import { Dimensions, View } from 'react-native';
import { Text } from 'react-native-paper';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = () => {
  const { width, height } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View
        style={{ height: height, width: width, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text> Loading</Text>
      </View>
    </View>
  );
};

export default LoadingSpinner;
