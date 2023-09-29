import { Button, Icon, Dialog, DialogContent, DialogTrigger } from "@poll/ui";
import React from "react";

import { CreatePollForm } from "../../../components/create-poll-form";
import { getErrorMessage } from "../../../utils/error";
import Heading from "../components/heading";
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
      <div className="mb-8 flex items-center justify-between">
        <Heading className="mb-5">Your polls</Heading>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Icon.Plus />
              <span>Create a poll</span>
            </Button>
          </DialogTrigger>
          <DialogContent hideClose>
            <CreatePollForm
              ActionButtons={[
                <Button variant="text" key="close-modal-btn" asChild>
                  <DialogTrigger>Close</DialogTrigger>
                </Button>,
              ]}
            />
          </DialogContent>
        </Dialog>
      </div>
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
