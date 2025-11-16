import { updateLeague } from '@/queries/updateLeague';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-expo';
import { useSetAtom } from 'jotai';
import { leagueAtom } from '@/atoms/leagueAtom';
import { League } from 'hustle-types';

export const useUpdateLeague = (onSuccessMsg?: string) => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const setLeagueAtom = useSetAtom(leagueAtom);

  const mutation = useMutation({
    mutationFn: updateLeague,
    onSuccess: (updatedLeague: League) => {
      // Update the atom immediately with the updated league data
      setLeagueAtom(updatedLeague);

      // Invalidate the league query cache to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['league', userId] });

      if (onSuccessMsg) {
        // Success message handling can be added here if needed
      }
    },
    onError: (err: Error) => {},
  });

  return mutation;
};
