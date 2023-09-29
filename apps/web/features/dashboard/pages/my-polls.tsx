import { Button, Icon } from "@poll/ui";
import { Loader } from "lucide-react";
import Link from "next/link";
import React from "react";

import { routes } from "../../../config/routes";
import { useUserPolls } from "../../../hooks/use-user-polls";
import { getErrorMessage } from "../../../utils/error";
import Heading from "../components/heading";
import { BaseLayout } from "../layouts";

const MyPollsPage = () => {
  const {
    data: pages,
    isLoading,
    isFetchingNextPage,
    isSuccess,
    error,
    hasNextPage,
    fetchNextPage,
  } = useUserPolls();
  const data = pages?.pages.flatMap(({ data }) => data);
  return (
    <BaseLayout>
      <div className="mb-8 flex items-center justify-between">
        <Heading className="mb-5">Your polls</Heading>
        <Button asChild>
          {/* TODO open as a modal */}
          <Link href={routes.CREATE_POLL}>
            <Icon.Plus />
            <span>Create a poll</span>
          </Link>
        </Button>
      </div>
      <div className="flex flex-col">
        {error && <div>{getErrorMessage(error)}</div>}
        {isLoading && <Icon.Loader2 className="m-auto animate-spin" />}
        {isSuccess && (
          <>
            <div className="mb-2 flex px-4 py-2 [&>*]:max-w-[150px] [&>*]:flex-1">
              <span className="!max-w-none space-x-2">Question</span>
              <div>
                <div className="flex items-center space-x-2">
                  <span>Votes</span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span>Public</span>
                </div>
              </div>
              <span className="space-x-2"></span>
            </div>
            <div className="flex flex-col space-y-2">
              {data?.map((poll) => (
                <Link
                  key={poll.id}
                  href={routes.poll(poll.id)}
                  className="flex items-center justify-between rounded-[4px] border border-neutral-700/50 px-4 py-2 text-sm transition-colors hover:bg-neutral-700/5 [&_*]:max-w-[150px] [&_*]:flex-1">
                  <span className="!max-w-none">{poll.question}</span>
                  <span>{poll.totalVotes}</span>
                  <div className="">
                    <span className="rounded-[2px] bg-neutral-800 p-1 text-xs">
                      {poll.isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                  <Icon.MoreHorizontal />
                </Link>
              ))}
              <div className="mx-auto">
                {isFetchingNextPage && <Loader />}
                {hasNextPage && (
                  <button onClick={() => fetchNextPage()}>Fetch More</button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </BaseLayout>
  );
};

export default MyPollsPage;
