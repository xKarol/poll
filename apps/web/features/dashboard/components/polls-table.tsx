import { cn } from "@poll/lib";
import type { Poll } from "@poll/prisma";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  LoadingButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@poll/ui";
import {
  useQueryClient,
  type FetchNextPageOptions,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCopyToClipboard } from "react-use";

import { InfiniteScrollContainer } from "../../../components/infinite-scroll-container";
import { routes } from "../../../config/routes";
import { userKeys } from "../../../queries/user";
import { getBaseUrl } from "../../../utils/get-base-url";
import { useDeletePoll } from "../hooks";

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
      <InfiniteScrollContainer
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Date</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((poll) => (
              <PollItemRow
                key={poll.id}
                id={poll.id}
                question={poll.question}
                isPublic={poll.isPublic}
                createdAt={poll.createdAt}
                totalVotes={poll.totalVotes}
              />
            ))}
          </TableBody>
        </Table>
      </InfiniteScrollContainer>
    </>
  );
}

export default PollsTable;

type PollItemRowProps = (Pick<
  Poll,
  "id" | "question" | "isPublic" | "createdAt"
> & {
  totalVotes: number;
}) &
  Omit<React.ComponentPropsWithoutRef<"tr">, "children">;

function PollItemRow({
  id,
  question,
  isPublic,
  createdAt,
  className,
  totalVotes,
  ...props
}: PollItemRowProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [, copy] = useCopyToClipboard();
  const queryClient = useQueryClient();
  const { isLoading: isDeletePollLoading, mutate: deletePoll } = useDeletePoll({
    onSuccess: (_, pollId) => {
      toast("Poll has been deleted.", { icon: <Icon.Check /> });
      setOpenDeleteModal(false);

      queryClient.setQueryData(userKeys.userPolls, (data) => {
        return {
          // @ts-ignore
          ...data,
          // @ts-ignore
          pages: data.pages.map((page) => {
            return {
              ...page,
              data: page.data.filter((result) => result.id !== pollId),
            };
          }),
        };
      });
    },
  });

  useEffect(() => {
    if (isCopied) {
      toast("Copied to clipboard.", { icon: <Icon.Check /> });
    }
    const timeout = setTimeout(() => {
      if (isCopied) setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  const handleCopy = (e: Event) => {
    e.preventDefault();
    setIsCopied(true);
    copy(`${getBaseUrl()}${routes.poll(id)}`);
  };

  return (
    <>
      <TableRow key={id} className={cn("border-x", className)} {...props}>
        <TableCell className="max-w-xs truncate font-medium">
          {question}
        </TableCell>
        <TableCell>{totalVotes}</TableCell>
        <TableCell>
          <Badge variant="secondary">
            {isPublic ? (
              <>
                <Icon.Globe />
                <span>Public</span>
              </>
            ) : (
              <>
                <Icon.Lock />
                <span>Private</span>
              </>
            )}
          </Badge>
        </TableCell>
        <TableCell className="truncate text-right">
          {dayjs(createdAt).format("DD.MM.YYYY h:mm")}
        </TableCell>
        <TableCell className="text-right">
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
              <DropdownMenuItem className="space-x-2" asChild>
                <Link href={routes.poll(id)}>
                  <Icon.ExternalLink className="h-4 w-4" />
                  <span>Open link</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="space-x-2" onSelect={handleCopy}>
                {isCopied ? (
                  <Icon.Check className="h-4 w-4" />
                ) : (
                  <Icon.Copy className="h-4 w-4" />
                )}
                <span>Copy link</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="space-x-2" asChild>
                <Link href={routes.DASHBOARD.ANALYTICS.poll(id)}>
                  <Icon.BarChart2 className="h-4 w-4" />
                  <span>Analytics</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="space-x-2 text-red-400 [&>*]:pointer-events-none"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenDeleteModal(true);
                }}>
                <Icon.Trash2 className="h-4 w-4" />
                <span>Delete poll</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} hideClose>
          <DialogHeader>
            <DialogTitle>Delete poll</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this poll?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="text">Cancel</Button>
            </DialogTrigger>
            <LoadingButton
              variant="destructive"
              isLoading={isDeletePollLoading}
              onClick={() => deletePoll(id)}>
              <Icon.Trash2 />
              <span>Delete poll</span>
            </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
