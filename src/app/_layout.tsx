import { useReactQueryDevTools } from '@dev-plugins/react-query';
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

import { leagueQueryAtom } from '@/atoms/leagueQueryAtom';
import { sessionAtom } from '@/atoms/sessionAtom';
import { tokenCache } from '@/constants/auth';
import { queryClient } from '@/lib/queryClient';
import SessionInitilizer from '@/lib/util/authentication/SessionInitilizer';
import { QueryClientProvider } from '@tanstack/react-query';
import merge from 'deepmerge';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import themeColors from '../theme/Colors';

const InitialLayout = () => {
  const { isLoaded: isSignInLoading, isSignedIn } = useAuth();
  const isSessionLoading = useAtomValue(sessionAtom);

  const segments = useSegments();
  const router = useRouter();
  const [{ data, isFetched }] = useAtom(leagueQueryAtom);

  useReactQueryDevTools(queryClient);

  const inAuthGroup = segments[0] === '(auth)';

  useEffect(() => {
    if (!isSignInLoading || !isSessionLoading || !isFetched) return;

    setTimeout(() => {
      if (!isSignedIn && !inAuthGroup) {
        router.replace('/login-email');
        return;
      }
      if (data) {
        if (!inAuthGroup) router.replace('/(tabs)');
      } else {
        if (!inAuthGroup) router.replace('/(protected)/createLeague');
      }
    }, 0);
  }, [isSignInLoading, isFetched]);

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
            <SessionInitilizer />
            <InitialLayout />
          </SafeAreaProvider>
        </PaperProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
