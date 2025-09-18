import SplashScreen from '@/components/elements/SplashScreen';
import { useGetLeague } from '@/hooks/useGetLeague';
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

const StartPage = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const { data: league, isLoading } = useGetLeague();

  // Still loading - show loading screen
  if (!isLoaded || (isSignedIn && isLoading)) {
    return <SplashScreen />;
  }

  // Instant redirects - no extra renders
  if (!isSignedIn) return <Redirect href="/(auth)/login-email" />;
  if (!league?.id) return <Redirect href="/(protected)/createLeague" />;
  return <Redirect href="/(protected)/(tabs)" />;
};
export default StartPage;
