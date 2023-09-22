import type { Stripe } from "stripe";

export type PaymentCycle = "monthly" | "yearly";

// Frontend
export interface Api {
  getPricingPlans: () => Promise<
    (Omit<Stripe.Product, "default_price"> & { default_price: Stripe.Price })[]
  >;
  createPaymentPageUrl: (
    productId: string,
    paymentCycle: PaymentCycle
  ) => Promise<string>;
}

// Backend
export interface Services extends Api {}
