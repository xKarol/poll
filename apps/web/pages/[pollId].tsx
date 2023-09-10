import { LoadingButton } from "@mui/lab";
import { Avatar, AvatarGroup, CircularProgress } from "@mui/material";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ResponsiveContainer, Pie, PieChart, Cell, Legend } from "recharts";

import { AnswerItem } from "../components/answer-item";
import Header from "../components/header";
import { RadioGroup, RadioGroupItem } from "../components/radio-group";
import { useGetPoll } from "../hooks/use-get-poll";
import { useGetPollVoters } from "../hooks/use-get-poll-voters";
import { useIsVoted } from "../hooks/use-is-voted";
import { useLiveAnswers } from "../hooks/use-live-answers";
import { useVotePoll } from "../hooks/use-vote-poll";
import dayjs from "../lib/dayjs";
import { pollOptions } from "../queries/poll";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const queryClient = new QueryClient();
    const pollId = context.params.pollId as string;
    await queryClient.fetchQuery(pollOptions.single(pollId));
    await queryClient.fetchQuery(pollOptions.getPollVoters(pollId));
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

const colors = ["#9ECE9A", "#74A57F", "#077187", "#8CABBE"];

const PollPage = () => {
  const router = useRouter();
  const pollId = router.query.pollId as string;
  const { isLoading, isSuccess, data } = useGetPoll(pollId);
  const { data: voters } = useGetPollVoters(pollId);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>();
  const { mutateAsync, isLoading: isVoteLoading } = useVotePoll();
  const isVoted = useIsVoted(pollId);
  useLiveAnswers(pollId);

  console.log(voters);

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
  const dataChart = data.answers.map((answer) => ({
    name: answer.text,
    value: (answer.votes / totalVotes) * 100,
  }));

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    payload,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {percent > 0 &&
          ((payload.name as string).length > 5
            ? payload.name.slice(0, 5) + "..."
            : payload.name)}
      </text>
    );
  };

  if (isLoading) return <CircularProgress />;
  return (
    <>
      <Header />
      {isSuccess && (
        <>
          <NextSeo title={data.question} />
          <form
            onSubmit={handleSubmit}
            className="container flex flex-col m-auto mt-3 md:mt-8 xl:mt-16">
            <div className="space-y-4 leading-[2]">
              <h1 className="text-[22px] md:text-2xl xl:text-[32px] font-normal leading-[1.2]">
                {data.question}
              </h1>
              <span className="text-base font-normal text-neutral-400">
                by a {data.user?.name || "guest"} ·{" "}
                {dayjs(data.createdAt).fromNow()}
              </span>
            </div>
            <RadioGroup
              className="flex flex-col my-10"
              onValueChange={onChange}>
              {data.answers.map((answer, index) => (
                <AnswerItem
                  variant={
                    // TODO checking which item is selected
                    index === 0 ? "selected" : isVoted ? "result" : "default"
                  }
                  key={answer.id}
                  text={answer.text}
                  value={calcPercent(answer.votes)}
                  RadioComponent={
                    <RadioGroupItem
                      value={answer.text}
                      disabled={index === 0} //TODO
                      className="w-[30px] h-[30px] border-[3px] border-neutral-300"
                    />
                  }
                />
              ))}
            </RadioGroup>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {voters?.length >= 2 ? (
                  <AvatarGroup max={4} total={4} spacing="small">
                    {voters.map((voter) => (
                      <Avatar
                        key={voter.id}
                        alt={`${voter.name} voter`}
                        src={voter.image}
                        sx={{ width: 30, height: 30 }}>
                        {voter.name[0]}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                ) : null}
                <p className="text-base font-normal">
                  Total Votes: {totalVotes}
                </p>
              </div>
              {!isVoted ? (
                <LoadingButton type="submit" loading={isVoteLoading}>
                  Vote
                </LoadingButton>
              ) : null}
            </div>
          </form>
          {isVoted && (
            <ResponsiveContainer width={"100%"} height={400}>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  data={dataChart}
                  cx={"50%"}
                  cy={"50%"}
                  strokeWidth={2}
                  outerRadius={120}
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}>
                  {dataChart.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </>
      )}
    </>
  );
};

export default PollPage;
