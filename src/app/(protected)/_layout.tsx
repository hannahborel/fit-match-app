import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function ProtectedLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="leagueEntry" options={{ headerShown: false }} />
    </Stack>
  );
}
