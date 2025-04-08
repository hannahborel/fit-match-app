import InputPrimary from '@/components/library/InputPrimary';
import React from 'react';
import { View, Text } from 'react-native';

const LoginPassword = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <InputPrimary label="Password" />
    </View>
  );
};

export default LoginPassword;
