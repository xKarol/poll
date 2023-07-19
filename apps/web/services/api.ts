import axios from "../lib/axios";
import type { Poll } from "types";

export const createPoll: Poll.Services["createPoll"] = async (pollData) => {
  const { data } = await axios.post("/poll", pollData);
  return data;
};

export const getPoll: Poll.Services["getPoll"] = async (pollId: string) => {
  const { data } = await axios.get(`/poll/${pollId}`);
  return data;
};
