import type { Payment } from "@poll/types";
import type { NextFunction, Request, Response } from "express";
import type { Stripe } from "stripe";

import { stripe } from "../lib/stripe";

const productIds = ["prod_OdTeDMfvLOovf7", "prod_OgWA2HVPnkMJCd"];

export const GetPricingPlans = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [standardPlanProductId, premiumPlanProductId] = productIds;

    const [standardPrices, premiumPrices] = await Promise.all([
      stripe.prices.list({
        product: standardPlanProductId,
      }),
      stripe.prices.list({
        product: premiumPlanProductId,
      }),
    ]);

    const filterPrices = (
      prices: Stripe.Response<Stripe.ApiList<Stripe.Price>>
    ) => {
      const filteredData = prices.data.filter(
        (price) => price.type === "recurring"
      );
      if (filteredData.length !== 2)
        throw new Error(
          `Invalid recurring prices length. Expected 2, Received: ${filteredData.length}`
        );
      return [...filteredData];
    };

    const data: Payment.PlanData[] = [
      {
        name: "STANDARD",
        // @ts-ignore
        prices: filterPrices(standardPrices).map((price) => {
          return {
            id: price.id,
            interval: price.recurring?.interval,
            amount: price.unit_amount,
            currency: price.currency,
          };
        }),
      },
      {
        name: "PREMIUM",
        // @ts-ignore
        prices: filterPrices(premiumPrices).map((price) => ({
          id: price.id,
          interval: price.recurring?.interval,
          amount: price.unit_amount,
          currency: price.currency,
        })),
      },
    ];

    return res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const CreatePlanCheckoutSession = async (
  req: Request<unknown, unknown, { priceId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { priceId } = req.body;
    const { id: userId } = req.user!;
    const redirectUrl = process.env.FRONTEND_URL as string;

    const payment = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      subscription_data: {
        metadata: {
          userId,
          priceId,
        },
        trial_period_days: 14,
      },
      success_url: redirectUrl,
      cancel_url: `${redirectUrl}/pricing`,
    });

    return res.send(payment.url);
  } catch (error) {
    next(error);
  }
};
