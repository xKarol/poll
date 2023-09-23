import type { Plan } from "@poll/prisma";
import type { Stripe } from "stripe";

export type PaymentCycle = Extract<
  Stripe.Price.Recurring.Interval,
  "month" | "year"
>;

export type PlanData = {
  name: Plan;
  prices: {
    id: string;
    interval: Stripe.Price.Recurring.Interval;
    amount: number;
    currency: string;
  }[];
};

// Frontend
export interface Api {
  getPricingPlans: () => Promise<PlanData[]>;
  createPlanCheckoutSession: (priceId: string) => Promise<string>;
}

// Backend
export interface Services extends Api {}
