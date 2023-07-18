import axios from "../lib/axios";

// TODO create global package with types
export type Data = {
  question: string;
  answers: { text: string }[];
};

export const createPoll = async (pollData: Data) => {
  const { data } = await axios.post("/poll", pollData);
  return data;
};
