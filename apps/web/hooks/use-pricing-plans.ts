import { useQuery } from "@tanstack/react-query";

import { paymentOptions } from "../queries/payment";

export const usePricingPlans = (paymentCycle: "monthly" | "yearly") => {
  return useQuery(paymentOptions.getPricingPlans(paymentCycle));
};
