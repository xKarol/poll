import type { QR } from "@poll/types";
import type { NextFunction, Request, Response } from "express";

import { generateQRCode } from "../services/qr";

export const GetQRCode = async (
  req: Request<unknown, unknown, unknown, QR.GetQRParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text } = req.query;
    const qrCode = await generateQRCode(decodeURIComponent(text));

    res.contentType("image/png");
    return res.send(qrCode);
  } catch (error) {
    next(error);
  }
};
