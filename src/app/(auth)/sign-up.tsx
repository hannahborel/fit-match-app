import React from 'react';
import { View, Text as RNText, Pressable } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useSignUp, useAuth } from '@clerk/clerk-expo';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import StyledInput from '../../components/library/InputPrimary';
import ButtonPrimary from '../../components/library/ButtonPrimary';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatPhoneNumberInput } from '../../utils/formatPhoneNumberInput';
import { useLocalSearchParams } from 'expo-router';
import PasswordVerification from '@/components/library/PasswordVerification';
import { isPasswordValid } from '@/utils/validationHandlers';

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
  const { email } = useLocalSearchParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailInput, setEmailInput] = useState(email as string);
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const disableSignUp =
    firstName === '' ||
    lastName === '' ||
    emailInput === '' ||
    password === '' ||
    !isPasswordValid(password);
  console.log(disableSignUp);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/leagueEntry');
    }
  }, [isLoaded, isSignedIn]);

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

      // Capitalize first and last names
      const capitalizedFirstName = capitalizeName(firstName);
      const capitalizedLastName = capitalizeName(lastName);
      // Create the user on Clerk
      const result = await signUp.create({
        password,
        firstName: capitalizedFirstName,
        lastName: capitalizedLastName,
        // emailAddress: email,
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
            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
                <StyledInput
                  autoCapitalize="none"
                  placeholder="First"
                  value={firstName}
                  onChangeText={text => {
                    setFirstName(text);
                    setError(null);
                  }}
                />
                <StyledInput
                  autoCapitalize="none"
                  placeholder="Last"
                  value={lastName}
                  onChangeText={text => {
                    setLastName(text);
                  }}
                />
              </View>
              <StyledInput
                autoCapitalize="none"
                placeholder="Email"
                value={emailInput}
                // onChangeText={handlePhoneNumberChange}
                keyboardType="phone-pad" // 10 digits + 2 hyphens
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
              />
              <PasswordVerification password={password} />
            </View>
            <View style={{ marginTop: 24 }}>
              <ButtonPrimary
                onPress={onSignUpPress}
                buttonColor={disableSignUp ? theme.colors.surfaceDisabled : theme.colors.primary}
                loading={loading}
                disabled={loading || disableSignUp}
              >
                SIGN UP
              </ButtonPrimary>
            </View>
            <Pressable
              onPress={() => router.push('/login-email')}
              style={{ marginTop: 16, alignItems: 'center' }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text>Already have an account? </Text>
                <RNText style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>
                  Sign In
                </RNText>
              </View>
            </Pressable>
          </>
        ) : (
          <>
            <View>
              <Text>Pending Verification</Text>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default signUp;
