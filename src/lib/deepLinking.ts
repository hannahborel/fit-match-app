import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';
import { getWebAppUrl } from './getWebAppUrl';

// Deep link scheme for the app
export const APP_SCHEME = 'fit-match-web';

// Web app URL - now dynamically determined
export const WEB_APP_URL = getWebAppUrl();

// Storage keys for invitation context
const INVITATION_CONTEXT_KEY = 'invitation_context';
const INVITATION_TIMESTAMP_KEY = 'invitation_timestamp';

// Invitation context expires after 24 hours
const INVITATION_EXPIRY_HOURS = 24;

export interface InvitationContext {
  leagueId: string;
  timestamp: number;
  source: 'deep_link' | 'web_fallback';
}

/**
 * Check if the FitMatch app is installed on the device
 */
export const isAppInstalled = async (): Promise<boolean> => {
  try {
    // Try to open the app using its custom scheme
    const canOpen = await Linking.canOpenURL(`${APP_SCHEME}://`);
    return canOpen;
  } catch {
    // Silently handle error checking if app is installed
    return false;
  }
};

/**
 * Store invitation context for deferred deep linking
 */
export const storeInvitationContext = async (
  leagueId: string,
  source: 'deep_link' | 'web_fallback' = 'deep_link',
): Promise<void> => {
  try {
    const context: InvitationContext = {
      leagueId,
      timestamp: Date.now(),
      source,
    };

    await SecureStore.setItemAsync(
      INVITATION_CONTEXT_KEY,
      JSON.stringify(context),
    );
    await SecureStore.setItemAsync(
      INVITATION_TIMESTAMP_KEY,
      Date.now().toString(),
    );

    // Log successful storage (can be removed in production)
  } catch {
    // Silently handle storage errors
  }
};

/**
 * Retrieve stored invitation context
 */
export const getInvitationContext =
  async (): Promise<InvitationContext | null> => {
    try {
      const contextStr = await SecureStore.getItemAsync(INVITATION_CONTEXT_KEY);
      const timestampStr = await SecureStore.getItemAsync(
        INVITATION_TIMESTAMP_KEY,
      );

      if (!contextStr || !timestampStr) {
        return null;
      }

      const context: InvitationContext = JSON.parse(contextStr);
      const timestamp = parseInt(timestampStr, 10);

      // Check if invitation context has expired
      const now = Date.now();
      const expiryMs = INVITATION_EXPIRY_HOURS * 60 * 60 * 1000;

      if (now - timestamp > expiryMs) {
        // Clear expired context
        await clearInvitationContext();
        return null;
      }

      return context;
    } catch {
      // Silently handle retrieval errors
      return null;
    }
  };

/**
 * Clear stored invitation context
 */
export const clearInvitationContext = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(INVITATION_CONTEXT_KEY);
    await SecureStore.deleteItemAsync(INVITATION_TIMESTAMP_KEY);
    // Log successful clearing (can be removed in production)
  } catch {
    // Silently handle clearing errors
  }
};

/**
 * Generate a deep link URL for the app
 */
export const generateDeepLink = (leagueId: string): string => {
  return `${APP_SCHEME}://join/${leagueId}`;
};

/**
 * Generate a web fallback URL
 */
export const generateWebFallbackUrl = (leagueId: string): string => {
  return `${WEB_APP_URL}/join/${leagueId}`;
};

/**
 * Open the app with deep link, or fallback to web
 */
export const openAppOrWeb = async (leagueId: string): Promise<void> => {
  try {
    const appInstalled = await isAppInstalled();

    if (appInstalled) {
      // Try to open the app with deep link
      const deepLink = generateDeepLink(leagueId);
      const canOpen = await Linking.canOpenURL(deepLink);

      if (canOpen) {
        await Linking.openURL(deepLink);
        return;
      }
    }

    // Fallback to web
    const webUrl = generateWebFallbackUrl(leagueId);
    await Linking.openURL(webUrl);
  } catch {
    // Final fallback - open web in browser
    const webUrl = generateWebFallbackUrl(leagueId);
    await Linking.openURL(webUrl);
  }
};

/**
 * Handle incoming deep links when app is opened
 */
export const handleIncomingDeepLink = (
  url: string,
): { leagueId: string | null; action: string | null } => {
  try {
    const parsed = Linking.parse(url);

    if (parsed.scheme === APP_SCHEME && parsed.path?.startsWith('/join/')) {
      const leagueId = parsed.path.split('/')[2]; // /join/{leagueId}
      if (leagueId) {
        return {
          leagueId,
          action: 'join_league',
        };
      }
    }

    return { leagueId: null, action: null };
  } catch {
    // Silently handle parsing errors
    return { leagueId: null, action: null };
  }
};
