import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { pollOptions } from "../queries/poll";
import { useGetVotedAnswer } from "./use-get-voted-answer";

export const usePollAnswerUserChoice = (pollId: string | undefined) => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const { data } = useQuery({
    ...pollOptions.getPollAnswerUserChoice(pollId),
    enabled: !!pollId && isLoggedIn,
  });
  const { data: pollData } = useQuery(pollOptions.single(pollId));
  const answerId = useGetVotedAnswer(pollId, pollData.answers);

  if (status === "loading") return undefined;
  if (status === "unauthenticated") return answerId;
  return (
    (Object.keys(data || {}).length === 0 ? undefined : data.answerId) ||
    undefined
  );
};
