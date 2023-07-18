import axios from "../lib/axios";

// TODO create global package with types
export type Data = {
  question: string;
  answers: { text: string }[];
};
// TODO add return type
export const createPoll = async (pollData: Data) => {
  const { data } = await axios.post("/poll", pollData);
  return data;
};

// TODO add return type
export const getPoll = async (pollId: string) => {
  const { data } = await axios.get(`/poll/${pollId}`);
  return data;
};
