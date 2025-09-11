import { updateLeague } from '@/queries/updateLeague';
import { useMutation } from '@tanstack/react-query';

export const useUpdateLeague = (onSuccessMsg?: string) => {
  const mutation = useMutation({
    mutationFn: updateLeague,
    onSuccess: () => {
      if (onSuccessMsg) {
      }
    },
    onError: (err: Error) => {},
  });

  return mutation;
};
