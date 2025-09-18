import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';

export const useGetLeague = (options = {}) => {
  const { getToken, isLoaded, isSignedIn, userId } = useAuth();

  return useQuery({
    queryKey: ['league', userId],
    queryFn: async () => {
      const token = await getToken();
      return fetchLeagueByUserId(token);
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
