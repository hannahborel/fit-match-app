import Constants from 'expo-constants';

/**
 * Get the web app URL based on the current environment
 * In development: returns localhost or Expo dev URL
 * In production: returns the configured production URL
 */
export const getWebAppUrl = (): string => {
  // Get the URL from Expo config (set via environment variables)
  const configUrl = Constants?.expoConfig?.extra?.WEB_APP_URL;

  if (configUrl) {
    return configUrl;
  }

  // Fallback URLs based on environment
  if (__DEV__) {
    // Development fallback
    return 'http://localhost:3000';
  }

  // Production fallback (this will be updated when you have the correct domain)
  return 'https://fitmatch.app';
};

/**
 * Generate a join league URL for the current environment
 */
export const generateJoinLeagueUrl = (leagueId: string): string => {
  const baseUrl = getWebAppUrl();
  return `${baseUrl}/join/${leagueId}`;
};
