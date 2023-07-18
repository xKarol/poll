export type CreateQuestionData = {
  question: string;
  answers: { text: string }[];
};

export type DeleteQuestionData = {
  questionId: string;
};
