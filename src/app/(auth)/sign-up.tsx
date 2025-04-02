import React from 'react';
import { Button, View, Alert, Text, Pressable, Text as RNText } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { router, Stack } from 'expo-router';
import StyledInput from '../../components/library/InputPrimary';
import ButtonPrimary from '../../components/library/ButtonPrimary';
import { SafeAreaView } from 'react-native-safe-area-context';

const signUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
 
      <View style={{ flex: 1, justifyContent:'center', alignItems:'center', gap: 16}}>
        <View style={{width: 300,  justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontSize: 16, color: 'white', marginBottom: 24}}>CREATE ACCOUNT</Text>
        <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
        <Spinner visible={loading} />
        {!pendingVerification && (
          <>
          <View style={{gap: 16}}>
            <StyledInput
              autoCapitalize="none"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <StyledInput
              autoCapitalize="none"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
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
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
 </View>
 <View>
 <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 36}}>
            <ButtonPrimary  onPress={onSignUpPress} >CREATE ACCOUNT</ButtonPrimary>
           </View>
             <Pressable onPress={() => router.push('/login')} style={{ marginTop: 16, alignItems: 'center' }}>
             <View style={{ flexDirection: 'row' }}>
               <Text style={{ color: theme .colors.onBackground }}>Already have an account? </Text>
               <RNText style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>Log In</RNText>
             </View>
           </Pressable>
           </View>
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
      </View>
 
  );
};

export default signUp;
