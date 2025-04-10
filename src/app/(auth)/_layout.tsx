import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function AuthLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name="login-email" options={{ title: 'Sign In' }} />
      <Stack.Screen name="login-password" options={{ title: 'Sign In' }} />
      <Stack.Screen name="sign-up" options={{ title: 'CREATE ACCOUNT' }} />
      <Stack.Screen name="verify-email" options={{ title: 'Verify Email' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="reset-password" options={{ title: 'Reset Password' }} />
    </Stack>
  );
}
