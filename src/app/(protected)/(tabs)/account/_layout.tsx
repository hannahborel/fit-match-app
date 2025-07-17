import { Stack } from 'expo-router';
import BackButton from '@/components/elements/Headers/BackButton';
import ThemedStack from '@/components/elements/Stack/ThemedStack';
export const unstable_settings = {
  initialRouteName: 'index',
};

export default function AccountLayout() {
  return (
    <ThemedStack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Account',
        }}
      />
      <Stack.Screen
        name="accountSettings"
        options={{
          headerShown: true,
          title: 'Account Settings',
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="leagueDetails"
        options={{
          headerShown: true,
          title: 'LeagueDetails',
          headerLeft: () => <BackButton />,
        }}
      />
    </ThemedStack>
  );
}
