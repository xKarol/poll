import express from "express";
import { z } from "zod";

import * as PaymentsController from "../controllers/payments";
import { requireAuth } from "../middlewares/require-auth";
import { validateSchema } from "../middlewares/validate-schema";

const router = express.Router();

router.get("/payments", PaymentsController.GetPrices);
router.post(
  "/payments",
  requireAuth,
  validateSchema(
    z.object({ body: z.object({ priceId: z.string().nonempty() }) })
  ),
  PaymentsController.CreatePayment
);

export default router;
