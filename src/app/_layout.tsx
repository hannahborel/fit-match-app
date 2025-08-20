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
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import CustomToast from '@/components/elements/CustomToast';

import { leagueAtom } from '@/atoms/leagueAtom';
import { tokenCache } from '@/lib/auth';
import { useGetLeague } from '@/hooks/useGetLeague';
import { useDeepLinking } from '@/hooks/useDeepLinking';
import { queryClient } from '@/lib/queryClient';
import DatabaseErrorView from '@/components/elements/DatabaseErrorView';

import { QueryClientProvider } from '@tanstack/react-query';
import merge from 'deepmerge';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import themeColors from '../theme/Colors';

const InitialLayout = () => {
  const { isLoaded: isSignInLoading, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useGetLeague();
  const { pendingInvitation, handlePendingInvitation } = useDeepLinking();
  const setLeague = useSetAtom(leagueAtom);
  const [showError, setShowError] = useState(false);

  useReactQueryDevTools(queryClient);

  const inAuthGroup = segments[0] === '(auth)';
  const inProtectedGroup = segments[0] === '(protected)';
  const inJoinPage = segments[0] === 'join';

  // Only consider ready to redirect when we have a definitive result (success or error)
  const hasDefinitiveResult =
    !isLoading && (data !== undefined || error !== undefined);
  const isReadyToRedirect = isSignInLoading && hasDefinitiveResult;

  // Only show error after a delay to prevent flashing
  useEffect(() => {
    if (error && !inAuthGroup && isSignedIn) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 1000); // Wait 1 second before showing error

      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [error, inAuthGroup, isSignedIn]);

  useEffect(() => {
    if (!isReadyToRedirect) return;

    setTimeout(() => {
      if (!isSignedIn && !inAuthGroup && !inJoinPage) {
        router.replace('/login-email');
        return;
      }

      // If we're in a protected route but have an error, don't navigate anywhere
      if (inProtectedGroup && error) {
        return;
      }

      if (data) {
        setLeague(data);
        if (!inAuthGroup && !inJoinPage) {
          // Check if there's a pending invitation to handle
          if (pendingInvitation) {
            handlePendingInvitation();
          } else {
            router.replace('/(tabs)');
          }
        }
      } else if (!error) {
        // Only navigate to create league if there's no error
        if (!inAuthGroup && !inJoinPage)
          router.replace('/(protected)/createLeague');
      }
    }, 0);
  }, [
    isSignInLoading,
    isSignedIn,
    data,
    error,
    isReadyToRedirect,
    inAuthGroup,
    inProtectedGroup,
    router,
    setLeague,
  ]);

  // Handle database connection errors - show simple error screen
  if (showError && error && !inAuthGroup && isSignedIn) {
    console.log('showError', showError);
    console.log('error', error);

    return (
      <DatabaseErrorView
        error={error}
        onRetry={() => {
          setShowError(false);
          refetch();
        }}
      />
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

  const toastConfig = {
    success: (props: any) => <CustomToast {...props} type="success" />,
    error: (props: any) => <CustomToast {...props} type="error" />,
    info: (props: any) => <CustomToast {...props} type="info" />,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider
        publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        tokenCache={tokenCache}
      >
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <InitialLayout />
            <Toast config={toastConfig} />
          </SafeAreaProvider>
        </PaperProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
