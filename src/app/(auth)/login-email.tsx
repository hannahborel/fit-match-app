import Logo from '@/assets/Logo';
import InputPrimary from '@/components/elements/InputPrimary';
import { isEmailValid } from '@/helpers/validationHandlers';
import { useSignIn, useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Divider, Text } from 'react-native-paper';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import LoginPassword from './login-password';
import * as AuthSession from 'expo-auth-session';

export default function Login() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { startSSOFlow } = useSSO();

  const isValidEmail = isEmailValid(email);

  const handleContinue = async () => {
    if (signIn) {
      try {
        const emailCheck = await signIn.create({
          identifier: email,
        });
        console.log(
          'After create call - emailCheck status:',
          emailCheck.status,
        );

        if (emailCheck.status === 'needs_first_factor') {
          //has account, needs to enter password
          setShowPassword(true);
        }
      } catch (err) {
        if (err) {
          console.log(err);
          setError('Clerk Could not Find the user by email');
          // Clerk could not find the user by email.
          router.push({
            pathname: '/sign-up',
            params: { emailParam: email },
          });
        }
        console.error('Unexpected error:', error);
        return false;
      }
    }
  };
  const handleSSO = async (strategy: string) => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: 'oauth_google',
          redirectUrl: AuthSession.makeRedirectUri(),
        });
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push('/');
      } else {
        console.log('signIn: ', signIn, signIn?.status);

        console.log('sign up', signUp, signUp?.missingFields);
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
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
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
            right={
              !showPassword && (
                <TextInput.Icon
                  color={
                    isValidEmail
                      ? theme.colors.primary
                      : theme.colors.surfaceDisabled
                  }
                  icon="arrow-right-circle"
                  onPress={handleContinue}
                  disabled={!isValidEmail}
                />
              )
            }
          />
          {showPassword && <LoginPassword email={email} />}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Divider
              bold
              style={{
                backgroundColor: theme.colors.outline,
                width: '40%',
              }}
            />

            <Text>or</Text>

            <Divider
              bold
              style={{
                backgroundColor: theme.colors.outline,
                width: '40%',
              }}
            />
          </View>
          <View>
            <Button
              icon="google"
              mode="outlined"
              onPress={() => handleSSO('oauth_google')}
              style={{ borderRadius: 12 }}
            >
              Continue with Google
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
