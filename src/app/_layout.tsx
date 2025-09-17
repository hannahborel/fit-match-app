import CustomToast from '@/components/elements/CustomToast';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { tokenCache } from '@/lib/auth';
import { queryClient } from '@/lib/queryClient';
import { CombinedDarkTheme, CombinedDefaultTheme } from '@/theme/globalTheme';
import { QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from 'react-native';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(protected)/(tabs)');
    } else if (!isSignedIn) {
      router.replace('/(auth)/login-email');
    }
  }, [isSignedIn]);

  return <Slot />;
};

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
