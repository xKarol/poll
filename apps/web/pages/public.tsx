import type { Poll } from "@poll/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@poll/ui";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useState } from "react";

import { InfiniteScrollContainer } from "../components/infinite-scroll-container";
import { routes } from "../config/routes";
import { usePolls } from "../hooks/use-polls";
import { BaseLayout } from "../layouts";
import dayjs from "../lib/dayjs";
import { getErrorMessage } from "../utils/error";

type SortValue = `${Poll.SortPollFields}.${"desc" | "asc"}`;

export default function PublicPage() {
  const [sortValue, setSortValue] = useState<SortValue>("createdAt.desc");
  const [sortBy, orderBy] = sortValue.split(".");
  const {
    data: pages,
    isLoading,
    isSuccess,
    isError,
    isFetchingNextPage,
    error,
    hasNextPage,
    fetchNextPage,
    // @ts-expect-error
  } = usePolls({ sortBy, orderBy });
  const data = pages?.pages.flatMap(({ data }) => data);

  return (
    <>
      <NextSeo title="Public Polls" />
      <div className="container mt-8 space-y-8 md:max-w-2xl lg:mt-16 xl:max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Public Polls</h1>
          <Select onValueChange={(value: SortValue) => setSortValue(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                <SelectSeparator />
                <SelectItem value="createdAt.desc">
                  Date - Descending
                </SelectItem>
                <SelectItem value="createdAt.asc">Date - Ascending</SelectItem>
                <SelectItem value="totalVotes.desc">
                  Votes - Descending
                </SelectItem>
                <SelectItem value="totalVotes.asc">
                  Votes - Ascending
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {isLoading && (
          <div className="flex flex-col space-y-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="space-y-6 px-3 py-4">
                <Skeleton className="h-6 w-3/4 max-w-full" />
                <Skeleton className="h-4 w-20 max-w-full" />
              </Skeleton>
            ))}
          </div>
        )}
        {/* TODO ADD error UI */}
        {isError && <div>{getErrorMessage(error)}</div>}
        {isSuccess && (
          <InfiniteScrollContainer
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}>
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
          </InfiniteScrollContainer>
        )}
      </div>
    </>
  );
}

PublicPage.Layout = BaseLayout;
