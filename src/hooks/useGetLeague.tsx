// src/hooks/useGetLeague.tsx
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';
import { cacheLeagueState } from '@/lib/authCache';
import { leagueAtom } from '@/atoms/leagueAtom';
import { useSetAtom } from 'jotai';

export const useGetLeague = (options = {}) => {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();
  const setLeague = useSetAtom(leagueAtom);

  return useQuery({
    queryKey: ['league', userId],
    queryFn: async () => {
      const token = await getToken();
      const league = await fetchLeagueByUserId(token);

      // Update cache whenever we fetch fresh data
      await cacheLeagueState({
        hasLeague: !!league?.id,
        leagueId: league?.id || null,
      });
      if (league) {
        setLeague(league);
      } else {
        throw new Error('League atom not set');
      }
      return league;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    enabled: isLoaded && isSignedIn,
    retry: 1, // Only retry once
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
