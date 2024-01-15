import * as Sentry from "@sentry/node";
import type { NextFunction, Request, Response } from "express";

import { captureError } from "../utils/capture-error";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  Sentry.captureException(error);
  const capturedError = captureError(error);
  const status = capturedError.statusCode;
  res.status(status).send({
    status,
    message: capturedError.message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: capturedError.stack,
    }),
  });
};
