// src/lib/authCache.ts
import * as SecureStore from "expo-secure-store";

// Cache keys
const AUTH_STATE_KEY = "auth_state_cache";
const LEAGUE_STATE_KEY = "league_state_cache";
const CACHE_VERSION = "1.0"; // Increment to invalidate all caches

// Cache expiration: 7 days for auth, 1 hour for league
const AUTH_CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
const LEAGUE_CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

interface CachedData<T> {
  data: T;
  timestamp: number;
  version: string;
}

interface AuthState {
  isSignedIn: boolean;
  userId: string | null;
}

interface LeagueState {
  hasLeague: boolean;
  leagueId: string | null;
}

/**
 * Generic cache storage
 */
async function setCache<T>(key: string, data: T): Promise<void> {
  try {
    const cached: CachedData<T> = {
      data,
      timestamp: Date.now(),
      version: CACHE_VERSION,
    };
    await SecureStore.setItemAsync(key, JSON.stringify(cached));
  } catch (error) {
    console.error(`Error setting cache for ${key}:`, error);
  }
}

/**
 * Generic cache retrieval with expiration check
 */
async function getCache<T>(key: string, expiryMs: number): Promise<T | null> {
  try {
    const cachedStr = await SecureStore.getItemAsync(key);
    if (!cachedStr) return null;

    const cached: CachedData<T> = JSON.parse(cachedStr);

    // Check version
    if (cached.version !== CACHE_VERSION) {
      await SecureStore.deleteItemAsync(key);
      return null;
    }

    // Check expiration
    const isExpired = Date.now() - cached.timestamp > expiryMs;
    if (isExpired) {
      await SecureStore.deleteItemAsync(key);
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error(`Error getting cache for ${key}:`, error);
    return null;
  }
}

/**
 * Clear specific cache
 */
async function clearCache(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error clearing cache for ${key}:`, error);
  }
}

// ========== AUTH STATE CACHE ==========

export async function cacheAuthState(authState: AuthState): Promise<void> {
  await setCache(AUTH_STATE_KEY, authState);
}

export async function getCachedAuthState(): Promise<AuthState | null> {
  return getCache<AuthState>(AUTH_STATE_KEY, AUTH_CACHE_EXPIRY);
}

export async function clearAuthCache(): Promise<void> {
  await clearCache(AUTH_STATE_KEY);
  await clearCache(LEAGUE_STATE_KEY); // Clear league too on logout
}

// ========== LEAGUE STATE CACHE ==========

export async function cacheLeagueState(
  leagueState: LeagueState
): Promise<void> {
  await setCache(LEAGUE_STATE_KEY, leagueState);
}

export async function getCachedLeagueState(): Promise<LeagueState | null> {
  return getCache<LeagueState>(LEAGUE_STATE_KEY, LEAGUE_CACHE_EXPIRY);
}

export async function clearLeagueCache(): Promise<void> {
  await clearCache(LEAGUE_STATE_KEY);
}

// ========== COMBINED CACHE OPERATIONS ==========

export async function getCachedAppState() {
  const [authState, leagueState] = await Promise.all([
    getCachedAuthState(),
    getCachedLeagueState(),
  ]);

  return {
    authState,
    leagueState,
  };
}

export async function clearAllCache(): Promise<void> {
  await Promise.all([clearAuthCache(), clearLeagueCache()]);
}
