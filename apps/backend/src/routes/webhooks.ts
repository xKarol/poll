import prisma, { type Plan } from "@poll/prisma";
import express from "express";

import { stripe } from "../lib/stripe";

const router = express.Router();

router.post(
  "/webhook/stripe",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const signature = request.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      request.body,
      signature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    switch (event.type) {
      case "payment_intent.succeeded": {
        // @ts-expect-error
        const { userId, planName } = event.data.object.metadata as {
          userId: string;
          planName: Plan;
        };

        prisma.user.update({ where: { id: userId }, data: { plan: planName } });
        break;
      }
    }

    response.json({ received: true });
  }
);

export default router;
