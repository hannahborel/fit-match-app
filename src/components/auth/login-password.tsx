// src/components/auth/login-password.tsx
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/elements/InputPrimary';
import ButtonPrimary from '@/components/elements/ButtonPrimary';

interface LoginPasswordProps {
  email: string;
  onLoginSuccess: () => Promise<void>;
}

export default function LoginPassword({
  email,
  onLoginSuccess,
}: LoginPasswordProps) {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!signIn) return;

    setLoading(true);
    setError(null);

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'password',
        password: password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });

        // ✅ Call success callback - parent will handle cache and navigation
        await onLoginSuccess();
      } else {
        setError('Login incomplete. Please try again.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      console.error('Full error object:', JSON.stringify(err, null, 2));

      // Get the actual error message from Clerk
      const errorMessage = err?.errors?.[0]?.longMessage ||
                          err?.errors?.[0]?.message ||
                          err?.message ||
                          'Unable to log in. Please try again.';

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ gap: 8 }}>
      <InputPrimary
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      {error && (
        <Text style={{ color: theme.colors.error, fontSize: 12 }}>{error}</Text>
      )}

      <View style={{ alignSelf: 'flex-end' }}>
        <Pressable
          onPress={() => router.push({
            pathname: '/forgot-password',
            params: { emailParam: email },
          })}
          style={{ alignSelf: 'flex-end', marginTop: 8 }}
        >
          <Text
            style={{
              color: theme.colors.primary,
              textDecorationLine: 'underline',
            }}
          >
            Forgot Password?
          </Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 16 }}>
        <ButtonPrimary
          onPress={handleLogin}
          disabled={!password || loading}
          loading={loading}
        >
          <Text style={{ color: theme.colors.onPrimary }}>
            {loading ? 'Logging in...' : 'LOG IN'}
          </Text>
        </ButtonPrimary>
      </View>
    </View>
  );
}
