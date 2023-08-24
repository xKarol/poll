import { useRouter } from "next/router";
import React from "react";
import { useGetPoll } from "../hooks/use-get-poll";
import { CircularProgress, LinearProgress } from "@mui/material";

import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import { useState } from "react";
import { useLiveAnswers } from "../hooks/use-live-answers";
import { LoadingButton } from "@mui/lab";
import { useVotePoll } from "../hooks/use-vote-poll";

const PollPage = () => {
  const router = useRouter();
  const pollId = router.query.pollId as string;
  const { error, isLoading, isSuccess, data } = useGetPoll(pollId);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>();
  const { mutateAsync, isLoading: isVoteLoading } = useVotePoll();
  useLiveAnswers(pollId);

  const calcPercent = (votes: number) => {
    const percent = (votes / maxVotes) * 100;
    return Number.isNaN(percent) ? 0 : percent;
  };

  const maxVotes =
    data?.answers
      ?.map((answer) => answer.votes)
      .reduce((prev, next) => prev + next) || 0;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await mutateAsync({ pollId, answerId: selectedAnswerId });
  };

  const onChange = (value: string) => {
    if (!data.answers) return;
    const [answer] = data.answers.filter((answer) => answer.text === value);
    setSelectedAnswerId(answer.id);
  };

  if (isLoading) return <CircularProgress />;
  return (
    <>
      <p>Poll: {pollId}</p>
      <p>Error: {JSON.stringify(error)}</p>
      {isSuccess && (
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl">{data.question}</h1>
          <RadioGroup
            className="flex flex-col space-y-1"
            onValueChange={onChange}
          >
            {data.answers.map((answer) => (
              <div className="border border-black py-2 px-4" key={answer.id}>
                <div className="flex items-center space-x-3 space-y-0">
                  <div>
                    <RadioGroupItem value={answer.text} />
                  </div>
                  <label className="font-normal">{answer.text}</label>
                </div>
                {answer.text} {answer.votes}/{maxVotes} (
                {calcPercent(answer.votes)}
                %)
                <LinearProgress
                  variant="determinate"
                  value={calcPercent(answer.votes)}
                />
              </div>
            ))}
          </RadioGroup>
          <LoadingButton type="submit" loading={isVoteLoading}>
            Submit
          </LoadingButton>
        </form>
      )}
    </>
  );
};

export default PollPage;
