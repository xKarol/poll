import { useRouter } from "next/router";
import React from "react";
import { useGetPoll } from "../hooks/use-get-poll";
import { CircularProgress } from "@mui/material";

import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import { useState } from "react";
import { useLiveAnswers } from "../hooks/use-live-answers";
import { LoadingButton } from "@mui/lab";
import { useVotePoll } from "../hooks/use-vote-poll";
import { AnswerItem } from "../components/answer-item";
import { useIsVoted } from "../hooks/use-is-voted";

const PollPage = () => {
  const router = useRouter();
  const pollId = router.query.pollId as string;
  const { error, isLoading, isSuccess, data } = useGetPoll(pollId);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>();
  const { mutateAsync, isLoading: isVoteLoading } = useVotePoll();
  const isVoted = useIsVoted(pollId);
  useLiveAnswers(pollId);

  const calcPercent = (votes: number) => {
    const percent = (votes / totalVotes) * 100;
    return Number.isNaN(percent) ? 0 : percent;
  };

  const totalVotes =
    data?.answers
      ?.map((answer) => answer.votes)
      .reduce((prev, next) => prev + next) || 0;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!selectedAnswerId) return;
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-2xl m-auto"
        >
          <h1 className="text-[32px] font-normal">{data.question}</h1>
          <RadioGroup
            className="flex flex-col space-y-4 my-10"
            onValueChange={onChange}
          >
            {data.answers.map((answer) => (
              <AnswerItem
                variant={isVoted ? "checked" : "default"}
                key={answer.id}
                text={answer.text}
                value={calcPercent(answer.votes)}
                RadioComponent={<RadioGroupItem value={answer.text} />}
              />
            ))}
          </RadioGroup>
          <div className="flex items-center justify-between">
            <p className="text-neutral-500 font-normal text-sm">
              Total Votes: {totalVotes}
            </p>
            <LoadingButton type="submit" loading={isVoteLoading}>
              Submit
            </LoadingButton>
          </div>
        </form>
      )}
    </>
  );
};

export default PollPage;
