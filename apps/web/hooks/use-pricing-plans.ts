import { useQuery } from "@tanstack/react-query";

import { paymentOptions } from "../queries/payment";

export const usePricingPlans = () => {
  return useQuery({
    placeholderData: [
      { productId: undefined, name: "FREE", prices: undefined },
      { productId: undefined, name: "BASIC", prices: undefined },
      { productId: undefined, name: "PRO", prices: undefined },
    ],
    ...paymentOptions.getPricingPlans,
  });
};
