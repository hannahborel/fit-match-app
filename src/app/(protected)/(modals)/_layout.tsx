import { router, Stack } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function modals() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        options={{
          title: 'League Details',
          headerStyle: { backgroundColor: theme.colors.background },
          headerTitleStyle: {
            color: theme.colors.onBackground,
            fontWeight: 500,
          },

          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ChevronLeft />
            </TouchableOpacity>
          ),
        }}
        name="(account)/leagueDetails"
      />
    </Stack>
  );
}
