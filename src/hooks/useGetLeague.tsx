import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { fetchLeagueByUserId } from '@/app/queries/fetchLeagueByUserId';

export const useGetLeague = () => {
  console.log('useGetLeagueById hook called');
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['league'],
    queryFn: async () => {
      const token = await getToken();

      return fetchLeagueByUserId(token);
    },
    enabled: isSignedIn, // Only run when user is signed in
  });
};
