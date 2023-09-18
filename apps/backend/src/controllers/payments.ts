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

export const CreatePayment = async (
  req: Request<unknown, unknown, { priceId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { priceId } = req.body;
    const payment = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/pricing",
    });

    return res.send(payment.url);
  } catch (error) {
    next(error);
  }
};
