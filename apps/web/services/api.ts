import type { Poll } from "@poll/types";

import axios from "../lib/axios";

export const createPoll: Poll.Api["createPoll"] = async (pollData) => {
  const { data } = await axios.post("/poll", pollData);
  return data;
};

export const getPolls: Poll.Api["getPolls"] = async (page = 1, limit = 10) => {
  const { data } = await axios.get(`/poll`, {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const getPoll: Poll.Api["getPoll"] = async (pollId) => {
  const { data } = await axios.get(`/poll/${pollId}`);
  return data;
};

export const votePoll: Poll.Api["votePoll"] = async (pollId, answerId) => {
  const { data } = await axios.post(`/poll/${pollId}/vote/${answerId}`);
  return data;
};

export const getUserPolls: Poll.Api["getUserPolls"] = async (
  page = 1,
  limit = 10
) => {
  const { data } = await axios.get(`/@me/poll`, {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const getPollVoters: Poll.Api["getPollVoters"] = async (pollId) => {
  const { data } = await axios.get(`/poll/${pollId}/vote/users`);
  return data;
};

export const getPollUserAnswerChoice: Poll.Api["getPollUserAnswerChoice"] =
  async (pollId) => {
    const { data } = await axios.get(`/poll/${pollId}/answers/user-choice`);
    return data;
  };
