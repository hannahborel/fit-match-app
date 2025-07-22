// import { atomWithQuery } from 'jotai-tanstack-query';
// import { sessionAtom } from './sessionAtom';
// import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';
// import { League } from 'hustle-types';

// export const leagueQueryAtom = atomWithQuery<League>((get) => {
//   const [isLoading, token] = get(sessionAtom);

//   return {
//     queryKey: ['league'],
//     enabled: !isLoading && !!token,
//     queryFn: async () => {
//       if (!token) throw new Error('No token available');
//       const league = await fetchLeagueByUserId(token);
//       if (!league) throw new Error('No league returned');
//       return league;
//     },
//     staleTime: 1000 * 60 * 5,
//     keepPreviousData: true,
//   };
// });
