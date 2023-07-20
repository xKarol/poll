import axios from "../lib/axios";
import type { Poll } from "types";

export const createPoll: Poll.Services["createPoll"] = async (pollData) => {
  const { data } = await axios.post("/poll", pollData);
  return data;
};

export const getPoll: Poll.Services["getPoll"] = async (pollId) => {
  const { data } = await axios.get(`/poll/${pollId}`);
  return data;
};

export const votePoll: Poll.Services["votePoll"] = async (pollId, answerId) => {
  const { data } = await axios.post(`/poll/${pollId}/vote/${answerId}`);
  return data;
};
