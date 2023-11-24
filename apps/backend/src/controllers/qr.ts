import type { QR } from "@poll/types";
import type { NextFunction, Request, Response } from "express";

import { generateQRCode } from "../services/qr";

export const GetQRCode = async (
  req: Request<QR.GetQRParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.params;

    const qrCode = await generateQRCode(text);

    res.contentType("image/png");
    return res.send(qrCode);
  } catch (error) {
    next(error);
  }
};
