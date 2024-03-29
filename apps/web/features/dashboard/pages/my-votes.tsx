import { Icon } from "@poll/ui";
import React from "react";

import { getErrorMessage } from "../../../utils/get-error-message";
import { Header } from "../components";
import { VotesTable } from "../components/votes-table";
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
      <Header heading="Your votes" />

      <div>
        {error && <div>{getErrorMessage(error)}</div>}
        {isLoading && <Icon.Loader2 className="m-auto animate-spin" />}
        {isSuccess && (
          <VotesTable
            data={data}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        )}
      </div>
    </BaseLayout>
  );
};

export default MyVotesPage;
