import BackButton from '@/components/elements/Headers/BackButton';
import ThemedStack from '@/components/elements/Stack/ThemedStack';
import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

export default function ProtectedLayout() {
  const theme = useTheme();

  return (
    <ThemedStack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="createLeague" />
      <Stack.Screen name="createLeague/selectChallengeType" />
      <Stack.Screen name="createLeague/faceOffSetup" />
    </ThemedStack>
  );
}
