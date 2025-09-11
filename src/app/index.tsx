import { useRouter, useSegments } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useGetLeague } from '@/hooks/useGetLeague';
import SplashScreen from '@/components/elements/SplashScreen';
import { leagueAtom } from '@/atoms/leagueAtom';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

const StartPage = () => {
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const segments = useSegments();
  const user = useUser();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const inAuthGroup = segments[0] === '(auth)';
  const { data: league, isLoading: isLeagueLoading } = useGetLeague();
  const [, setLeagueAtom] = useAtom(leagueAtom);
  const router = useRouter();

  // Update the league atom whenever league data changes
  useEffect(() => {
    setLeagueAtom(league || null);
  }, [league, setLeagueAtom]);

  // Ensure navigation is ready before attempting to navigate
  useEffect(() => {
    if (isLoaded && !isLeagueLoading) {
      setIsNavigationReady(true);
    } else {
      setIsNavigationReady(false);
    }
  }, [isLoaded, isLeagueLoading]);

  useEffect(() => {
    if (!isNavigationReady) return;

    if (isSignedIn) {
      if (league == null) {
        // User is signed in but has no league - send to create/join
        router.replace('/(protected)/createLeague');
      } else {
        // User has a league - send to dashboard
        router.replace('/(protected)/(tabs)');
      }
    } else if (!isSignedIn) {
      // User not signed in - send to login
      router.replace('/(auth)/login-email');
    }
  }, [isNavigationReady, isSignedIn, league, inAuthGroup, router]);

  return <SplashScreen />;
};

export default StartPage;
