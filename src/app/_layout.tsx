import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import merge from 'deepmerge';
import { useColorScheme, View } from 'react-native';
import themeColors from '../constants/Colors';

const customDarkTheme = { ...MD3DarkTheme, colors: themeColors.dark };
const customLightTheme = { ...MD3LightTheme, colors: themeColors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: paperTheme.colors.background,
            },
            headerStyle: {
              backgroundColor: paperTheme.colors.background,
            },
            headerTintColor: paperTheme.colors.onSurface,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="pages/CreateAccount" />
          <Stack.Screen name="pages/LeagueOptions" />
          <Stack.Screen
            name="pages/CreateLeague"
            options={{ headerShown: true, title: 'Create League' }}
          />
        </Stack>
        <StatusBar />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
