import ButtonPrimary from '@/components/elements/ButtonPrimary';
import InputPrimary from '@/components/elements/InputPrimary';

import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { isPasswordValid } from '@/helpers/validationHandlers';
import { useSignIn } from '@clerk/clerk-expo';
import theme from '@/theme';

type LoginPasswordProps = {
  email: string;
};
const LoginPassword = ({ email }: LoginPasswordProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [, setLoading] = useState(false);

  const handleSignIn = async () => {
    console.log('handleSignIn hit');
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });
      if (signInAttempt.status === 'complete') {
        console.log('signInStatus complete');
        await setActive({ session: signInAttempt.createdSessionId });
        // TODO: Add navigation logic here
      }
    } catch (err) {
      if (err instanceof ReferenceError) {
        console.log(err);
        Alert.alert('Password is incorrect');
      }
    }
  };

  return (
    <View style={{ width: 300 }}>
      <InputPrimary
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <View style={{ alignSelf: 'flex-end' }}>
        <Pressable
          onPress={() => {
            // TODO: Add forgot password navigation logic
          }}
          style={{ alignSelf: 'flex-end', marginTop: 8 }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              textDecorationLine: 'underline',
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 24 }}>
        <ButtonPrimary
          onPress={handleSignIn}
          disabled={!isPasswordValid(password)}
        >
          <Text>SIGN IN</Text>
        </ButtonPrimary>
      </View>
    </View>
  );
};

export default LoginPassword;
