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
          title: 'Log Activity',
        }}
      />
      <Stack.Screen
        name="activityDetails"
        options={{
          headerShown: true,
          title: 'Log Acctivity',
          headerLeft: () => <BackButton />,
        }}
      />
    </ThemedStack>
  );
}
