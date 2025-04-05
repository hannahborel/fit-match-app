import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';

export default function ProtectedLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="home" options={{ title: 'Home' }} />
      <Stack.Screen name="joinLeague" options={{ title: 'Join League' }} />
    </Stack>
  );
}
