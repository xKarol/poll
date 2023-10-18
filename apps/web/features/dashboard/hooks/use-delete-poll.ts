import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { deletePoll } from "../../../services/api";

export default function useDeletePoll(
  options?: UseMutationOptions<unknown, unknown, string, unknown>
) {
  return useMutation({ ...options, mutationFn: deletePoll });
}
