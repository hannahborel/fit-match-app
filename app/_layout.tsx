import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from 'react-native-paper';
import theme from './theme/index';
import { useColorScheme } from 'react-native';
import { themeColors } from './constants/Colors';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: themeColors.dark }
      : { ...MD3LightTheme, colors: themeColors.light };
  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="pages/CreateAccount" />
          <Stack.Screen name="pages/LeagueOptions" />
          <Stack.Screen name="pages/CreateLeague" />
        </Stack>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
