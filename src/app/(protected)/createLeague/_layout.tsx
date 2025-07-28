import { Stack } from 'expo-router';
import BackButton from '@/components/elements/Headers/BackButton';
import ThemedStack from '@/components/elements/Stack/ThemedStack';
import ThemedSafeAreaView from '@/components/elements/Stack/ThemedSafeAreaView';
export const unstable_settings = {
  initialRouteName: 'index',
};

export default function AccountLayout() {
  return (
    <ThemedStack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'League Setup',
        }}
      />
      <Stack.Screen
        name="faceOffSetup"
        options={{
          headerShown: true,
          title: 'Face Off',
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="selectChallengeType"
        options={{
          headerShown: true,
          title: 'Select Your Challenge',
          headerLeft: () => <BackButton />,
        }}
      />
      <Stack.Screen
        name="inviteFriends"
        options={{
          headerShown: true,
          title: 'Invite Friends',
          headerLeft: () => <BackButton />,
        }}
      />
    </ThemedStack>
  );
}
