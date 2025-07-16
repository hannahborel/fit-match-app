import { Slot, useRouter, useSegments } from 'expo-router';

import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { tokenCache } from '@/constants/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import merge from 'deepmerge';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import themeColors from '../theme/Colors';
import { useGetLeague } from '@/hooks/useGetLeague';
import { useSetAtom } from 'jotai';
import { leagueAtom } from '@/atoms/leagueAtom';
import { queryClient } from '@/lib/queryClient';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { data, isLoading, error } = useGetLeague();
  const setLeague = useSetAtom(leagueAtom);

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';
    console.log('segments[0]', segments[0]);

    console.log(data);

    // Delay navigation until everything is mounted
    setTimeout(() => {
      if (isSignedIn && !inTabsGroup) {
        if (!isLoading && data) {
          setLeague(data.league);
          router.replace('/(tabs)');
        }
        if (!data && !isLoading) {
          router.replace('/createLeague');
        }
      } else if (!isSignedIn) {
        router.replace('/login-email');
      }
    }, 0); // or 100ms if still unstable
  }, [isLoaded, isSignedIn, isLoading]);

  return <Slot />;
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
  const paperTheme =
    colorScheme === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <InitialLayout />
          </SafeAreaProvider>
        </PaperProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
