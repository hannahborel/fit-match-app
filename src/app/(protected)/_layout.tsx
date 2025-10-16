// src/app/(protected)/_layout.tsx
import ThemedStack from '@/components/elements/Stack/ThemedStack';
import { Stack } from 'expo-router';

/**
 * Protected layout - NO navigation logic here
 * All navigation is handled by index.tsx
 */
export default function ProtectedLayout() {
  return (
    <ThemedStack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="createLeague" options={{ headerShown: false }} />
      <Stack.Screen name="inviteFriends" options={{ headerShown: false }} />
    </ThemedStack>
  );
}
