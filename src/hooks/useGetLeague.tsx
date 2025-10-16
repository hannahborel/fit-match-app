// src/hooks/useGetLeague.tsx
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';
import { cacheLeagueState } from '@/lib/authCache';

export const useGetLeague = (options = {}) => {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();

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
