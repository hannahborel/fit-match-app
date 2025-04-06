import { useState, useEffect } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn, useAuth } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/library/InputPrimary';
import ButtonPrimary from '@/components/library/ButtonPrimary';
import Logo from '@/components/Logo';
import { useUser } from '@/context/UserContext';
import { formatPhoneNumberInput } from '@/utils/formatPhoneNumberInput';

export default function Login() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signIn, setActive } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const { leagueStatus } = useUser();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/leagueEntry');
    }
  }, [isLoaded, isSignedIn]);

  const handlePhoneNumberChange = (text: string) => {
    const formatted = formatPhoneNumberInput(text);
    setPhoneNumber(formatted);
    setError(null); // Clear error when user types
  };

  const onSignIn = async () => {
    if (!signIn) return;

    try {
      setLoading(true);
      setError(null);
      // Remove hyphens before sending to Clerk
      const cleanPhoneNumber = phoneNumber.replace(/-/g, '');
      const result = await signIn.create({
        identifier: cleanPhoneNumber,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: any) {
      console.error('Error signing in:', err);
      setError(err.errors?.[0]?.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
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
            label="Phone Number"
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            autoCapitalize="none"
            keyboardType="phone-pad"
            maxLength={12} // 10 digits + 2 hyphens
            error={!!error}
          />

          <InputPrimary
            label="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
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
        <Pressable
          onPress={() => router.push('/forgot-password')}
          style={{ alignSelf: 'flex-end', marginTop: 8 }}
        >
          <RNText
            style={{
              color: theme.colors.primary,
              textDecorationLine: 'underline',
            }}
          >
            Forgot Password?
          </RNText>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 24,
          }}
        >
          <ButtonPrimary onPress={onSignIn} loading={loading} disabled={loading}>
            SIGN IN
          </ButtonPrimary>
        </View>
        <Pressable
          onPress={() => router.push('/sign-up')}
          style={{ marginTop: 16, alignItems: 'center' }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text>Don't have an account? </Text>
            <RNText style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>
              Sign Up
            </RNText>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
