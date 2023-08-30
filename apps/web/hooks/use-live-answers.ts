import { useQueryClient } from "@tanstack/react-query";
import type { Poll, Answer } from "prisma";
import { useEffect } from "react";

import { pollKeys } from "../queries/poll";

export const useLiveAnswers = (pollId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const websocket = new WebSocket(process.env["NEXT_PUBLIC_WEBSOCKET_URL"]);

    websocket.onmessage = (message) => {
      const { data: msgData } = message;
      const parsedData: Answer[] = JSON.parse(msgData.toString());
      queryClient.setQueryData(
        pollKeys.single(pollId),
        (old: Poll & { answers: Answer[] }) => {
          return {
            ...old,
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
