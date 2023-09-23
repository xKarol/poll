import type { UseQueryOptions } from "@tanstack/react-query";

import { getPricingPlans } from "../services/api";

export const paymentKeys = {
  getPricingPlans: ["payment.plans"] as const,
};

export const paymentOptions = {
  getPricingPlans: {
    queryKey: paymentKeys.getPricingPlans,
    queryFn: getPricingPlans,
    cacheTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  } satisfies UseQueryOptions<Awaited<ReturnType<typeof getPricingPlans>>>,
} satisfies Record<keyof typeof paymentKeys, unknown>;
