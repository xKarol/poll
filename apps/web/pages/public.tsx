import { Button, Icon, Skeleton } from "@poll/ui";
import { Loader } from "lucide-react";
import { NextSeo } from "next-seo";
import Link from "next/link";

import Header from "../components/header";
import { routes } from "../config/routes";
import { usePolls } from "../hooks/use-polls";
import dayjs from "../lib/dayjs";
import { getErrorMessage } from "../utils/error";

export default function Page() {
  const {
    data: pages,
    isLoading,
    isSuccess,
    isError,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
  } = usePolls();
  const data = pages?.pages.flatMap(({ data }) => data);
  return (
    <>
      <Header />

      <NextSeo title="Public Polls" />
      <div className="container mt-8 space-y-8 md:max-w-2xl lg:mt-16 xl:max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Public Polls</h1>
          <Button className="space-x-1 bg-neutral-100 text-neutral-900 hover:bg-neutral-100/50 dark:bg-neutral-800 dark:text-white">
            <span>Recent</span>
            <Icon.ChevronDown />
          </Button>
        </div>
        {isLoading && (
          <div className="flex flex-col space-y-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-40" />
            ))}
          </div>
        )}
        {/* TODO ADD error UI */}
        {isError && <div>{getErrorMessage(error)}</div>}
        {isSuccess && (
          <div className="flex flex-col space-y-8">
            <ul className="flex flex-col space-y-8">
              {data?.map((poll) => (
                <Link
                  key={poll.id}
                  href={routes.poll(poll.id)}
                  className="space-y-4 rounded-[4px] bg-neutral-100 px-3 py-4 dark:bg-neutral-800">
                  <h1 className="text-lg">{poll.question}</h1>
                  <div className="flex items-center justify-between text-sm font-normal text-neutral-400">
                    <span>{dayjs(poll.createdAt).fromNow()}</span>
                    <span>{poll.totalVotes} votes</span>
                  </div>
                </Link>
              ))}
            </ul>

            <div className="mx-auto">
              {isFetchingNextPage && <Loader />}
              {hasNextPage && (
                <button onClick={() => fetchNextPage()}>Fetch More</button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
