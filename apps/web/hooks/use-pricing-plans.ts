import { useQuery } from "@tanstack/react-query";

import { paymentOptions } from "../queries/payment";

export const usePricingPlans = (
  ...args: Parameters<typeof paymentOptions.getPricingPlans>
) => {
  return useQuery({
    placeholderData: [
      { productId: undefined, name: "FREE", prices: undefined },
      { productId: undefined, name: "BASIC", prices: undefined },
      { productId: undefined, name: "PRO", prices: undefined },
    ],
    ...paymentOptions.getPricingPlans(...args),
  });
};
