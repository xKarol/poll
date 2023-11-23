import { useMutation, useQueryClient } from "@tanstack/react-query";

import { pollKeys } from "../queries/poll";
import { userKeys } from "../queries/user";
import { createPoll } from "../services/api";

export const useCreatePoll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPoll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pollKeys.all() });
      queryClient.invalidateQueries({ queryKey: userKeys.getUserPolls });
    },
  });
};
