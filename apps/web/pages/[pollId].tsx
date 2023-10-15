import { Avatar, AvatarGroup, CircularProgress } from "@mui/material";
import { Alert, AlertTitle, Icon, Input, LoadingButton, toast } from "@poll/ui";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useMemo, useRef, useState } from "react";
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from "react-google-recaptcha";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useCopyToClipboard } from "react-use";
import { ResponsiveContainer, Pie, PieChart, Cell, Legend } from "recharts";

import { AnswerItem } from "../components/answer-item";
import { RadioGroup } from "../components/radio-group";
import { useGetPoll } from "../hooks/use-get-poll";
import { useGetPollVoters } from "../hooks/use-get-poll-voters";
import { useLiveAnswers } from "../hooks/use-live-answers";
import { usePollAnswerUserChoice } from "../hooks/use-poll-answer-user-choice";
import { useVotePoll } from "../hooks/use-vote-poll";
import { BaseLayout } from "../layouts";
import dayjs from "../lib/dayjs";
import { pollOptions } from "../queries/poll";
import { getErrorMessage } from "../utils/error";
import { getServerSession } from "../utils/get-server-session";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { req, res } = context;
    await getServerSession({ req, res });
    const queryClient = new QueryClient();
    const pollId = context.params.pollId as string;
    await queryClient.fetchQuery(pollOptions.single(pollId));
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
  const {
    mutateAsync,
    isLoading: isVoteLoading,
    error: voteError,
  } = useVotePoll();
  const userChoiceAnswerId = usePollAnswerUserChoice(pollId);
  const recaptchaRef = useRef<ReCAPTCHA>();
  const [, copy] = useCopyToClipboard();
  useLiveAnswers(pollId);

  const sortedAnswers = useMemo(
    () =>
      data.answers.sort((a, b) => {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }),
    [data.answers]
  );
  const isVoted = !!userChoiceAnswerId;
  const shareUrl =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}${router.asPath}`;

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
    try {
      if (!selectedAnswerId) return;
      const token = await recaptchaRef.current.executeAsync();
      await mutateAsync({
        pollId,
        answerId: selectedAnswerId,
        reCaptchaToken: token,
      });
    } catch (error) {
      toast("Something went wrong...", { icon: <Icon.AlertCircle /> });
      console.log(error);
    }
  };

  const onChange = (value: string) => {
    if (!data.answers) return;
    const [answer] = data.answers.filter((answer) => answer.text === value);
    setSelectedAnswerId(answer.id);
  };

  const copyLink = () => {
    copy(shareUrl);
    toast("Copied to clipboard", { icon: <Icon.Check /> });
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
      {isSuccess && (
        <>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            hidden={!data.requireRecaptcha || isVoted}
          />
          <NextSeo title={data.question} />
          <div className="container m-auto flex flex-col space-y-16 xl:max-w-6xl">
            <form onSubmit={handleSubmit} className="flex flex-col">
              {voteError ? (
                <Alert variant="error" className="mb-4 xl:mb-8">
                  <AlertTitle>{getErrorMessage(voteError)}</AlertTitle>
                </Alert>
              ) : null}
              <div className="space-y-4 leading-[2]">
                <h1 className="text-[22px] font-normal leading-[1.2] md:text-2xl xl:text-[32px]">
                  {data.question}
                </h1>
                <span className="text-base font-normal text-neutral-400">
                  by a {data.user?.name || "guest"} ·{" "}
                  {dayjs(data.createdAt).fromNow()}
                </span>
              </div>
              <RadioGroup
                className="my-10 flex flex-col"
                onValueChange={onChange}>
                {sortedAnswers.map((answer) => (
                  <AnswerItem
                    variant={
                      userChoiceAnswerId === answer.id
                        ? "selected"
                        : isVoted
                        ? "result"
                        : "default"
                    }
                    key={answer.id}
                    text={answer.text}
                    value={calcPercent(answer.votes)}
                    RadioComponent={
                      <RadioGroupPrimitive.Item
                        value={answer.text}
                        className="aspect-square h-[30px] w-[30px] rounded-full border-[3px] border-neutral-300 text-white ring-offset-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state='checked']:border-black data-[state='checked']:bg-black dark:border-neutral-700 dark:text-black dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 data-[state='checked']:dark:border-white data-[state='checked']:dark:bg-white">
                        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                          <svg
                            className="h-4 w-4 text-current"
                            width="17"
                            height="15"
                            viewBox="0 0 17 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M15.837 3.11839L7.87326 13.574C7.71092 13.7849 7.50245 13.9558 7.26381 14.0736C7.02518 14.1914 6.76273 14.253 6.4966 14.2537C6.23191 14.2551 5.97037 14.1962 5.73184 14.0815C5.49331 13.9667 5.28404 13.7992 5.11994 13.5915L0.867974 8.17196C0.727236 7.99117 0.62348 7.78444 0.562639 7.56355C0.501798 7.34267 0.485061 7.11197 0.513378 6.88462C0.541696 6.65726 0.614515 6.43772 0.727681 6.23851C0.840846 6.0393 0.992144 5.86433 1.17293 5.72359C1.53804 5.43936 2.00112 5.31181 2.46027 5.369C2.68762 5.39731 2.90717 5.47013 3.10638 5.5833C3.30559 5.69647 3.48056 5.84776 3.6213 6.02855L6.46175 9.65318L13.0488 0.940129C13.1884 0.757055 13.3627 0.603268 13.5617 0.48755C13.7607 0.371832 13.9806 0.296448 14.2088 0.265703C14.4369 0.234958 14.6689 0.249454 14.8915 0.308362C15.114 0.367271 15.3228 0.469439 15.5059 0.609033C15.689 0.748627 15.8428 0.922915 15.9585 1.12194C16.0742 1.32097 16.1496 1.54084 16.1803 1.769C16.2111 1.99716 16.1966 2.22914 16.1377 2.4517C16.0788 2.67426 15.9766 2.88304 15.837 3.06611V3.11839Z"
                              fill="currentColor"
                            />
                          </svg>
                        </RadioGroupPrimitive.Indicator>
                      </RadioGroupPrimitive.Item>
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
                  <LoadingButton
                    className="min-w-[100px]"
                    type="submit"
                    isLoading={isVoteLoading}>
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
            <div className="rounded-[4px] border-[2px] border-neutral-300">
              <div className="flex items-center space-x-2 border-b border-neutral-300 p-4">
                <Icon.LucideShare2 className="h-4 w-4" />
                <h1 className="text-base font-medium">Share</h1>
              </div>
              <div className="flex flex-col items-center justify-center p-4 py-6">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm">Share link</p>
                  <div className="flex">
                    <Input
                      className="w-full max-w-[450px] rounded-r-none border-r-0 pr-8"
                      value={shareUrl}
                      RightIcon={
                        <div
                          className="flex h-full w-16 cursor-pointer items-center justify-center rounded-r-[4px] bg-neutral-900 text-white"
                          onClick={copyLink}>
                          <Icon.Copy className="h-4 w-4" />
                        </div>
                      }
                    />
                  </div>
                </div>
                <div className="my-4 flex flex-wrap gap-4 text-neutral-600 [&_svg]:h-5 [&_svg]:w-5">
                  <EmailShareButton url={shareUrl}>
                    <Icon.LucideMail />
                  </EmailShareButton>

                  <FacebookShareButton url={shareUrl}>
                    <Icon.Facebook />
                  </FacebookShareButton>

                  <LinkedinShareButton url={shareUrl}>
                    <Icon.Linkedin />
                  </LinkedinShareButton>

                  <RedditShareButton url={shareUrl}>
                    <Icon.Reddit />
                  </RedditShareButton>

                  <TelegramShareButton url={shareUrl}>
                    <Icon.Telegram />
                  </TelegramShareButton>

                  <TwitterShareButton url={shareUrl}>
                    <Icon.Twitter />
                  </TwitterShareButton>

                  <WhatsappShareButton url={shareUrl}>
                    <Icon.Whatsapp />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PollPage;

PollPage.Layout = BaseLayout;
