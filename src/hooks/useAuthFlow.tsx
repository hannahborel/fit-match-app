// hooks/useAuthFlow.ts
import { useAuth } from '@clerk/clerk-expo';
import { useSegments, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useGetLeague } from './useGetLeague';

export const useAuthFlow = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // Use your existing league hook
  const {
    data: league,
    isLoading: isLeagueLoading,
    error: leagueError,
    isError: hasLeagueError,
  } = useGetLeague({
    // Only fetch if user is signed in
    enabled: isLoaded && isSignedIn,
  });

  // Determine user's league status
  const getLeagueStatus = () => {
    if (!isSignedIn || !isLoaded) return 'unauthenticated';
    if (isLeagueLoading) return 'loading';
    if (hasLeagueError) return 'needs_league'; // Treat errors as needs league
    if (league && league.id) return 'has_league';
    return 'needs_league';
  };

  const leagueStatus = getLeagueStatus();

  // Handle navigation based on auth and league status
  useEffect(() => {
    if (!isLoaded) return; // Wait for auth to load

    const inAuth = segments.includes('(auth)');
    const inOnboarding = segments.includes('(onboarding)');
    const inApp = segments.includes('(app)');

    // Not signed in - redirect to auth
    if (!isSignedIn && !inAuth) {
      router.replace('/login');
      return;
    }

    // Signed in but still loading league data
    if (isSignedIn && leagueStatus === 'loading') {
      return; // Stay on current screen while loading
    }

    // Signed in but needs league - redirect to onboarding
    if (isSignedIn && leagueStatus === 'needs_league' && !inOnboarding) {
      router.replace('/onboarding');
      return;
    }

    // Signed in and has league - redirect to app
    if (isSignedIn && leagueStatus === 'has_league' && !inApp) {
      router.replace('/dashboard');
      return;
    }
  }, [isLoaded, isSignedIn, leagueStatus, segments, router]);

  return {
    // Auth state
    isLoaded,
    isSignedIn,

    // League state
    league,
    leagueStatus,
    isLeagueLoading,
    hasLeagueError,

    // Computed states
    shouldShowDashboard: leagueStatus === 'has_league',
    shouldShowOnboarding: leagueStatus === 'needs_league',
    isLoadingFlow: !isLoaded || leagueStatus === 'loading',

    // For debugging
    currentSegments: segments,
  };
};
