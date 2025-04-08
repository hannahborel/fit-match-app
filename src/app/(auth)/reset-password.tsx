import { useState } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/library/InputPrimary';
import ButtonPrimary from '@/components/library/ButtonPrimary';
import Logo from '@/components/Logo';

export default function ResetPassword() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onResetPassword = async () => {
    if (!isLoaded || !signIn) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_phone_code',
        code,
        password: newPassword,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/');
      } else {
        console.log('Unexpected status:', result.status);
        setError('An unexpected issue occurred. Please try again.');
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      console.error('Error resetting password:', JSON.stringify(err, null, 2));

      if (err.errors && err.errors[0]) {
        const errorCode = err.errors[0].code;
        if (errorCode === 'form_password_pwned') {
          setError(
            'This password is too common or has been exposed in a data breach. Please choose a stronger, unique password.'
          );
        } else if (errorCode === 'form_code_incorrect') {
          setError('The reset code is incorrect. Please check your SMS and try again.');
        } else if (errorCode === 'form_password_invalid') {
          setError('Password does not meet the requirements. Please ensure it is strong enough.');
        } else {
          setError(err.errors[0].longMessage || 'An error occurred. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: 300, alignSelf: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Logo />
        </View>
        {error && (
          <Text style={{ color: theme.colors.error, textAlign: 'center', marginBottom: 16 }}>
            {error}
          </Text>
        )}
        <View style={{ gap: 8 }}>
          <InputPrimary
            label="Verification Code"
            value={code}
            onChangeText={text => {
              setCode(text);
              setError(null);
            }}
            keyboardType="number-pad"
            error={!!error}
          />
          <InputPrimary
            label="New Password"
            value={newPassword}
            onChangeText={text => {
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
        </View>
        <View style={{ marginTop: 24 }}>
          <ButtonPrimary onPress={onResetPassword} loading={loading} disabled={loading}>
            RESET PASSWORD
          </ButtonPrimary>
        </View>
        <Pressable
          onPress={() => router.push('/login-email')}
          style={{ marginTop: 16, alignItems: 'center' }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text>Remember your password? </Text>
            <RNText style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>
              Sign In
            </RNText>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
