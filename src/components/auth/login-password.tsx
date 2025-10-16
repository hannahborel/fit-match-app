// src/components/auth/login-password.tsx
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/elements/InputPrimary';

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

        // Call success callback - parent will get userId from useAuth()
        await onLoginSuccess();
      } else {
        setError('Login incomplete. Please try again.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err?.errors?.[0]?.message || 'Invalid password');
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

      <Button
        mode="contained"
        onPress={handleLogin}
        disabled={!password || loading}
        loading={loading}
        style={{ marginTop: 8 }}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </Button>

      <Button
        mode="text"
        onPress={() => router.push('/forgot-password')}
        style={{ marginTop: 4 }}
      >
        Forgot password?
      </Button>
    </View>
  );
}
