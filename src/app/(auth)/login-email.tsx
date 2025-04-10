import { useState, useEffect } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn, useAuth } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/library/InputPrimary';
import { isEmailValid } from '@/utils/validationHandlers';
import Logo from '@/components/Logo';

export default function Login() {
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState('');

  const isValidEmail = isEmailValid(email);

  const handleContinue = async () => {
    if (signIn) {
      if (signIn.status === 'needs_identifier') {
        console.log('user does not have an account');
        router.push({ pathname: '/sign-up', params: { emailParam: email } });
      }
    } else return;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: 300, alignSelf: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Logo />
        </View>
        <View style={{ gap: 8 }}>
          <InputPrimary
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
            right={
              <TextInput.Icon
                color={isValidEmail ? theme.colors.primary : theme.colors.surfaceDisabled}
                icon="arrow-right-circle"
                onPress={handleContinue}
                disabled={!isValidEmail}
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
