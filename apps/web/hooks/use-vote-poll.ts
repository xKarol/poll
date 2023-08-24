import { useMutation, useQueryClient } from "@tanstack/react-query";
import { votePoll } from "../services/api";
import { pollKeys } from "../queries/poll";
import type { Answer, Poll } from "prisma";

export const useVotePoll = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pollId,
      answerId,
    }: {
      pollId: string;
      answerId: string;
    }) => {
      return votePoll(pollId, answerId);
    },
    onSuccess(_data, variables, _context) {
      const { pollId, answerId } = variables;
      queryClient.setQueryData(
        pollKeys.single(pollId),
        (old: Poll & { answers: Answer[] }) => {
          return {
            ...old,
            answers: old.answers.map((answer) => {
              if (answer.id === answerId) {
                return { ...answer, votes: answer.votes + 1 };
              }
              return answer;
            }),
          };
        }
      );
    },
  });
};
