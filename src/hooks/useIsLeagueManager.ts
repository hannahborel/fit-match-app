import { leagueAtom } from '@/atoms/leagueAtom';
import { useAuth } from '@clerk/clerk-expo';
import { useAtomValue } from 'jotai';

/**
 * Hook to check if the current user is the league manager (owner)
 * @returns boolean indicating if the current user owns the league
 */
export const useIsLeagueManager = (): boolean => {
  const { userId } = useAuth();
  const leagueDetails = useAtomValue(leagueAtom);

  if (!leagueDetails || !userId) return false;

  return leagueDetails.ownerId === userId;
};
