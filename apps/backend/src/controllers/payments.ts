import type { Plan } from "@poll/prisma";
import type { NextFunction, Request, Response } from "express";

import { stripe } from "../lib/stripe";

export const GetPrices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await stripe.prices.list({
      limit: 3,
    });
    return res.send(products.data);
  } catch (error) {
    next(error);
  }
};

const planNames: Plan[] = ["FREE", "STANDARD", "PREMIUM"];

export const CreatePayment = async (
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

    const payment = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      payment_intent_data: {
        metadata: {
          userId,
          productId,
          priceId,
          planName: matchingPlan,
        },
      },
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/pricing",
    });

    return res.send(payment.url);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
