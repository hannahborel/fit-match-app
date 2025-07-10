import Logo from '@/assets/Logo';
import InputPrimary from '@/components/elements/InputPrimary';
import { isEmailValid } from '@/helpers/validationHandlers';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';

export default function Login() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const [email, setEmail] = useState('');

  const isValidEmail = isEmailValid(email);

  const handleContinue = async () => {
    if (signIn) {
      try {
        const emailCheck = await signIn.create({
          identifier: email,
        });
        console.log(
          'After create call - emailCheck status:',
          emailCheck.status,
        );

        if (emailCheck.status === 'needs_first_factor') {
          //has account, needs to enter password
          router.push({
            pathname: '/login-password',
            params: { emailParam: email },
          });
        }
      } catch (err) {
        if (err) {
          console.log(err);
          setError('Clerk Could not Find the user by email');
          // Clerk could not find the user by email.
          router.push({
            pathname: '/sign-up',
            params: { emailParam: email },
          });
        }
        console.error('Unexpected error:', error);
        return false;
      }
    }
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
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
            keyboardType="email-address"
            right={
              <TextInput.Icon
                color={
                  isValidEmail
                    ? theme.colors.primary
                    : theme.colors.surfaceDisabled
                }
                icon="arrow-right-circle"
                onPress={handleContinue}
                disabled={!isValidEmail}
              />
            }
          />
        </View>
      </View>
    </View>
  );
}
