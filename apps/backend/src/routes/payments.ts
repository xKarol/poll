import express from "express";
import { z } from "zod";

import * as PaymentsController from "../controllers/payments";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";

const router = express.Router();

router.get(
  "/payment/plan",
  validateSchema(
    z.object({
      query: z.object({ paymentCycle: z.enum(["monthly", "yearly"]) }),
    })
  ),
  PaymentsController.GetPricingPlans
);

router.post(
  "/payment/plan/checkout-session",
  requireAuth,
  validateSchema(
    z.object({ body: z.object({ productId: z.string().nonempty() }) })
  ),
  PaymentsController.CreatePlanCheckoutSession
);

export default router;
