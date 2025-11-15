// src/app/(auth)/login-email.tsx
import InputPrimary from '@/components/elements/InputPrimary';
import { isEmailValid } from '@/helpers/validationHandlers';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonPrimary from '@/components/elements/ButtonPrimary';

export default function Login() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const [email, setEmail] = useState('');
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
            params: { emailParam: email, isNewUser: 'false' },
          });
          setLoading(false);
        }
      } catch (err: any) {
        if (err) {
          console.log('Email check error:', err);
          console.log('Full error:', JSON.stringify(err, null, 2));

          // Check if it's the specific "user not found" error
          if (err.errors?.[0]?.code === 'form_identifier_not_found') {
            // New user - send to sign up flow
            router.push({ pathname: '/email-code', params: { email: email, isNewUser: 'true' } });
          } else {
            // Other error - show error message
            setError(err.errors?.[0]?.message || 'An error occurred');
          }
        }
        setLoading(false);
        return false;
      }
    }
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
