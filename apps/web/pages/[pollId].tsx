import { useRouter } from "next/router";
import React from "react";
import { useGetPoll } from "../hooks/use-get-poll";
import { CircularProgress, LinearProgress } from "@mui/material";

import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import { useState } from "react";

const PollPage = () => {
  const router = useRouter();
  const pollId = router.query.pollId as string;
  const { error, isLoading, isSuccess, data } = useGetPoll(pollId);
  const [selected, setSelected] = useState<string>();

  const calcPercent = (votes: number) => {
    const percent = (votes / maxVotes) * 100;
    return Number.isNaN(percent) ? 0 : percent;
  };

  const maxVotes =
    data?.answers
      .map((answer) => answer.votes)
      .reduce((prev, next) => prev + next) || 0;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(selected);
  };

  const onChange = (value: string) => {
    if (!data.answers) return;
    const [answer] = data.answers.filter((answer) => answer.text === value);
    setSelected(answer.id);
  };

  if (isLoading) return <CircularProgress />;
  return (
    <>
      <p>Poll: {pollId}</p>
      <p>Error: {JSON.stringify(error)}</p>
      {isSuccess && (
        <form onSubmit={handleSubmit}>
          <RadioGroup
            className="flex flex-col space-y-1"
            onValueChange={onChange}
          >
            {data.answers.map((answer, index) => (
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
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default PollPage;
