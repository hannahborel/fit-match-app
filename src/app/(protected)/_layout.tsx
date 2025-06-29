import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
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
      <Stack.Screen name="createLeague" />
      <Stack.Screen name="createLeague/selectChallengeType" />
      <Stack.Screen name="createLeague/faceOffSetup" />
      <Stack.Screen
        options={{
          title: 'League Details',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleStyle: {
            color: theme.colors.onBackground,
            fontWeight: 500,
          },
          headerShown: true,
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft />
            </TouchableOpacity>
          ),
        }}
        name="leagueDetails"
      />
    </Stack>
  );
}
