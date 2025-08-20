import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import {
  getInvitationContext,
  clearInvitationContext,
  handleIncomingDeepLink,
  InvitationContext,
} from '@/lib/deepLinking';

export const useDeepLinking = () => {
  const router = useRouter();
  const [pendingInvitation, setPendingInvitation] =
    useState<InvitationContext | null>(null);

  useEffect(() => {
    // Check for stored invitation context when app starts
    const checkStoredInvitation = async () => {
      try {
        const context = await getInvitationContext();
        if (context) {
          setPendingInvitation(context);
          // Log found invitation context (can be removed in production)
        }
      } catch {
        // Silently handle checking errors
      }
    };

    checkStoredInvitation();
  }, []);

  useEffect(() => {
    // Handle incoming deep links
    const handleDeepLink = (event: { url: string }) => {
      // Log received deep link (can be removed in production)
      const { leagueId, action } = handleIncomingDeepLink(event.url);

      if (leagueId && action === 'join_league') {
        // Navigate to join page
        router.push(`/join/${leagueId}`);
      }
    };

    // Listen for deep links when app is already running
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check for initial deep link that launched the app
    const getInitialURL = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          // Log initial deep link (can be removed in production)
          const { leagueId, action } = handleIncomingDeepLink(initialUrl);

          if (leagueId && action === 'join_league') {
            // Navigate to join page
            router.push(`/join/${leagueId}`);
          }
        }
      } catch {
        // Silently handle initial URL errors
      }
    };

    getInitialURL();

    return () => {
      subscription?.remove();
    };
  }, [router]);

  /**
   * Handle pending invitation (when user opens app after installing)
   */
  const handlePendingInvitation = async () => {
    if (!pendingInvitation) return;

    try {
      // Navigate to join page
      router.push(`/join/${pendingInvitation.leagueId}`);

      // Clear the stored invitation context
      await clearInvitationContext();
      setPendingInvitation(null);
    } catch {
      // Silently handle navigation errors
    }
  };

  /**
   * Clear pending invitation without navigating
   */
  const clearPendingInvitation = async () => {
    try {
      await clearInvitationContext();
      setPendingInvitation(null);
    } catch {
      // Silently handle clearing errors
    }
  };

  return {
    pendingInvitation,
    handlePendingInvitation,
    clearPendingInvitation,
  };
};
