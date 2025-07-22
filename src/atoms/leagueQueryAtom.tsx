import { atomWithQuery } from 'jotai-tanstack-query';
import { sessionAtom } from './sessionAtom';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';

type TLeagueIdAtom = string;

export const leagueQueryAtom = atomWithQuery((get) => {
  const [isLoading, token] = get(sessionAtom);

  return {
    queryKey: ['league'],
    enabled: !isLoading && !!token,
    queryFn: async () => {
      if (!token) throw new Error('No token available');
      return fetchLeagueByUserId(token);
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  };
});
