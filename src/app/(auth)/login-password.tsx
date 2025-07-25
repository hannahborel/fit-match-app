import ButtonPrimary from '@/components/elements/ButtonPrimary';
import InputPrimary from '@/components/elements/InputPrimary';

import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { isPasswordValid } from '@/helpers/validationHandlers';
import { useSignIn } from '@clerk/clerk-expo';
import theme from '@/theme';

const LoginPassword = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const [, setLoading] = useState(false);

  const { emailParam } = useLocalSearchParams();

  const handleSignIn = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailParam as string,
        password,
      });
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        router.replace('/');
      }
    } catch (err) {
      if (err instanceof ReferenceError) {
        console.log(err);
        Alert.alert('Password is incorrect');
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            onPress={() =>
              router.push({
                pathname: '/forgot-password',
                params: { email: emailParam as string },
              })
            }
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
    </View>
  );
};

export default LoginPassword;
