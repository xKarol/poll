import type { UseQueryOptions } from "@tanstack/react-query";

import { getPricingPlans } from "../services/api";

export const paymentKeys = {
  getPricingPlans: ["payment.plans"] as const,
};

export const paymentOptions = {
  getPricingPlans: (
    options?: UseQueryOptions<Awaited<ReturnType<typeof getPricingPlans>>>
  ): UseQueryOptions<Awaited<ReturnType<typeof getPricingPlans>>> => ({
    cacheTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    ...options,
    queryKey: paymentKeys.getPricingPlans,
    queryFn: getPricingPlans,
  }),
} satisfies Record<keyof typeof paymentKeys, unknown>;
