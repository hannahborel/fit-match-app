// src/hooks/useAuthCache.ts
import { useCallback } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import {
  cacheAuthState,
  cacheLeagueState,
  clearAuthCache,
  clearLeagueCache,
  clearAllCache,
} from '@/lib/authCache';

/**
 * Hook for managing auth and league cache throughout the app
 * Use this when:
 * - User logs in/out
 * - User joins/creates a league
 * - User leaves a league
 */
export function useAuthCache() {
  const { userId } = useAuth();

  /**
   * Update auth cache (call after login)
   */
  const updateAuthCache = useCallback(
    async (isSignedIn: boolean) => {
      await cacheAuthState({
        isSignedIn,
        userId: userId || null,
      });
    },
    [userId],
  );

  /**
   * Update league cache (call after joining/creating/leaving league)
   */
  const updateLeagueCache = useCallback(
    async (hasLeague: boolean, leagueId: string | null = null) => {
      await cacheLeagueState({
        hasLeague,
        leagueId,
      });
    },
    [],
  );

  /**
   * Clear all cache (call on logout)
   */
  const clearCache = useCallback(async () => {
    await clearAllCache();
  }, []);

  /**
   * Clear just league cache (call when leaving league)
   */
  const clearLeagueData = useCallback(async () => {
    await clearLeagueCache();
  }, []);

  return {
    updateAuthCache,
    updateLeagueCache,
    clearCache,
    clearLeagueData,
  };
}
