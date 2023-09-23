import type { PlanData } from "@poll/types/payment";
import { useQuery } from "@tanstack/react-query";

import { paymentOptions } from "../queries/payment";

export const usePricingPlans = () => {
  const { data, ...rest } = useQuery(paymentOptions.getPricingPlans);
  return {
    data: [
      {
        name: "FREE",
        prices: [
          {
            id: "free_month",
            interval: "month",
            amount: 0,
            currency: "USD",
          },
          {
            id: "free_year",
            interval: "year",
            amount: 0,
            currency: "USD",
          },
        ],
      },
      ...(data ? data : undefined),
    ] as PlanData[],
    ...rest,
  };
};
