import { CreateLeagueInput } from '@/types/types';
import { createLeague } from '@/queries/createLeague';
import { useMutation } from '@tanstack/react-query';

export const useCreateLeague = () => {
  return useMutation({
    mutationFn: async (data: CreateLeagueInput) => {
      createLeague(data);
    },
  });
};
export default useCreateLeague;
