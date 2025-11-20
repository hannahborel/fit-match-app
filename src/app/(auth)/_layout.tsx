// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import { Redirect } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  // Wait for auth to load
  if (!isLoaded) {
    return null; // Or a loading screen
  }

  // Redirect signed-in users with complete profiles
  if (isSignedIn && user?.firstName && user?.lastName) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  // Redirect signed-in users with incomplete profiles
  if (isSignedIn && (!user?.firstName || !user?.lastName)) {
    return <Redirect href="/add-user-profile-details" />;
  }

  // Always render the full Stack - let Expo Router handle which screen to show
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login-email" />
      <Stack.Screen name="email-code" />
      <Stack.Screen name="verify-code" />
      <Stack.Screen name="add-user-profile-details" />
    </Stack>
  );
}
