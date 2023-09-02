import type { Answer, Poll } from "@poll/prisma";
import type { WebSocket as WebSocketType } from "@poll/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "react-use";

import { pollKeys } from "../queries/poll";
import { votePoll } from "../services/api";

export const useVotePoll = () => {
  const queryClient = useQueryClient();
  const [oldValue, setLocalStorageValue] = useLocalStorage("poll-voted", []);

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
      setLocalStorageValue([...oldValue, [pollId, answerId]]);

      const websocket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

      websocket.onopen = () => {
        const data: { e: WebSocketType.Events; data: string } = {
          e: "POLL_VOTES",
          data: pollId,
        };
        websocket.send(JSON.stringify(data));
      };
    },
  });
};
