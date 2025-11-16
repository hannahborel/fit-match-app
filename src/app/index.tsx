// src/app/index.tsx
import { useEffect, useState, useRef } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import SplashScreen from '@/components/elements/SplashScreen';
import {
  getCachedAppState,
  cacheAuthState,
  cacheLeagueState,
} from '@/lib/authCache';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';

type AppState = 'loading' | 'auth' | 'profile' | 'onboarding' | 'app';

const MINIMUM_SPLASH_DURATION = 3000; // 3 seconds minimum display time

/**
 * Central navigation controller - Single source of truth for routing
 * This component handles the Instagram-style flow:
 * 1. Show splash screen (minimum 3 seconds)
 * 2. Check cache for instant navigation
 * 3. Verify with server in background
 * 4. Navigate to appropriate screen
 */
export default function Index() {
  const { isLoaded: clerkLoaded, isSignedIn, userId, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [appState, setAppState] = useState<AppState>('loading');
  const hasNavigatedRef = useRef(false); // ✅ Use ref instead of state
  const splashStartTimeRef = useRef<number>(Date.now()); // Track when splash started

  useEffect(() => {
    initializeApp();
  }, [clerkLoaded, isSignedIn, userId, user]);

  /**
   * Initialize app with cache-first approach
   */
  async function initializeApp() {
    // Wait for Clerk to load
    if (!clerkLoaded) {
      return;
    }

    console.log('🚀 Initializing app...');
    console.log('🔐 Clerk loaded:', clerkLoaded);
    console.log('👤 Signed in:', isSignedIn);
    console.log('🆔 User ID:', userId);

    try {
      // Step 1: Check cache for instant navigation
      const cachedState = await getCachedAppState();
      console.log('📦 Cached state:', cachedState);

      // If user is not signed in
      if (!isSignedIn) {
        console.log('❌ Not signed in, going to login');
        setAppState('auth');
        navigateTo('/(auth)/login-email');
        return;
      }

      // Check if user has completed profile (firstName and lastName)
      if (!user?.firstName || !user?.lastName) {
        console.log('❌ Profile incomplete, going to add-user-profile-details');
        setAppState('profile');
        navigateTo('/(auth)/add-user-profile-details');
        return;
      }

      // Step 2: Use cache for instant UI (if available)
      if (cachedState?.authState?.isSignedIn && cachedState?.leagueState) {
        console.log('✅ Using cached state for instant navigation');
        // Show cached state immediately
        if (cachedState.leagueState.hasLeague) {
          console.log('📍 Cache says: Has league, going to dashboard');
          setAppState('app');
          navigateTo('/(protected)/(tabs)');
        } else {
          console.log('📍 Cache says: No league, going to create league');
          setAppState('onboarding');
          navigateTo('/(protected)/createLeague');
        }

        // Step 3: Verify in background and update if needed
        verifyAndUpdateCache();
      } else {
        console.log('❌ No valid cache, fetching fresh data');
        // No cache - fetch fresh data
        await fetchAndNavigate();
      }
    } catch (error) {
      console.error('❌ Error initializing app:', error);
      // Fallback to auth on error
      setAppState('auth');
      navigateTo('/(auth)/login-email');
    }
  }

  /**
   * Fetch fresh data and navigate
   */
  async function fetchAndNavigate() {
    if (!isSignedIn || !userId) {
      setAppState('auth');
      navigateTo('/(auth)/login-email');
      return;
    }

    try {
      const token = await getToken();
      console.log('🔍 Fetching league with token:', !!token);

      const league = await fetchLeagueByUserId(token);
      console.log('🔍 Fetched League:', league);
      console.log('🔍 League ID:', league?.id);

      // Cache the results
      await cacheAuthState({
        isSignedIn: true,
        userId: userId,
      });

      await cacheLeagueState({
        hasLeague: !!league?.id,
        leagueId: league?.id || null,
      });

      // Navigate based on league status
      if (league?.id) {
        console.log('✅ League found, navigating to dashboard');
        setAppState('app');
        navigateTo('/(protected)/(tabs)');
      } else {
        console.log('❌ No league found, navigating to create league');
        setAppState('onboarding');
        navigateTo('/(protected)/createLeague');
      }
    } catch (error) {
      console.error('❌ Error fetching league:', error);
      // On error, assume no league
      setAppState('onboarding');
      navigateTo('/(protected)/createLeague');
    }
  }

  /**
   * Verify cached data in background and update if needed
   */
  async function verifyAndUpdateCache() {
    console.log('🔄 Verifying cache in background...');
    try {
      const token = await getToken();
      const league = await fetchLeagueByUserId(token);
      console.log('🔍 Background verification - League:', league);

      // Update cache with fresh data
      await cacheAuthState({
        isSignedIn: true,
        userId: userId || null,
      });

      await cacheLeagueState({
        hasLeague: !!league?.id,
        leagueId: league?.id || null,
      });

      // If state changed, update navigation
      if (league?.id && appState !== 'app') {
        console.log(
          '🔄 Cache changed: Now has league, redirecting to dashboard',
        );
        setAppState('app');
        navigateTo('/(protected)/(tabs)');
      } else if (!league?.id && appState !== 'onboarding') {
        console.log(
          '🔄 Cache changed: No longer has league, redirecting to create league',
        );
        setAppState('onboarding');
        navigateTo('/(protected)/createLeague');
      } else {
        console.log('✅ Cache verified - no changes needed');
      }
    } catch (error) {
      // Silently fail - user already has cached UI
      console.error('⚠️ Error verifying cache (non-critical):', error);
    }
  }

  /**
   * Navigate with guard to prevent multiple navigations
   * Ensures splash screen shows for minimum duration
   */
  async function navigateTo(path: string) {
    if (!hasNavigatedRef.current) {
      console.log('🚀 NAVIGATING TO:', path);
      console.log('🔒 Has navigated before?', hasNavigatedRef.current);
      hasNavigatedRef.current = true;

      // Calculate remaining time to show splash screen
      const elapsedTime = Date.now() - splashStartTimeRef.current;
      const remainingTime = Math.max(0, MINIMUM_SPLASH_DURATION - elapsedTime);

      if (remainingTime > 0) {
        console.log(
          `⏱️ Waiting ${remainingTime}ms to meet minimum splash duration`,
        );
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      // Use replace to prevent back navigation to splash
      router.replace(path as any);
      console.log('✅ Navigation command sent');
    } else {
      console.log('⚠️ Navigation blocked - already navigated');
      console.log('   Attempted path:', path);
    }
  }

  // Show splash screen while determining state
  if (appState === 'loading') {
    return <SplashScreen />;
  }

  // This should never render, but just in case
  return <SplashScreen />;
}
