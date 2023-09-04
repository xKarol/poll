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
