import BackButton from '@/components/elements/Headers/BackButton';
import ThemedStack from '@/components/elements/Stack/ThemedStack';
import { Stack } from 'expo-router';

export default function InviteFriendsLayout() {
  return (
    <ThemedStack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: 'Invite Friends',
        }}
      />
    </ThemedStack>
  );
}
