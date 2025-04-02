import { useState } from 'react';
import { View } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { Button, Text, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function Login() {
  const { signIn, setActive } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    if (!signIn) return;

    try {
      setLoading(true);
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error('Error signing in:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, gap: 16 }}>
      <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 24 }}>
        Sign In
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <Button
        mode="contained"
        onPress={onSignIn}
        loading={loading}
        disabled={loading}
        style={{ marginTop: 8 }}
      >
        Sign In
      </Button>

      <Button mode="text" onPress={() => router.push('/sign-up')} style={{ marginTop: 8 }}>
        Don't have an account? Create one
      </Button>
    </View>
  );
}
