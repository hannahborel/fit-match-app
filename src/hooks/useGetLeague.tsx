import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';
import { queryClient } from '@/lib/queryClient';

export const useGetLeague = () => {
  const { getToken, isLoaded } = useAuth();
  return useQuery({
    queryKey: ['league'],
    queryFn: async () => {
      const token = await getToken();
      return fetchLeagueByUserId(token);
    },
    placeholderData: () => {
      return queryClient.getQueryData(['league']);
    },
    staleTime: 1000 * 60 * 5,
    enabled: isLoaded,
  });
};
