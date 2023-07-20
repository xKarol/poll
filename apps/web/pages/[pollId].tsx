import { useRouter } from "next/router";
import React from "react";
import { useGetPoll } from "../hooks/use-get-poll";
import { CircularProgress, LinearProgress } from "@mui/material";

const PollPage = () => {
  const router = useRouter();
  const pollId = router.query.pollId as string;
  const { error, isLoading, isSuccess, data } = useGetPoll(pollId);
  console.log(data);

  const calcPercent = (votes: number) => {
    const percent = (votes / maxVotes) * 100;
    return Number.isNaN(percent) ? 0 : percent;
  };

  const maxVotes =
    data?.answers
      .map((answer) => answer.votes)
      .reduce((prev, next) => prev + next) || 0;

  if (isLoading) return <CircularProgress />;
  return (
    <>
      <p>Poll: {pollId}</p>
      <p>Error: {JSON.stringify(error)}</p>
      {isSuccess &&
        data.answers.map((answer) => (
          <div className="border border-black py-2 px-4" key={answer.id}>
            {answer.text} {answer.votes}/{maxVotes} ({calcPercent(answer.votes)}
            %)
            <LinearProgress
              variant="determinate"
              value={calcPercent(answer.votes)}
            />
          </div>
        ))}
    </>
  );
};

export default PollPage;
