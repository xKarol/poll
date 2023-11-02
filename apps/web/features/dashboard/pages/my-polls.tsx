import {
  Button,
  Icon,
  Dialog,
  DialogContent,
  DialogTrigger,
  ScrollArea,
} from "@poll/ui";
import React from "react";

import { CreatePollForm } from "../../../components/create-poll-form";
import { getErrorMessage } from "../../../utils/error";
import { Header } from "../components";
import PollsTable from "../components/polls-table";
import { useUserPolls } from "../hooks";
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
      <Header
        heading="Your polls"
        ActionComponent={
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Icon.Plus />
                <span>Create a poll</span>
              </Button>
            </DialogTrigger>
            <DialogContent hideClose className="px-0">
              <ScrollArea className="h-[80vh] px-6">
                <CreatePollForm
                  ActionButtons={[
                    <Button variant="text" key="close-modal-btn" asChild>
                      <DialogTrigger>Close</DialogTrigger>
                    </Button>,
                  ]}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        }
      />
      <div className="flex flex-col">
        {error && <div>{getErrorMessage(error)}</div>}
        {isLoading && <Icon.Loader2 className="m-auto animate-spin" />}
        {isSuccess && (
          <PollsTable
            data={data}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
          />
        )}
      </div>
    </BaseLayout>
  );
};

export default MyPollsPage;
