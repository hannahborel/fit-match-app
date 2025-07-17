import { CreateLeagueInput } from '@/types/types';
import { createLeague } from '@/mutations/createLeague';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';

export const useCreateLeague = () => {
  const { getToken } = useAuth();
  return useMutation({
    mutationFn: async (data: CreateLeagueInput) => {
      const token = await getToken();
      return createLeague(data, token);
    },
  });
};
export default useCreateLeague;
