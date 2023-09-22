import type { UseQueryOptions } from "@tanstack/react-query";

import { getPricingPlans } from "../services/api";

export const paymentKeys = {
  getPricingPlans: (paymentCycle: "monthly" | "yearly") =>
    ["payment.plans", { paymentCycle }] as const,
};

export const paymentOptions = {
  getPricingPlans: (
    paymentCycle: "monthly" | "yearly"
  ): UseQueryOptions<Awaited<ReturnType<typeof getPricingPlans>>> => ({
    queryKey: paymentKeys.getPricingPlans(paymentCycle),
    queryFn: getPricingPlans,
    cacheTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  }),
} satisfies Record<keyof typeof paymentKeys, unknown>;
