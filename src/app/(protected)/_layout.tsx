import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

export default function ProtectedLayout() {
  const theme = useTheme();
  const BackButton = (
    <ChevronLeft
      color={theme.colors.onBackground}
      onPress={() => router.back()}
    />
  );

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
        name="account/leagueDetails"
        options={{
          headerShown: true,
          title: 'League Details',
          headerLeft: () => BackButton,
        }}
      />
      <Stack.Screen
        name="account/accountSettings"
        options={{
          headerShown: true,
          title: 'Account Settings',

          headerLeft: () => BackButton,
        }}
      />
      <Stack.Screen
        name="logActivity/logActivity"
        options={{
          headerShown: true,

          title: 'Log Workout',
          headerLeft: () => BackButton,
        }}
      />
    </Stack>
  );
}
