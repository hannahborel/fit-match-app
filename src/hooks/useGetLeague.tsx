import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { fetchLeagueByUserId } from '@/queries/fetchLeagueByUserId';

export const useGetLeague = () => {
  const { getToken } = useAuth();
  return useQuery({
    queryKey: ['league'],
    queryFn: async () => {
      const token = await getToken();

      return fetchLeagueByUserId(token);
    },
    enabled: true, // Only run when user is signed in
  });
};
