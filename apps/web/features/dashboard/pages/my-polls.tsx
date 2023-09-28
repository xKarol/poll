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
    error,
    hasNextPage,
    fetchNextPage,
  } = useUserPolls();
  const data = pages?.pages.flatMap(({ data }) => data);
  return (
    <BaseLayout>
      <div className="flex items-center justify-between">
        <Heading className="mb-5">Your polls</Heading>
        <Button asChild>
          {/* TODO open as a modal */}
          <Link href={routes.CREATE_POLL}>
            <Icon.Plus />
            <span>Create a poll</span>
          </Link>
        </Button>
      </div>
      {error && <div>{getErrorMessage(error)}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col space-y-2">
          {data?.map((poll) => (
            <Link
              key={poll.id}
              href={routes.poll(poll.id)}
              className="flex justify-between border border-black px-4 py-2">
              <span>{poll.question}</span>
              <span>Total Votes:{poll.totalVotes}</span>
            </Link>
          ))}
          <div className="mx-auto">
            {isFetchingNextPage && <Loader />}
            {hasNextPage && (
              <button onClick={() => fetchNextPage()}>Fetch More</button>
            )}
          </div>
        </div>
      )}
    </BaseLayout>
  );
};

export default MyPollsPage;
