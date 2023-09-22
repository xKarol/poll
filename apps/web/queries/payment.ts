import type { Payment } from "@poll/types";
import type { UseQueryOptions } from "@tanstack/react-query";

import { getPricingPlans } from "../services/api";

export const paymentKeys = {
  getPricingPlans: (paymentCycle: Payment.PaymentCycle) =>
    ["payment.plans", { paymentCycle }] as const,
};

export const paymentOptions = {
  getPricingPlans: (
    paymentCycle: Payment.PaymentCycle
  ): UseQueryOptions<Awaited<ReturnType<typeof getPricingPlans>>> => ({
    queryKey: paymentKeys.getPricingPlans(paymentCycle),
    queryFn: getPricingPlans,
    cacheTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  }),
} satisfies Record<keyof typeof paymentKeys, unknown>;
