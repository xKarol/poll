import { Icon } from "@poll/ui";
import dayjs from "dayjs";
import React from "react";

import { InfiniteScrollContainer } from "../../../components/infinite-scroll-container";
import { getErrorMessage } from "../../../utils/error";
import Heading from "../components/heading";
import { useUserPollVotes } from "../hooks";
import { BaseLayout } from "../layouts";

const MyVotesPage = () => {
  const {
    error,
    isLoading,
    isSuccess,
    data: pages,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useUserPollVotes();
  const data = pages?.pages.flatMap(({ data }) => data);

  return (
    <BaseLayout>
      <Heading className="mb-5">Your votes</Heading>
      <div>
        {error && <div>{getErrorMessage(error)}</div>}
        {isLoading && <Icon.Loader2 className="m-auto animate-spin" />}
        {isSuccess && (
          <>
            <div className="mb-2 flex px-4 py-2 [&>*]:max-w-[150px] [&>*]:flex-1">
              <span className="!max-w-none">Question</span>
              <span className="!max-w-none">Answer option</span>
              <span>Poll type</span>
              <span>Voted Date</span>
              <span className="space-x-2"></span>
            </div>
            <InfiniteScrollContainer
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}>
              <div className="flex flex-col space-y-2">
                {data?.map((vote) => (
                  <div
                    key={vote.id}
                    className="flex items-center justify-between rounded-[4px] border border-neutral-700/50 px-4 py-2 text-sm transition-colors hover:bg-neutral-700/5 [&_*]:max-w-[150px] [&_*]:flex-1">
                    {/* @ts-expect-error TODO fix */}
                    <span className="!max-w-none">{vote.poll.question}</span>
                    <span className="!max-w-none">{vote.answer.text}</span>
                    <div>
                      <span className="rounded-[2px] bg-neutral-800 p-1 text-xs">
                        {/* @ts-expect-error TODO fix */}
                        {vote.poll.isPublic ? "Public" : "Private"}
                      </span>
                    </div>
                    <span>
                      {dayjs(vote.createdAt).format("DD.MM.YYYY h:mm")}
                    </span>
                    <Icon.MoreHorizontal />
                  </div>
                ))}
              </div>
            </InfiniteScrollContainer>
          </>
        )}
      </div>
    </BaseLayout>
  );
};

export default MyVotesPage;
