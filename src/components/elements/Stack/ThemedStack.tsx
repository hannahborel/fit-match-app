// components/ThemedStack.tsx

import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function ThemedStack(props: React.ComponentProps<typeof Stack>) {
  const theme = useTheme();

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
        ...props.screenOptions, // allow screenOptions override
      }}
      {...props} // pass other props (e.g., initialRouteName, children)
    />
  );
}
