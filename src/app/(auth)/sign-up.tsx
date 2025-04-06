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
import { formatPhoneNumberInput } from '../../utils/formatPhoneNumberInput';

const signUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumberInput(text);
    setPhoneNumber(formatted);
  };

  // Create the user and send the verification
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      console.log('Starting sign up process...');
      // Remove hyphens before sending to Clerk
      const cleanPhoneNumber = phoneNumber.replace(/-/g, '');
      // Create the user on Clerk
      const result = await signUp.create({
        password,
        firstName,
        lastName,
        phoneNumber: cleanPhoneNumber,
      });
      console.log('Sign up result:', result);

      // Send phone verification
      await signUp.preparePhoneNumberVerification({ strategy: 'phone_code' });
      console.log('Verification code sent');

      // change the UI to verify the phone number
      setPendingVerification(true);
    } catch (err: any) {
      console.error('Sign up error:', err);
      Alert.alert(
        'Sign Up Error',
        err.errors?.[0]?.message || 'An error occurred during sign up. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify the phone number
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      console.log('Starting verification process...');
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code,
      });

      console.log('Verification result:', completeSignUp);

      if (completeSignUp.status === 'complete') {
        console.log('Setting active session...');
        await setActive({ session: completeSignUp.createdSessionId });
        console.log('Redirecting to league entry...');
        router.replace('/leagueEntry');
      } else {
        console.log('Verification not complete:', completeSignUp.status);
        Alert.alert('Verification Error', 'Verification process did not complete successfully.');
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      Alert.alert(
        'Verification Error',
        err.errors?.[0]?.message || 'An error occurred during verification. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
      <View style={{ width: 300, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, color: 'white', marginBottom: 24 }}>CREATE ACCOUNT</Text>
        <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
        <Spinner visible={loading} />
        {!pendingVerification && (
          <>
            <View style={{ gap: 16 }}>
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
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
                maxLength={12} // 10 digits + 2 hyphens
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 36,
                }}
              >
                <ButtonPrimary onPress={onSignUpPress}>CREATE ACCOUNT</ButtonPrimary>
              </View>
              <Pressable
                onPress={() => router.push('/login')}
                style={{ marginTop: 16, alignItems: 'center' }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: theme.colors.onBackground }}>
                    Already have an account?{' '}
                  </Text>
                  <RNText style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>
                    Log In
                  </RNText>
                </View>
              </Pressable>
            </View>
          </>
        )}

        {pendingVerification && (
          <>
            <View style={{ gap: 16 }}>
              <Text style={{ fontSize: 16, color: 'white', marginBottom: 24 }}>VERIFY PHONE</Text>
              <StyledInput
                value={code}
                placeholder="Enter phone verification code"
                onChangeText={setCode}
                keyboardType="number-pad"
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 36,
                }}
              >
                <ButtonPrimary onPress={onPressVerify}>VERIFY</ButtonPrimary>
              </View>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default signUp;
