import { apiUrls } from "@poll/config";
import express from "express";
import { z } from "zod";

import * as PaymentsController from "../controllers/payments";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";
import { withCache } from "../middlewares/with-cache";

const router = express.Router();

router.get(
  apiUrls.payment.getPricingPlans,
  withCache(60 * 60 * 24), //1 day
  PaymentsController.GetPricingPlans
);

router.post(
  apiUrls.payment.createPlanCheckoutSession,
  requireAuth,
  validateSchema(
    z.object({
      body: z.object({
        priceId: z.string().nonempty(),
        productId: z.string().nonempty(),
      }),
    })
  ),
  PaymentsController.CreatePlanCheckoutSession
);

export default router;
