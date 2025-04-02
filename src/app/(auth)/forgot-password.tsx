import { useState } from 'react';
import { View, Pressable, Text as RNText } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Text, TextInput, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import InputPrimary from '@/components/library/InputPrimary';
import ButtonPrimary from '@/components/library/ButtonPrimary';
import Logo from '@/components/Logo';

export default function ForgotPassword() {
  const { isLoaded, signIn } = useSignIn();
  const router = useRouter();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onRequestReset = async () => {
    if (!isLoaded || !signIn) {
      return;
    }
    setLoading(true);
    try {
      const result = await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      // If successful, navigate to the reset password screen
      if (result.status === 'needs_first_factor') {
        router.push('/reset-password');
      } else {
        // Handle other potential statuses or errors if needed
        console.log('Unexpected status:', result.status);
      }
    } catch (err: any) {
      console.error('Error requesting password reset:', JSON.stringify(err, null, 2));
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
     <View style={{width: 300, alignSelf: 'center'}}>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Logo />
      </View>
      <Text style={{ textAlign: 'center', marginBottom: 16 }}>
        Enter your email address and we'll send you a code to reset your password.
      </Text>
      <View style={{gap: 16}}>
      <InputPrimary
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
        <ButtonPrimary onPress={onRequestReset} loading={loading} disabled={loading}>
          SEND RESET CODE
        </ButtonPrimary>
      </View>

      <Pressable onPress={() => router.back()} style={{ marginTop: 16, alignItems: 'center' }}>
        <RNText style={{ color: theme.colors.primary, textDecorationLine: 'underline' }}>Back to Login</RNText>
      </Pressable>
      </View>
    </View>
  );
} 