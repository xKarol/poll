import { apiUrls } from "@poll/config";
import express from "express";
import { z } from "zod";

import * as PaymentsController from "../controllers/payments";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";

const router = express.Router();

router.get(apiUrls.payment.getPricingPlans, PaymentsController.GetPricingPlans);

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
