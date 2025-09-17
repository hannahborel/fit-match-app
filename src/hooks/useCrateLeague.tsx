import { CreateLeagueInput } from 'hustle-types';
import { createLeague } from '@/mutations/createLeague';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { useAtom } from 'jotai';
import { leagueAtom } from '@/atoms/leagueAtom';
import { League } from 'hustle-types';

export const useCreateLeague = () => {
  const { getToken, userId } = useAuth();
  const queryClient = useQueryClient();
  const [, setLeagueAtom] = useAtom(leagueAtom);

  return useMutation({
    mutationFn: async (data: CreateLeagueInput) => {
      const token = await getToken();
      return createLeague(data, token);
    },
    onSuccess: async (newLeague: League) => {
      // Update the atom immediately with the new league data
      setLeagueAtom(newLeague);

      // Also invalidate the query cache for consistency
      queryClient.invalidateQueries({ queryKey: ['league', userId] });
    },
  });
};
export default useCreateLeague;
