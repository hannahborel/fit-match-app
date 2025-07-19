import { useQuery } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';
import { queryClient } from '@/lib/queryClient';

export const useGetLeague = () => {
  const { getToken, isLoaded } = useAuth();
  const userId = useAuth();

  return useQuery({
    // Use unique queryKey to avoid caching conflicts
    queryKey: ['league'],
    queryFn: async () => {
      const token = await getToken();
      return fetchLeagueByUserId(token);
    },
    placeholderData: () => {
      return queryClient.getQueryData(['league', userId]);
    },
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    enabled: isLoaded,
  });
};
