// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';
import { Redirect, usePathname } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const pathname = usePathname();

  // Allow access to add-user-profile-details even if signed in
  if (pathname === '/add-user-profile-details') {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="add-user-profile-details" />
      </Stack>
    );
  }

  // Redirect signed-in users with complete profiles back to index
  if (isLoaded && isSignedIn) {
    // If user has completed profile, redirect to index
    if (user?.firstName && user?.lastName) {
      return <Redirect href="/" />;
    }
    // If profile incomplete, redirect to profile details
    return <Redirect href="/add-user-profile-details" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login-email" />
      <Stack.Screen name="email-code" />
      <Stack.Screen name="verify-code" />
      <Stack.Screen name="add-user-profile-details" />
    </Stack>
  );
}
