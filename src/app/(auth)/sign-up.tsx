import React from 'react';
import { View, Text as RNText, Pressable } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useSignUp, useAuth } from '@clerk/clerk-expo';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import StyledInput from '../../components/library/InputPrimary';
import ButtonPrimary from '../../components/library/ButtonPrimary';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocalSearchParams } from 'expo-router';
import PasswordVerification from '@/components/library/PasswordVerification';
import { isPasswordValid, validateEmail } from '@/utils/validationHandlers';

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
  const [isValidEmail, setIsValidEmail] = useState(true);

  const disableSignUp = firstName === '' || lastName === '' || emailInput === '' || !isValidEmail;
  password === '' || !isPasswordValid(password);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/leagueEntry');
    }
  }, [isLoaded, isSignedIn]);

  // Create the user and send the verification
  const onSignUpPress = async () => {
    console.log('onSignUpPress hit');
    if (!isLoaded || !signUp) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const result = await signUp.create({
        password,
        firstName,
        lastName,
        emailAddress: emailInput,
      });
      console.log(result);
      console.log('--prepare verification---');
      await signUp.prepareVerification({ strategy: 'email_link' });
      setPendingVerification(true);
    } catch (err: any) {
      console.log('--error--');
      console.log(err.errors?.[0].message);
    } finally {
      console.log('--Finally--');
      //redirect to league entry if league status is false
      //redir4ect to home page if league status is true
    }
  };

  const handleEmailChange = (text: string) => {
    setEmailInput(text);
    setError(null);
    setIsValidEmail(validateEmail(text));
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
                  autoCapitalize="words"
                  placeholder="First"
                  value={firstName}
                  onChangeText={text => {
                    setFirstName(text);
                    setError(null);
                  }}
                />
                <StyledInput
                  autoCapitalize="words"
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
                onChangeText={handleEmailChange}
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
