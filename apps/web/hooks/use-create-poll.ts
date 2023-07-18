import { useMutation } from "@tanstack/react-query";
import { createPoll } from "../services/api";

export const useCreatePoll = () => {
  return useMutation({ mutationFn: createPoll });
};
