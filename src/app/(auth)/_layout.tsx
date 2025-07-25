import ThemedStack from '@/components/elements/Stack/ThemedStack';
import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function AuthLayout() {
  const theme = useTheme();

  return (
    <ThemedStack>
      <Stack.Screen
        name="login-email"
        options={{ title: 'Sign In', headerShown: false }}
      />

      <Stack.Screen name="sign-up" options={{ title: 'CREATE ACCOUNT' }} />
      <Stack.Screen name="verify-email" options={{ title: 'Verify Email' }} />
      <Stack.Screen
        name="forgot-password"
        options={{ title: 'Forgot Password' }}
      />
      <Stack.Screen
        name="reset-password"
        options={{ title: 'Reset Password' }}
      />
    </ThemedStack>
  );
}
