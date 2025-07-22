import { useSignUp } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text as RNText, View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonPrimary from '../../components/elements/ButtonPrimary';
import StyledInput from '../../components/elements/InputPrimary';

import PasswordVerification from '@/components/elements/PasswordVerification';
import { isEmailValid, isPasswordValid } from '@/helpers/validationHandlers';
import { useLocalSearchParams } from 'expo-router';

const signUp = () => {
  const theme = useTheme();
  const { emailParam } = useLocalSearchParams();

  const { isLoaded, signUp } = useSignUp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(emailParam as string);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const disableSignUp =
    !firstName ||
    !lastName ||
    !isEmailValid(email) ||
    !isPasswordValid(password);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareVerification({ strategy: 'email_code' });
      router.push('/verify-email');
    } catch (err) {
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return console.log;
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: 300, alignSelf: 'center' }}>
        <View style={{ gap: 12 }}>
          <StyledInput
            autoCapitalize="words"
            placeholder="First"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />
          <StyledInput
            autoCapitalize="words"
            placeholder="Last"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
            }}
          />

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
            onChangeText={(text) => {
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
          <ButtonPrimary
            onPress={onSignUpPress}
            disabled={disableSignUp}
            loading={loading}
          >
            <Text>SIGN UP</Text>
          </ButtonPrimary>
        </View>
        <Pressable
          onPress={() => router.push('/login-email')}
          style={{ marginTop: 16, alignItems: 'center' }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text>Already have an account? </Text>
            <RNText
              style={{
                color: theme.colors.primary,
                textDecorationLine: 'underline',
              }}
            >
              <Text>Sign In</Text>
            </RNText>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default signUp;
