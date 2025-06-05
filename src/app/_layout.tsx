import { Slot, useRouter, useSegments } from 'expo-router';
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
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { LeagueStatusProvider, useLeagueStatus } from '@/context/LeagueStatus';

import merge from 'deepmerge';
import { useColorScheme } from 'react-native';
import themeColors from '../constants/Colors';
import { useEffect } from 'react';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { leagueStatus } = useLeagueStatus();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    if (isSignedIn && !inTabsGroup) {
      if (!leagueStatus) {
        router.replace('/leagueEntry');
      } else {
        router.replace('/(protected)/home');
      }
    } else if (!isSignedIn) {
      router.replace('/login-email');
    }
  }, [isSignedIn, leagueStatus]);

  return <Slot />;
};

const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

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
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <PaperProvider theme={paperTheme}>
        <SafeAreaProvider>
          <LeagueStatusProvider>
            <InitialLayout />
          </LeagueStatusProvider>
        </SafeAreaProvider>
      </PaperProvider>
    </ClerkProvider>
  );
}
