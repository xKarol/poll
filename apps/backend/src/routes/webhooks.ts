import prisma, { type Plan } from "@poll/prisma";
import express from "express";

const router = express.Router();

router.post("/webhook/stripe", async (request, response) => {
  const event = request.body; //TODO set proper type
  // TODO secure webhook
  switch (event.type) {
    case "payment_intent.succeeded": {
      const { userId, planName } = event.data.object.metadata as {
        userId: string;
        planName: Plan;
      };

      prisma.user.update({ where: { id: userId }, data: { plan: planName } });
      break;
    }
  }

  response.json({ received: true });
});

export default router;
