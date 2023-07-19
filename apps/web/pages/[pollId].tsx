import { useRouter } from "next/router";
import React from "react";
import { useGetPoll } from "../hooks/use-get-poll";

const PollPage = () => {
  const router = useRouter();
  const pollId = router.query.pollId as string;
  const { error, isLoading, isSuccess, data } = useGetPoll(pollId);
  console.log(data);
  return (
    <>
      <p>Poll: {pollId}</p>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Loading: {isLoading}</p>
      {isSuccess &&
        data.answers.map((answer) => (
          <div className="border border-black py-2 px-4" key={answer.id}>
            {answer.text}/{answer.votes}
          </div>
        ))}
    </>
  );
};

export default PollPage;
