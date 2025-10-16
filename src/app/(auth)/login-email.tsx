// src/app/(auth)/login-email.tsx
import Logo from '@/assets/Logo';
import InputPrimary from '@/components/elements/InputPrimary';
import { isEmailValid } from '@/helpers/validationHandlers';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Divider, Text } from 'react-native-paper';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginPassword from '@/components/auth/login-password';
import { cacheAuthState } from '@/lib/authCache';

export default function Login() {
  const { signIn } = useSignIn();
  const { userId } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = isEmailValid(email);

  const handleContinue = async () => {
    if (signIn) {
      try {
        const emailCheck = await signIn.create({
          identifier: email,
        });

        if (emailCheck.status === 'needs_first_factor') {
          // Has account, needs to enter password
          setShowPassword(true);
        }
      } catch (err) {
        if (err) {
          console.log(err);
          setError('Could not find user with this email');
          // Clerk could not find the user by email - go to signup
          router.push({
            pathname: '/sign-up',
            params: { emailParam: email },
          });
        }
        return false;
      }
    }
  };

  /**
   * Called by LoginPassword component after successful login
   */
  const handleLoginSuccess = async () => {
    // Cache auth state immediately

    if (userId) {
      await cacheAuthState({
        isSignedIn: true,
        userId: userId,
      });
    } else {
      throw new Error('User not found');
    }

    // Navigate to root - index.tsx will handle the rest
    router.replace('/');
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
                        : theme.colors.onBackground
                    }
                    icon="check"
                  />
                )
              }
            />
            {showPassword && (
              <LoginPassword
                email={email}
                onLoginSuccess={handleLoginSuccess}
              />
            )}
          </View>
          {!showPassword && (
            <View style={{ marginTop: 24 }}>
              <Button
                mode="contained"
                onPress={handleContinue}
                disabled={!isValidEmail}
              >
                Continue
              </Button>
            </View>
          )}
          {error && (
            <Text style={{ color: theme.colors.error, marginTop: 8 }}>
              {error}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
