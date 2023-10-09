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
import React, { useState } from "react";
import { useCopyToClipboard } from "react-use";

import { routes } from "../../../config/routes";
import { getBaseUrl } from "../../../utils/get-base-url";

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
      <div className="mb-2 px-4 py-2">
        <div className="flex [&>*]:max-w-[150px] [&>*]:flex-1">
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
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {data.map((poll) => (
          <PollItem
            key={poll.id}
            id={poll.id}
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

type PollItemsProps = (Pick<
  Poll,
  "id" | "question" | "isPublic" | "createdAt"
> & {
  totalVotes: number;
}) &
  Omit<React.ComponentProps<typeof Link>, "children">;

function PollItem({
  id,
  question,
  isPublic,
  createdAt,
  className,
  totalVotes,
  ...props
}: PollItemsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [, copy] = useCopyToClipboard();

  const handleCopy = (e: Event) => {
    e.preventDefault();
    setIsCopied(true);
    copy(`${getBaseUrl()}${routes.poll(id)}`);
  };

  return (
    <div
      className={cn(
        "flex rounded-[4px] border border-neutral-200 p-4 text-sm transition-colors hover:bg-neutral-700/5 dark:border-neutral-700/50",
        className
      )}>
      <Link
        className="flex w-full items-center justify-between [&>*]:max-w-[150px] [&>*]:flex-1"
        {...props}>
        <span className="!max-w-none">{question}</span>
        <span>{totalVotes}</span>
        <div>
          <span className="rounded-[2px] bg-neutral-200 p-1 text-xs dark:bg-neutral-800">
            {isPublic ? "Public" : "Private"}
          </span>
        </div>
        <div>{dayjs(createdAt).format("DD.MM.YYYY h:mm")}</div>
      </Link>
      <div className="flex">
        <DropdownMenu
          onOpenChange={(open) => {
            if (open && isCopied) {
              setIsCopied(false);
            }
          }}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="ml-auto rounded-[4px] p-1 transition-colors hover:bg-neutral-200 hover:dark:bg-neutral-800">
              <Icon.MoreHorizontal className="h-5 w-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={(e) => e.preventDefault()}>
            <DropdownMenuItem className="space-x-2" onSelect={handleCopy}>
              {isCopied ? (
                <Icon.Check className="h-4 w-4" />
              ) : (
                <Icon.Copy className="h-4 w-4" />
              )}
              <span>Copy link</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-2">
              <Icon.Share2 className="h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-2 text-red-400 [&>*]:pointer-events-none">
              <Icon.Trash2 className="h-4 w-4" />
              <span>Delete poll</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
