import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function modals() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTitleStyle: {
          color: theme.colors.onBackground,
          fontWeight: 500,
        },
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        options={{
          title: 'League Details',

          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft />
            </TouchableOpacity>
          ),
        }}
        name="(account)/leagueDetails"
      />
      <Stack.Screen
        options={{
          title: 'Log A Workout',

          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft />
            </TouchableOpacity>
          ),
        }}
        name="(activity)/logActivity"
      />
    </Stack>
  );
}
