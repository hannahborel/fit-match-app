import Logo from '@/assets/Logo';
import InputPrimary from '@/components/library/InputPrimary';
import { useSignIn } from '@clerk/clerk-expo';
import { useState } from 'react';
import { View } from 'react-native';
import { Text, TextInput, useTheme } from 'react-native-paper';
const LoginEmail = () => {
  const { isLoaded, signIn } = useSignIn();
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const theme = useTheme();

  const handleValidateEmail = async () => {
    if (!isLoaded) return;
    console.log(email);
    try {
      const result = await signIn.create({ identifier: email });

      if (result && result.supportedFirstFactors?.length) {
        // Email exists — Clerk recognizes this email for sign-in.
        console.log(result);
        return true;
      } else {
        // Either result is null or there are no supported sign-in factors.
        return false;
      }
    } catch (err) {
      if (err instanceof ReferenceError) {
        console.log(err);
        setError('Clerk Could not Find the user by email');
        // Clerk could not find the user by email.
        return false;
      }
      console.error('Unexpected error:', err);
      return false;
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ width: 300, alignSelf: 'center' }}>
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <Logo />
          {error && (
            <Text style={{ color: theme.colors.error, textAlign: 'center', marginBottom: 16 }}>
              {error}
            </Text>
          )}
          <InputPrimary
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            right={<TextInput.Icon icon="check" onPress={() => handleValidateEmail()} />}
          />
        </View>
      </View>
    </View>
  );
};
export default LoginEmail;
