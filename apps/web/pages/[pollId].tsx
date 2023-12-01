import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import React from "react";

import PollPage from "../features/poll";
import { BaseLayout } from "../layouts";
import { pollOptions } from "../queries/poll";
import { getLayout } from "../utils/get-layout";
import { getServerSession } from "../utils/get-server-session";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const pollId = context.params.pollId as string;

  try {
    await queryClient.fetchQuery(pollOptions.single(pollId));
  } catch {
    return {
      notFound: true,
    };
  }

  try {
    const { req, res } = context;
    await getServerSession({ req, res });

    await queryClient.fetchQuery(pollOptions.getPollVoters(pollId));
    // TODO for some reason cookies are not being passed in this request, SSR is disabled for now
    // await queryClient.fetchQuery(pollOptions.getPollAnswerUserChoice(pollId));
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

const Page = () => {
  return <PollPage />;
};
export default Page;

Page.getLayout = getLayout(BaseLayout);
