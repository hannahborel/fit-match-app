import {
  Slot,
  useRootNavigationState,
  useRouter,
  useSegments,
} from 'expo-router';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { ActivityIndicator, View } from 'react-native';

import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  Text,
  adaptNavigationTheme,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { leagueAtom } from '@/atoms/leaugeAtom';
import { tokenCache } from '@/constants/auth';
import { useGetLeague } from '@/hooks/useGetLeague';
import { queryClient } from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import merge from 'deepmerge';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import themeColors from '../theme/Colors';
import { SessionProvider } from '@/lib/util/authentication/AuthContext';

const InitialLayout = () => {
  const { isLoaded: isSignInLoading, isSignedIn } = useAuth();

  const segments = useSegments();
  const router = useRouter();
  const { data, isLoading } = useGetLeague();

  const setLeague = useSetAtom(leagueAtom);
  useReactQueryDevTools(queryClient);

  const inAuthGroup = segments[0] === '(auth)';
  const isReadyToRedirect = isSignInLoading && !isLoading;
  console.log('isSignInLoading:', isSignInLoading);
  console.log('isLoading league:', isLoading);
  console.log('league data:', data);
  console.log('isReadyToRedirect:', isReadyToRedirect);

  useEffect(() => {
    if (!isReadyToRedirect) return;

    setTimeout(() => {
      if (!isSignedIn && !inAuthGroup) {
        router.replace('/login-email');
        return;
      }
      if (data) {
        setLeague(data);
        if (!inAuthGroup) router.replace('/(tabs)');
      } else {
        if (!inAuthGroup) router.replace('/(protected)/createLeague');
      }
    }, 0);
  }, [isSignInLoading, isSignedIn, data]);

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
        <SessionProvider>
          <PaperProvider theme={paperTheme}>
            <SafeAreaProvider>
              <InitialLayout />
            </SafeAreaProvider>
          </PaperProvider>
        </SessionProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
