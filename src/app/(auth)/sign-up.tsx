import React from 'react';
import { View, Text as RNText, Pressable, Alert } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useSignUp, useAuth } from '@clerk/clerk-expo';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import StyledInput from '../../components/library/InputPrimary';
import ButtonPrimary from '../../components/library/ButtonPrimary';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLocalSearchParams } from 'expo-router';
import PasswordVerification from '@/components/library/PasswordVerification';
import { isPasswordValid, isEmailValid } from '@/helpers/validationHandlers';
import LoadingSpinner from '@/components/LoadingSpinner';

const signUp = () => {
  const theme = useTheme();
  const { emailParam } = useLocalSearchParams();

  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(emailParam as string);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const disableSignUp =
    !firstName || !lastName || !isEmailValid(email) || !isPasswordValid(password);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    console.log('onSignUpPress');
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      console.log('signUp', signUp);

      await signUp.prepareVerification({ strategy: 'email_code' });
      router.push('/verify-email');
    } catch (err: any) {
      console.log(err);
      console.log(err.errors[0].message);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: 300, alignSelf: 'center' }}>
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
            <StyledInput
              autoCapitalize="words"
              placeholder="First"
              value={firstName}
              onChangeText={text => {
                setFirstName(text);
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
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <StyledInput
            autoCapitalize="none"
            placeholder="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
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
          <ButtonPrimary onPress={onSignUpPress} disabled={disableSignUp} loading={loading}>
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
      </View>
    </SafeAreaView>
  );
};

export default signUp;
