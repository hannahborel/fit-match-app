import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
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
        <LottieView
          source={require('../../assets/animations/loading.json')}
          autoPlay
          loop
          style={{ width: size, height: size }}
          onAnimationFinish={() => console.log('Animation finished')}
          onAnimationFailure={error => console.error('Animation failed:', error)}
          onLayout={() => console.log('Animation layout')}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default LoadingSpinner;
