import { useQuery } from "@tanstack/react-query";

import { paymentOptions } from "../queries/payment";

export const usePricingPlans = () => {
  return useQuery({
    placeholderData: [
      { name: "FREE", prices: undefined },
      { name: "BASIC", prices: undefined },
      { name: "PRO", prices: undefined },
    ],
    ...paymentOptions.getPricingPlans,
  });
};
