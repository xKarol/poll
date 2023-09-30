import { type UseMutationOptions, useMutation } from "@tanstack/react-query";

import { updateUser } from "../../../services/api";

export const useUpdateAccount = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Omit<UseMutationOptions<any, any, any, any>, "mutationFn"> = {}
) => {
  return useMutation({ ...options, mutationFn: updateUser });
};
