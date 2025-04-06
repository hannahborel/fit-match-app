import React from 'react';
import { View, Text as RNText } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useSignUp, useAuth } from '@clerk/clerk-expo';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import StyledInput from '../../components/library/InputPrimary';
import ButtonPrimary from '../../components/library/ButtonPrimary';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPhoneNumberInput } from '../../utils/formatPhoneNumberInput';

const capitalizeName = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const signUp = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { signUp, setActive } = useSignUp();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/leagueEntry');
    }
  }, [isLoaded, isSignedIn]);

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumberInput(text);
    setPhoneNumber(formatted);
    setError(null);
  };

  // Create the user and send the verification
  const onSignUpPress = async () => {
    if (!isLoaded || !signUp) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      console.log('Starting sign up process...');
      // Remove hyphens before sending to Clerk
      const cleanPhoneNumber = phoneNumber.replace(/-/g, '');
      // Capitalize first and last names
      const capitalizedFirstName = capitalizeName(firstName);
      const capitalizedLastName = capitalizeName(lastName);
      // Create the user on Clerk
      const result = await signUp.create({
        password,
        firstName: capitalizedFirstName,
        lastName: capitalizedLastName,
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
      setError(err.errors?.[0]?.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded || !signUp) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.errors?.[0]?.message || 'An error occurred during verification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: 300, alignSelf: 'center' }}>
        {error && (
          <Text style={{ color: theme.colors.error, textAlign: 'center', marginBottom: 16 }}>
            {error}
          </Text>
        )}
        {!pendingVerification ? (
          <>
            <View style={{ gap: 16 }}>
              <StyledInput
                autoCapitalize="none"
                placeholder="First Name"
                value={firstName}
                onChangeText={text => {
                  setFirstName(text);
                  setError(null);
                }}
                error={!!error}
              />
              <StyledInput
                autoCapitalize="none"
                placeholder="Last Name"
                value={lastName}
                onChangeText={text => {
                  setLastName(text);
                  setError(null);
                }}
                error={!!error}
              />

              <StyledInput
                autoCapitalize="none"
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad"
                maxLength={12} // 10 digits + 2 hyphens
                error={!!error}
              />
              <StyledInput
                autoCapitalize="none"
                placeholder="Password"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setError(null);
                }}
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
                error={!!error}
              />
            </View>
            <View style={{ marginTop: 24 }}>
              <ButtonPrimary onPress={onSignUpPress} loading={loading} disabled={loading}>
                SIGN UP
              </ButtonPrimary>
            </View>
          </>
        ) : (
          <>
            <View style={{ gap: 16 }}>
              <StyledInput
                autoCapitalize="none"
                placeholder="Verification Code"
                value={code}
                onChangeText={text => {
                  setCode(text);
                  setError(null);
                }}
                keyboardType="number-pad"
                error={!!error}
              />
            </View>
            <View style={{ marginTop: 24 }}>
              <ButtonPrimary onPress={onPressVerify} loading={loading} disabled={loading}>
                VERIFY
              </ButtonPrimary>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default signUp;
