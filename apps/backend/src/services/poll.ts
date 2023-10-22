import prisma from "@poll/prisma";
import type { Poll } from "@poll/types";

export const getPolls: Poll.Services["getPolls"] = async ({
  page = 1,
  skip,
  limit = 10,
}) => {
  const response = await prisma.poll.findMany({
    skip: skip,
    take: limit + 1,
    where: {
      isPublic: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: { answers: true },
  });

  return {
    data: response
      .map(({ answers: _answers, ...data }) => {
        const totalVotes = _answers
          .map(({ votes }) => votes)
          .reduce((total, votes) => total + Number(votes), 0);
        return { ...data, totalVotes };
      })
      .slice(0, limit),
    nextPage: response.length > limit ? page + 1 : undefined,
  };
};

export const getPoll: Poll.Services["getPoll"] = async (pollId) => {
  const response = await prisma.poll.findUniqueOrThrow({
    where: {
      id: pollId,
    },
    include: { answers: true, user: true },
  });
  return response;
};

export const getUserPolls: Poll.Services["getUserPolls"] = async (
  userId,
  { page = 1, skip, limit = 10 }
) => {
  const response = await prisma.poll.findMany({
    skip: skip,
    take: limit + 1,
    where: {
      userId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: { answers: true },
  });
  return {
    data: response.slice(0, limit),
    nextPage: response.length > limit ? page + 1 : undefined,
  };
};

export const getPollVotes = async (pollId: string) => {
  const response = await prisma.answer.findMany({
    where: {
      pollId: pollId,
    },
  });
  return response;
};
export const createPoll: Poll.Services["createPoll"] = async (data) => {
  const response = await prisma.poll.create({
    data: {
      userId: data.userId,
      question: data.question,
      isPublic: data.isPublic,
      requireRecaptcha: data.requireRecaptcha,
      answers: {
        createMany: { data: data.answers },
      },
    },
  });
  return response;
};

export const updatePoll: Poll.Services["updatePoll"] = async (pollId, data) => {
  const response = await prisma.poll.update({
    where: { id: pollId },
    data: {
      ...data,
    },
  });
  return response;
};

export const deletePoll: Poll.Services["deletePoll"] = async (pollId) => {
  await prisma.poll.delete({
    where: { id: pollId },
  });
};

export const votePoll: Poll.Services["votePoll"] = async ({
  userId,
  pollId,
  answerId,
}) => {
  await prisma.poll.update({
    where: { id: pollId },
    data: {
      totalVotes: {
        increment: 1,
      },
      answers: {
        update: {
          where: {
            id: answerId,
          },
          data: { votes: { increment: 1 } },
        },
      },
    },
  });
  const response = await prisma.vote.create({
    data: {
      userId: userId,
      pollId,
      answerId,
    },
  });
  return response;
};

export const getPollVoters: Poll.Services["getPollVoters"] = async (pollId) => {
  const users = await prisma.vote.findMany({
    take: 10,
    where: {
      pollId,
    },
    distinct: ["userId"],
    select: {
      user: true,
    },
  });

  return users
    .filter((data) => data.user !== null)
    .map(({ user }) => user as NonNullable<typeof user>);
};

export const getPollUserAnswerChoice: Poll.Services["getPollUserAnswerChoice"] =
  async (userId, pollId) => {
    const vote = await prisma.vote.findFirst({
      where: {
        pollId,
        userId,
      },
    });

    return vote;
  };
