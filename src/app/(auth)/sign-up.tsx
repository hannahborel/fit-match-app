import React from 'react';
import { Button, TextInput, View, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { Stack } from 'expo-router';
import StyledInput from '../../components/StyledInput';

const signUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, gap: 16 }}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <StyledInput
            autoCapitalize="none"
            placeholder="simon@galaxies.dev"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <StyledInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button onPress={onSignUpPress} title="Sign up"></Button>
        </>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput value={code} placeholder="Code..." onChangeText={setCode} />
          </View>
          <Button onPress={onPressVerify} title="Verify Email"></Button>
        </>
      )}
    </View>
  );
};

export default signUp;
