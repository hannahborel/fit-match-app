import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function ProtectedLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
          width: '100%',
        },
      }}
    >
      <Stack.Screen name="createLeague/index" />
      <Stack.Screen name="createLeague/selectChallengeType" />
      <Stack.Screen name="createLeague/faceOffSetup" />
    </Stack>
  );
}
