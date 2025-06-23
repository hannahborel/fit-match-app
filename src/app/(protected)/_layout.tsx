import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProtectedLayout() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: true,
          contentStyle: {
            backgroundColor: theme.colors.background,
            width: '100%',
            paddingTop: 16,
          },
        }}
      >
        <Stack.Screen name="home" />
        <Stack.Screen name="leagueEntry" />
        <Stack.Screen name="selectChallengeType" />
        <Stack.Screen name="faceOffSetup" />
      </Stack>
    </SafeAreaView>
  );
}
