import { useQuery } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';
import { queryClient } from '@/lib/queryClient';

export const useGetLeague = (options = {}) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const userId = useAuth();

  return useQuery({
    // Use unique queryKey to avoid caching conflicts
    queryKey: ['league', [userId]],
    queryFn: async () => {
      const token = await getToken();
      return fetchLeagueByUserId(token);
    },
    placeholderData: () => {
      return queryClient.getQueryData(['league', userId]);
    },
    staleTime: 1000 * 60 * 10,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    // Disable automatic retries to prevent flashing
    retry: false,
    // Add timeout to prevent infinite loading
    gcTime: 1000 * 60 * 5, // 5 minutes
    enabled: isLoaded && isSignedIn,
  });
};
