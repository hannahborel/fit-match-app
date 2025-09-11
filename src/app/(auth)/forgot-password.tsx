import { useState } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Text, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputPrimary from '@/components/elements/InputPrimary';
import ButtonPrimary from '@/components/elements/ButtonPrimary';
import Logo from '@/assets/Logo';
import { formatPhoneNumberInput } from '@/helpers/formatPhoneNumberInput';

export default function ForgotPassword() {
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumberInput(text);
    setPhoneNumber(formatted);
    setError(null);
  };

  const onRequestReset = async () => {
    if (!isLoaded || !signIn) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // Remove hyphens before sending to Clerk
      const cleanPhoneNumber = phoneNumber.replace(/-/g, '');
      const result = await signIn.create({
        strategy: 'reset_password_phone_code',
        identifier: cleanPhoneNumber,
      });

      // If successful, navigate to the reset password screen
      if (result.status === 'needs_first_factor') {
        router.push('/reset-password');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (err) {
      if (err instanceof ReferenceError) {
        setError('An error occurred while sending the reset code');
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
            label="Phone Number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            autoCapitalize="none"
            keyboardType="phone-pad"
            maxLength={12} // 10 digits + 2 hyphens
            error={!!error}
          />
        </View>
        <View style={{ marginTop: 24 }}>
          <ButtonPrimary
            onPress={onRequestReset}
            loading={loading}
            disabled={loading}
          >
            <Text style={{ color: theme.colors.onPrimary }}>
              SEND RESET CODE
            </Text>
          </ButtonPrimary>
        </View>
        <Pressable
          onPress={() => router.push('/login')}
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
              <Text> Sign In</Text>
            </RNText>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
