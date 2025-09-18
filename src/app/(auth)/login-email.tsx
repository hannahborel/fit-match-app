import Logo from '@/assets/Logo';
import InputPrimary from '@/components/elements/InputPrimary';
import { isEmailValid } from '@/helpers/validationHandlers';
import { useSignIn, useSSO } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Divider, Text } from 'react-native-paper';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginPassword from '@/components/auth/login-password';
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

        return false;
      }
    }
  };
  const handleSSO = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
        redirectUrl: AuthSession.makeRedirectUri(),
      });

      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        // Don't manually navigate - let the auth state change trigger navigation
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
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

              <Text style={{ color: theme.colors.onBackground }}>or</Text>

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
                onPress={() => handleSSO()}
                style={{ borderRadius: 12 }}
              >
                Continue with Google
              </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
