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
      // Merge with existing data to preserve fields not included in the update
      setLeagueAtom((prev) => ({
        ...prev,
        ...updatedLeague,
      } as League));

      // Update the query cache directly to prevent refetch and eliminate blinking
      // Also merge with existing cache data
      queryClient.setQueryData(['league', userId], (oldData: League | undefined) => ({
        ...oldData,
        ...updatedLeague,
      } as League));

      if (onSuccessMsg) {
        // Success message handling can be added here if needed
      }
    },
    onError: (err: Error) => {},
  });

  return mutation;
};
