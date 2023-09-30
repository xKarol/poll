import { useMutation } from "@tanstack/react-query";

import { updateUser } from "../../../services/api";

export const useUpdateAccount = () => {
  return useMutation({ mutationFn: updateUser });
};
