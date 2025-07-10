import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

export default function ProtectedLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          color: theme.colors.onBackground,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
          width: '100%',
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="createLeague/index" />
      <Stack.Screen name="createLeague/selectChallengeType" />
      <Stack.Screen name="createLeague/faceOffSetup" />
      <Stack.Screen
        name="logActivity/logActivity"
        options={{
          headerShown: true,
          title: 'Log Workout',
          headerLeft: () => <ChevronLeft onPress={() => router.back()} />,
        }}
      />
    </Stack>
  );
}
