import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
  IconButton,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import { useColorScheme, View } from 'react-native';
import { themeColors } from '../src/constants/Colors';
import merge from 'deepmerge';
import { useState, useCallback } from 'react';

const customDarkTheme = { ...MD3DarkTheme, colors: themeColors.dark };
const customLightTheme = { ...MD3LightTheme, colors: themeColors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleTheme = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  const paperTheme = isDarkMode
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
        <View style={{ position: 'absolute', top: 50, right: 20 }}>
          <IconButton
            icon={isDarkMode ? 'white-balance-sunny' : 'moon-waning-crescent'}
            size={24}
            onPress={toggleTheme}
            mode="contained"
          />
        </View>
        <StatusBar />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
