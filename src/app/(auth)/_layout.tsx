// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Redirect signed-in users back to index (let index.tsx handle routing)
  if (isLoaded && isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login-email" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="email-code" />
      <Stack.Screen name="verify-code" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />
    </Stack>
  );
}
