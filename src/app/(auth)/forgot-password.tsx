// src/app/(auth)/forgot-password.tsx
import { useState } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Text, useTheme } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputPrimary from '@/components/elements/InputPrimary';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import Logo from '@/assets/Logo';
import { isEmailValid } from '@/helpers/validationHandlers';

export default function ForgotPassword() {
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const { emailParam } = useLocalSearchParams<{ emailParam?: string }>();
  const [email, setEmail] = useState(emailParam || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onRequestReset = async () => {
    if (!isLoaded || !signIn) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      // If successful, navigate to the reset password screen
      if (result.status === 'needs_first_factor') {
        router.push('/reset-password');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(
          err.message || 'An error occurred while sending the reset code',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
      }}
    >
      <View style={{ width: 300, alignSelf: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Logo />
        </View>
        <Text
          style={{
            color: theme.colors.onBackground,
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Enter your email address and we'll send you a code to reset your
          password.
        </Text>
        {error && (
          <Text
            style={{
              color: theme.colors.error,
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            {error}
          </Text>
        )}
        <View style={{ gap: 8 }}>
          <InputPrimary
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(null);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            error={!!error}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <ButtonPrimary
            onPress={onRequestReset}
            loading={loading}
            disabled={!isEmailValid(email) || loading}
          >
            <Text style={{ color: theme.colors.onPrimary }}>
              SEND RESET CODE
            </Text>
          </ButtonPrimary>
        </View>
        <Pressable
          onPress={() => router.push('/login-email')}
          style={{ marginTop: 16, alignItems: 'center' }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: theme.colors.onBackground }}>
              Remember your password?{' '}
            </Text>
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
}
