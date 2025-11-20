import { Stack } from 'expo-router';
import BackButton from '@/components/elements/Buttons/BackButton';
import ThemedStack from '@/components/elements/Stack/ThemedStack';
export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  return (
    <ThemedStack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Home',
        }}
      />
    </ThemedStack>
  );
}
