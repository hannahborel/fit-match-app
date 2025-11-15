// src/app/(auth)/login-email.tsx
import Logo from '@/assets/Logo';
import InputPrimary from '@/components/elements/InputPrimary';
import { isEmailValid } from '@/helpers/validationHandlers';
import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, Divider, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginPassword from '@/components/auth/login-password';
import { cacheAuthState } from '@/lib/authCache';
import ButtonPrimary from '@/components/elements/ButtonPrimary';

export default function Login() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = isEmailValid(email);

  const handleContinue = async () => {
    setLoading(true);
    if (signIn) {
      console.log('signIn', signIn);
      try {
        const emailCheck = await signIn.create({
          identifier: email,
        });

        if (emailCheck.status === 'needs_first_factor') {
          router.push({
            pathname: '/email-code',
            params: { emailParam: email },
          });
          setLoading(false);
        }
      } catch (err: any) {
        if (err) {
          console.log('Email check error:', err);
          console.log('Full error:', JSON.stringify(err, null, 2));
          setError('Could not find user with this email');
          // Clerk could not find the user by email - go to signup
          // router.push({
          //   pathname: '/sign-up',
          //   params: { emailParam: email },
          // });

          router.push({ pathname: '/email-code', params: { email: email } });
        }
        return false;
      }
    }
  };

  /**
   * Called by LoginPassword component after successful login
   */
  const handleLoginSuccess = async (loggedInUserId: string) => {
    // Cache auth state immediately
    await cacheAuthState({
      isSignedIn: true,
      userId: loggedInUserId,
    });

    // Navigate to root - index.tsx will handle the rest
    router.replace('/');
  };

  const checkIcon = isValidEmail ? 'check' : undefined;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            marginVertical: 20,
          }}
        >
          <View>
            <View style={{ marginVertical: 48 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Welcome!
              </Text>
            </View>

            <InputPrimary
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Email"
              leftIcon="email-outline"
              rightIcon={checkIcon}
            />
          </View>

          <ButtonPrimary onPress={handleContinue} disabled={!isValidEmail}>
            Continue
          </ButtonPrimary>
        </View>
      </View>
    </SafeAreaView>
  );
}

// <View style={{ gap: 8 }}>
// <InputPrimary
//   value={email}
//   onChangeText={(text) => setEmail(text)}
//   autoCapitalize="none"
//   keyboardType="email-address"
//   placeholder="Email"
//   leftIcon="email-outline"
//   rightIcon={checkIcon}
// />
// {showPassword && (
//   <LoginPassword
//     email={email}
//     onLoginSuccess={handleLoginSuccess}
//   />
// )}
// </View>

///error

// {error && (
//   <Text style={{ color: theme.colors.error, marginTop: 8 }}>
//     {error}
//   </Text>
// )}

// <View style={{ transform: [{ scale: 0.75 }] }}>
//               <Logo />
//               </View>

// "clerkError": true,
// "code": "api_response_error",
// "status": 422,
// "errors": [
//   {
//     "code": "form_identifier_not_found",
//     "message": "Couldn't find your account.",
//     "longMessage": "Couldn't find your account.",
//     "meta": {
//       "paramName": "identifier"
//     }
//   }
// ]
// }
