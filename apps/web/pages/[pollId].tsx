import { useRouter } from "next/router";
import React from "react";
import { useGetPoll } from "../hooks/use-get-poll";

const PollPage = () => {
  const router = useRouter();
  const pollId = router.query.pollId as string;
  const { error, isLoading, data } = useGetPoll(pollId);
  return (
    <>
      <p>Poll: {pollId}</p>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Loading: {isLoading}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </>
  );
};

export default PollPage;
