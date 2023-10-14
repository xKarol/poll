import { apiUrls } from "@poll/config";
import prisma, { type Plan } from "@poll/prisma";
import express from "express";

import { stripe } from "../lib/stripe";

const router = express.Router();

router.post(
  apiUrls.webhooks.stripe,
  express.raw({ type: "application/json" }),
  async (request, response, next) => {
    try {
      const signature = request.headers["stripe-signature"];
      const event = stripe.webhooks.constructEvent(
        request.body,
        signature as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
      switch (event.type) {
        case "customer.subscription.created": {
          // @ts-expect-error
          const { userId, planName } = event.data.object.metadata as {
            userId: string;
            planName: Plan;
          };

          await prisma.user.update({
            where: { id: userId },
            data: { plan: planName },
          });
          break;
        }
        case "customer.subscription.deleted": {
          // @ts-expect-error
          const { userId } = event.data.object.metadata as {
            userId: string;
            planName: Plan;
          };

          await prisma.user.update({
            where: { id: userId },
            data: { plan: "FREE" },
          });
          break;
        }
      }

      response.json({ received: true });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
