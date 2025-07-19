import { updateLeague } from '@/queries/updateLeague';
import { useMutation } from '@tanstack/react-query';

export const useUpdateLeague = (onSuccessMsg?: string) => {
  const mutation = useMutation({
    mutationFn: updateLeague,
    onSuccess: () => {
      if (onSuccessMsg) {
        console.log(onSuccessMsg);
      }
    },
    onError: (err: Error) => {
      console.error('League update error:', err.message);
    },
  });

  return mutation;
};
