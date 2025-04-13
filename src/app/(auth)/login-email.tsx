import { useState, useEffect } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn, useAuth } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/library/InputPrimary';
import { isEmailValid } from '@/utils/validationHandlers';
import Logo from '@/assets/Logo';

export default function Login() {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState('');

  const isValidEmail = isEmailValid(email);

  const handleContinue = async () => {
    if (signIn) {
      try {
        const emailCheck = await signIn.create({
          identifier: email,
        });
        console.log('After create call - emailCheck status:', emailCheck.status);

        if (emailCheck.status === 'needs_first_factor') {
          //has account, needs to enter password
          router.push({ pathname: '/login-password', params: { emailParam: email } });
        }
      } catch (err: any) {
        console.log(err);
        // Check for the specific error message for non-existent account
        if (err.message === "Couldn't find your account.") {
          console.log('user does not have an account');
          router.push({ pathname: '/sign-up', params: { emailParam: email } });
        }
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: 300, alignSelf: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Logo />
        </View>
        <View style={{ gap: 8 }}>
          <InputPrimary
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
            right={
              <TextInput.Icon
                color={isValidEmail ? theme.colors.primary : theme.colors.surfaceDisabled}
                icon="arrow-right-circle"
                onPress={handleContinue}
                disabled={!isValidEmail}
              />
            }
          />
        </View>
      </View>
    </View>
  );
}
