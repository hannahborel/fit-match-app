import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProtectedLayout() {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: theme.colors.background,
            width: '100%',
            paddingHorizontal: 16,
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
