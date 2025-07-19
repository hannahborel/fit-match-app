import { Slot, useRouter, useSegments } from 'expo-router';
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

const InitialLayout = () => {
  const { isLoaded: isSignInLoading, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { data, isLoading: isLeagueDataLoading, error } = useGetLeague();
  const setLeague = useSetAtom(leagueAtom);
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    if (!isSignInLoading || isLeagueDataLoading) return;
    const inTabsGroup = segments[0] === '(auth)';

    if (!isSignedIn) {
      return router.replace('/login-email');
    }

    if (isSignedIn && !inTabsGroup && data) {
      setLeague(data);
      return router.replace('/(tabs)');
    } else {
      router.replace('/(protected)/createLeague');
    }
  }, [isSignInLoading, isSignedIn, data, isLeagueDataLoading]);

  if (isLeagueDataLoading || !isSignInLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}> League Data Loading</Text>
      </View>
    );
  }

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
