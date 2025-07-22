import { useQuery } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';
import { queryClient } from '@/lib/queryClient';
import { sessionAtom } from '@/atoms/sessionAtom';
import { useAtom, useAtomValue } from 'jotai';

export const useGetLeague = () => {
  const [isLoading, token] = useAtomValue(sessionAtom);
  const { getToken, isLoaded } = useAuth();
  const userId = useAuth();
  const enabled = !isLoading && !!token;
  return useQuery({
    // Use unique queryKey to avoid caching conflicts
    queryKey: ['league'],
    queryFn: async () => {
      return fetchLeagueByUserId(token);
    },
    placeholderData: () => {
      return queryClient.getQueryData(['league', userId]);
    },
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
    enabled: enabled,
  });
};
