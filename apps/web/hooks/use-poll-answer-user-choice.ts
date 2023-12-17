import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { pollOptions } from "../queries/poll";
import { useGetPoll } from "./use-get-poll";
import { useGetVotedAnswer } from "./use-get-voted-answer";

export const usePollAnswerUserChoice = (
  pollId: string | undefined
): string | undefined => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const { data: userChoice } = useQuery(
    pollOptions.getPollAnswerUserChoice(pollId, {
      enabled: !!pollId && isLoggedIn,
    })
  );
  const { data: pollData } = useGetPoll(pollId);
  const answerId = useGetVotedAnswer(pollId, pollData?.answers ?? []);

  if (status === "loading") return undefined;
  if (status === "unauthenticated") return answerId;
  if (userChoice?.answerId) return userChoice.answerId as string;
  return undefined;
};
