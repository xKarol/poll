import type { Plan } from "@poll/prisma";
import type { Payment } from "@poll/types";
import type { NextFunction, Request, Response } from "express";

import { stripe } from "../lib/stripe";

const productIds = [
  // monthly product ids
  ["prod_OdTeDMfvLOovf7", "prod_OdTgXMYSYsi03h"],
  // yearly product ids TODO change
  ["prod_OdTeDMfvLOovf7", "prod_OdTgXMYSYsi03h"],
];

export const GetPricingPlans = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentCycle } = req.query as {
      paymentCycle: Payment.PaymentCycle;
    };

    const products = await stripe.products.list({
      ids: paymentCycle === "monthly" ? productIds[0] : productIds[1],
      expand: ["data.default_price"],
    });
    return res.status(200).send(products.data);
  } catch (error) {
    next(error);
  }
};

const planNames: Plan[] = ["FREE", "STANDARD", "PREMIUM"];

export const CreatePlanCheckoutSession = async (
  req: Request<unknown, unknown, { productId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body;
    const { id: userId } = req.user!;

    const productData = await stripe.products.retrieve(productId);
    const priceId =
      typeof productData.default_price === "string"
        ? productData.default_price
        : productData.default_price?.id;
    if (!priceId) {
      throw new Error("The product does not have a set default price.");
    }

    const matchingPlan = planNames.find((planName) =>
      productData.name.toUpperCase().includes(planName)
    );

    if (!matchingPlan) throw new Error(`Invalid plan '${productData.name}'`);

    const redirectUrl = process.env.FRONTEND_URL as string;

    const payment = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      subscription_data: {
        metadata: {
          userId,
          productId,
          priceId,
          planName: matchingPlan,
        },
        trial_period_days: 14,
      },
      success_url: redirectUrl,
      cancel_url: `${redirectUrl}/pricing`,
    });

    return res.send(payment.url);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
