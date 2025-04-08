import { useState, useEffect } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn, useAuth } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/library/InputPrimary';
import { validateEmail } from '@/utils/validationHandlers';
import Logo from '@/components/Logo';

export default function Login() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/leagueEntry');
    }
  }, [isLoaded, isSignedIn]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setError(null);
    setIsValidEmail(validateEmail(text));
  };

  const handleContinue = async () => {
    if (!isValidEmail || !signIn) return;
    try {
      const { supportedFirstFactors } = await signIn.create({
        strategy: 'email_code',
        identifier: email,
      });

      router.push({
        pathname: '/login-password',
        params: { email },
      });
    } catch (err: any) {
      if (err.errors?.[0]?.message === "Couldn't find your account.") {
        router.push({
          pathname: '/sign-up',
          params: { email },
        });
      } else {
        setError(err.errors?.[0]?.message || 'An unexpected error occurred');
        console.log(err.errors?.[0]?.code);
        console.log(err.errors?.[0]?.message);
      }
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
            label="Email"
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
            keyboardType="email-address"
            right={
              <TextInput.Icon
                color={isValidEmail ? theme.colors.primary : theme.colors.surfaceDisabled}
                icon="arrow-right-circle"
                onPress={handleContinue}
              />
            }
          />

          {/* <InputPrimary
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
          /> */}
        </View>
        {/* <Pressable
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
        </Pressable> */}
      </View>
    </View>
  );
}
