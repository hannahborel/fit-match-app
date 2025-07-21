import BackButton from '@/components/elements/Headers/BackButton';
import ThemedStack from '@/components/elements/Stack/ThemedStack';
import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProtectedLayout() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedStack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="createLeague" options={{ headerShown: false }} />
        <Stack.Screen name="inviteFriends" options={{ headerShown: false }} />
      </ThemedStack>
    </SafeAreaView>
  );
}
