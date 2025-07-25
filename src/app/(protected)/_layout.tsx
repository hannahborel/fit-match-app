import ThemedSafeAreaView from '@/components/elements/Stack/ThemedSafeAreaView';
import ThemedStack from '@/components/elements/Stack/ThemedStack';
import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProtectedLayout() {
  const theme = useTheme();

  return (
    <ThemedStack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="createLeague" options={{ headerShown: false }} />
      <Stack.Screen name="inviteFriends" options={{ headerShown: false }} />
    </ThemedStack>
  );
}
