import type { Payment } from "@poll/types";
import { useQuery } from "@tanstack/react-query";

import { paymentOptions } from "../queries/payment";

export const usePricingPlans = (paymentCycle: Payment.PaymentCycle) => {
  return useQuery(paymentOptions.getPricingPlans(paymentCycle));
};
