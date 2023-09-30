import type { Poll, Payment, User } from "@poll/types";

import axios from "../lib/axios";

// POLL
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

export const votePoll: Poll.Api["votePoll"] = async (
  pollId,
  answerId,
  reCaptchaToken
) => {
  const { data } = await axios.post(`/poll/${pollId}/vote/${answerId}`, {
    reCaptchaToken,
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

// PAYMENTS
export const getPricingPlans: Payment.Api["getPricingPlans"] = async () => {
  const { data } = await axios.get("/payment/plan");
  return data;
};

export const createPlanCheckoutSession: Payment.Api["createPlanCheckoutSession"] =
  async (priceId) => {
    const { data } = await axios.post("/payment/plan/checkout-session", {
      priceId,
    });
    return data;
  };

// USER
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

export const getUserVotes: User.Api["getUserVotes"] = async (
  page = 1,
  limit = 10
) => {
  const { data } = await axios.get(`/@me/vote`, {
    params: {
      page,
      limit,
    },
  });
  return data;
};

export const updateUser: User.Api["updateUser"] = async (userData) => {
  const { data } = await axios.patch(`/@me`, userData);
  return data;
};
