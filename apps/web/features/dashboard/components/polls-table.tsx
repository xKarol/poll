import { cn } from "@poll/lib";
import type { Poll } from "@poll/prisma";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
} from "@poll/ui";
import type { FetchNextPageOptions } from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

import { routes } from "../../../config/routes";

type Props = {
  data: (Poll & { totalVotes: number })[];
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<unknown>;
};

function PollsTable({
  data,
  fetchNextPage,
  isFetchingNextPage = false,
  hasNextPage = false,
}: Props) {
  return (
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
        <span>Created At</span>
        <span></span>
      </div>
      <div className="flex flex-col space-y-2">
        {data.map((poll) => (
          <PollItem
            key={poll.id}
            href={routes.poll(poll.id)}
            question={poll.question}
            isPublic={poll.isPublic}
            createdAt={poll.createdAt}
            totalVotes={poll.totalVotes}
          />
        ))}
        <div className="mx-auto">
          {isFetchingNextPage && <Icon.Loader />}
          {hasNextPage && (
            <button onClick={() => fetchNextPage()}>Fetch More</button>
          )}
        </div>
      </div>
    </>
  );
}

export default PollsTable;

type PollItemsProps = (Pick<Poll, "question" | "isPublic" | "createdAt"> & {
  totalVotes: number;
}) &
  Omit<React.ComponentProps<typeof Link>, "children">;

function PollItem({
  question,
  isPublic,
  createdAt,
  className,
  totalVotes,
  ...props
}: PollItemsProps) {
  return (
    <Link
      className={cn(
        "flex items-center justify-between rounded-[4px] border border-neutral-700/50 p-4 text-sm transition-colors hover:bg-neutral-700/5 [&>*]:max-w-[150px] [&>*]:flex-1",
        className
      )}
      {...props}>
      <span className="!max-w-none">{question}</span>
      <span>{totalVotes}</span>
      <div>
        <span className="rounded-[2px] bg-neutral-800 p-1 text-xs">
          {isPublic ? "Public" : "Private"}
        </span>
      </div>
      <div>{dayjs(createdAt).format("DD.MM.YYYY h:mm")}</div>

      <div className="flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="ml-auto rounded-[4px] p-1 transition-colors hover:bg-neutral-800">
              <Icon.MoreHorizontal className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="space-x-2">
              <Icon.Copy className="h-4 w-4" />
              <span>Copy link</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-2">
              <Icon.Share2 className="h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-2 text-red-400 focus:bg-red-400">
              <Icon.Trash2 className="h-4 w-4" />
              <span>Delete poll</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
}
