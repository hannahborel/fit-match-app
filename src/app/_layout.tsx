// src/app/_layout.tsx (refactored version)
import { CombinedDarkTheme, CombinedDefaultTheme } from '@/theme/globalTheme';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import CustomToast from '@/components/elements/CustomToast';
import { QueryClientProvider } from '@tanstack/react-query';
import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@/lib/auth';
import { queryClient } from '@/lib/queryClient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function RootLayout() {
  // ✅ Theme detection is here
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
        {/* ✅ PaperProvider with theme is here */}
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <ClerkLoaded>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(protected)" />
              </Stack>
            </ClerkLoaded>
            <Toast config={toastConfig} />
          </SafeAreaProvider>
        </PaperProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}
