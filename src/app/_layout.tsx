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

import { leagueAtom } from '@/atoms/leagueAtom';
import { tokenCache } from '@/constants/auth';
import { useGetLeague } from '@/hooks/useGetLeague';
import { queryClient } from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import merge from 'deepmerge';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import themeColors from '../theme/Colors';

import { getCurrentWeek } from '@/helpers/getCurrentWeek';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { data, isLoading, error } = useGetLeague();
  const setLeague = useSetAtom(leagueAtom);

  useEffect(() => {
    if (!isLoaded || isLoading) return;

    const inTabsGroup = segments[0] === '(auth)';

    if (isSignedIn && !inTabsGroup) {
      if (data?.league) {
        setLeague(data.league);
        router.replace('/(tabs)');
      } else if (!data) {
        router.replace('/(protected)/createLeague');
      }
    } else if (!isSignedIn) {
      router.replace('/login-email');
    }
  }, [isLoaded, isSignedIn, isLoading, data]);

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
