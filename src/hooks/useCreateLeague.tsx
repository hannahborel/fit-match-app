// hooks/useCreateLeague.ts
import { useMutation } from "@tanstack/react-query";
import { createLeague } from "@/queries/createLeague";

export const useCreateLeague = () => {
  return useMutation({
    mutationFn: createLeague,
  });
};
