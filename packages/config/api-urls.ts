type RouteValue = string | ((...args: string[]) => string);
type Route = {
  [key: string]: RouteValue | Route;
};

export const apiUrls = {
  user: {
    getCurrentUser: "/@me",
    delete: "/@me",
    update: "/@me",
    getPolls: "/@me/poll",
    getVotes: "/@me/vote",
  },
  poll: {
    getOne: (pollId) => `/poll/${pollId}` as const,
    getAll: "/poll",
    create: "/poll",
    delete: (pollId) => `/poll/${pollId}` as const,
    vote: (pollId, answerId) => `/poll/${pollId}/vote/${answerId}` as const,
    getVoters: (pollId) => `/poll/${pollId}/vote/users` as const,
    getUserAnswerChoice: (pollId) =>
      `/poll/${pollId}/answers/user-choice` as const,
  },
  payment: {
    getPricingPlans: "/payment/plan",
    createPlanCheckoutSession: "/payment/plan/checkout-session",
  },
  analytics: {
    userPollVotes: "/analytics/poll/vote",
  },
  webhooks: {
    stripe: "/webhook/stripe",
  },
} as const satisfies Route;
