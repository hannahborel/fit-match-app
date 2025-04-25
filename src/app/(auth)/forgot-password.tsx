import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/library/InputPrimary';
import ButtonPrimary from '@/components/library/ButtonPrimary';
import { useLocalSearchParams } from 'expo-router';
import { isEmailValid, isPasswordValid } from '@/utils/validationHandlers';
import PasswordVerification from '@/components/library/PasswordVerification';
import { handleLogout } from '@/utils/helpers';
export default function ForgotPassword() {
  const { email } = useLocalSearchParams();
  //trim code before sending

  const [emailInput, setEmailInput] = useState(email as string);
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');
  const { signOut } = useAuth();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  // Send the password reset code to the user's email
  async function create(e: any) {
    e.preventDefault();
    if (signIn?.status === 'needs_identifier') {
      console.log('it looks like this email does not have an account');
      return;
    }
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: emailInput,
      })
      .then(_ => {
        setSuccessfulCreation(true);
        setError('');
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: any) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then(result => {
        // Check if 2FA is required
        if (result.status === 'complete') {
          //need a page here to be like 'your password has been reset, lets login
          handleLogout(router, signOut);
          setError('');
          router.push('/login-email');
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {!successfulCreation && (
          <View style={{ gap: 16 }}>
            <InputPrimary
              label="Email"
              keyboardType="email-address"
              value={emailInput}
              placeholder="e.g +1234567890"
              onChangeText={text => setEmailInput(text)}
            />

            <ButtonPrimary disabled={!isEmailValid(emailInput)} onPress={create}>
              Send password reset code
            </ButtonPrimary>
            {error && <p>{error}</p>}
          </View>
        )}

        {successfulCreation && (
          <View style={{ gap: 16, width: 300 }}>
            <Text>Enter the password reset code that was sent to your phone number</Text>
            <InputPrimary label="Email Code" value={code} onChangeText={text => setCode(text)} />
            <InputPrimary
              label="New Password"
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <PasswordVerification password={password} />

            <ButtonPrimary disabled={!isPasswordValid(password)} onPress={reset}>
              Reset
            </ButtonPrimary>
            {error && <Text>{error}</Text>}
          </View>
        )}

        {secondFactor && <Text>2FA is required, but this UI does not handle that</Text>}
      </View>
    </View>
  );
}
