import ThemedStack from '@/components/elements/Stack/ThemedStack';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';

export default function ProtectedLayout() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href="/(auth)/login-email" />;
  }

  return (
    <ThemedStack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="createLeague" options={{ headerShown: false }} />
      <Stack.Screen name="inviteFriends" options={{ headerShown: false }} />
    </ThemedStack>
  );
}
