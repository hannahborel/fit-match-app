// src/app/(auth)/reset-password.tsx
import { useState } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputPrimary from '@/components/elements/InputPrimary';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import Logo from '@/assets/Logo';

export default function ResetPassword() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const onVerifyCode = () => {
    // Basic validation - just check if code is entered
    if (!code || code.length < 6) {
      setError('Please enter a valid 6-digit verification code');
      return;
    }
    setError(null);
    setIsCodeVerified(true);
  };

  const onResetPassword = async () => {
    if (!isLoaded || !signIn) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/');
      } else {
        setError('An unexpected issue occurred. Please try again.');
      }
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to reset password');
      }
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
          {!isCodeVerified ? (
            <InputPrimary
              label="Verification Code"
              value={code}
              onChangeText={(text) => {
                setCode(text);
                setError(null);
              }}
              keyboardType="number-pad"
              error={!!error}
            />
          ) : (
            <InputPrimary
              label="New Password"
              value={newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
                setError(null);
              }}
              secureTextEntry={!showPassword}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
              error={!!error}
            />
          )}
        </View>
        <View style={{ marginTop: 24 }}>
          {!isCodeVerified ? (
            <ButtonPrimary
              onPress={onVerifyCode}
              loading={loading}
              disabled={!code || loading}
            >
              <Text style={{ color: theme.colors.onPrimary }}>VERIFY</Text>
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              onPress={onResetPassword}
              loading={loading}
              disabled={!newPassword || loading}
            >
              <Text style={{ color: theme.colors.onPrimary }}>
                RESET PASSWORD
              </Text>
            </ButtonPrimary>
          )}
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
