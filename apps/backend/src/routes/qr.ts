import { apiUrls } from "@poll/config";
import express from "express";

import * as QRController from "../controllers/qr";
import { validateSchema } from "../middlewares/validate-schema";
import * as QRSchema from "../schemas/qr";

const router = express.Router();

router.get(
  apiUrls.qr.getQRCode,
  validateSchema(QRSchema.getQRCode),
  QRController.GetQRCode
);

export default router;
