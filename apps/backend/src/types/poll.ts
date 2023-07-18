export type CreatePollData = {
  poll: string;
  answers: { text: string }[];
};

export type DeletePollData = {
  pollId: string;
};

export type GetPollData = {
  pollId: string;
};
