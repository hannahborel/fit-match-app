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
    </ThemedStack>
  );
}
