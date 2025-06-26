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
      <Stack.Screen name="leagueEntry" />
      <Stack.Screen name="selectChallengeType" />
      <Stack.Screen name="faceOffSetup" />
      <Stack.Screen
        options={{
          presentation: 'modal',
        }}
        name="leagueDetails"
      />
    </Stack>
  );
}
