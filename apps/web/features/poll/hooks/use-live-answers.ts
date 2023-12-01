import type { Poll, Answer } from "@poll/prisma";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { pollKeys } from "../../../queries/poll";

export const useLiveAnswers = (pollId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const websocket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL);

    websocket.onmessage = (message) => {
      const { data: msgData } = message;
      const parsedData: Answer[] = JSON.parse(msgData.toString());
      queryClient.setQueryData(
        pollKeys.single(pollId),
        (old: Poll & { answers: Answer[] }) => {
          return {
            ...old,
            totalVotes:
              parsedData
                ?.map((answer) => answer.votes)
                .reduce((prev, next) => prev + next) || old.totalVotes,
            answers: parsedData,
          };
        }
      );
    };

    return () => {
      websocket.close();
    };
  }, [pollId, queryClient]);
};
