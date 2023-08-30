import { useQueryClient } from "@tanstack/react-query";
import { useAtom, atom } from "jotai";
import { useEffect, useCallback } from "react";

import { pollKeys } from "../queries/poll";

const isVotedAtom = atom(false);

export const useIsVoted = (pollId: string) => {
  const [isVoted, setIsVoted] = useAtom(isVotedAtom);
  const queryClient = useQueryClient();

  const checkIsVoted = useCallback(() => {
    const votedPolls = JSON.parse(localStorage.getItem("poll-voted"));
    return Array.isArray(votedPolls)
      ? votedPolls.filter(([votedPoll]) => votedPoll === pollId).length !== 0
      : false;
  }, [pollId]);

  useEffect(() => {
    queryClient.getQueryCache().subscribe((queryCacheNotifyEvent) => {
      if (!queryCacheNotifyEvent) return;

      if (
        JSON.stringify(queryCacheNotifyEvent.query.queryKey) ===
        JSON.stringify(pollKeys.single(pollId))
      ) {
        setIsVoted(checkIsVoted());
      }
    });
  }, [pollId, queryClient, checkIsVoted, setIsVoted]);

  return isVoted;
};
