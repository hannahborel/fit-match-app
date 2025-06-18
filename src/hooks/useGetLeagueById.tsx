import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { apiUrl } from '@/constants/auth';

const fetchUserLeague = async (token: string | null) => {
  console.log('fetchUserLeague called with token:', token);
  const res = await fetch(`${apiUrl}/api/league-by-user-id`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Response status:', res.status);
  const data = await res.json();
  console.log('Response data:', data);
  return data;
};

export const useGetLeagueById = () => {
  console.log('useGetLeagueById hook called');
  const { getToken, isSignedIn } = useAuth();

  return useQuery({
    queryKey: ['league'],
    queryFn: async () => {
      console.log('Query function executing');
      const token = await getToken();
      console.log('Got token:', token);
      return fetchUserLeague(token);
    },
    enabled: isSignedIn, // Only run when user is signed in
  });
};
