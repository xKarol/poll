import { useQuery } from "@tanstack/react-query";

import { paymentOptions } from "../queries/payment";

export const usePricingPlans = () => {
  return useQuery(paymentOptions.getPricingPlans());
};
