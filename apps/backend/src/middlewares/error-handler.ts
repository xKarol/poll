import createError from "http-errors";
import type { NextFunction, Request, Response } from "express";

import { getErrorMessage } from "../utils/error";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const message = getErrorMessage(error);
  const errorData = error instanceof createError.HttpError ? error : undefined;
  const status: number = errorData ? errorData.statusCode : 400;
  const stack = errorData ? errorData.stack : undefined;
  res.status(status).send({
    status: status,
    message: message,
    ...(process.env["NODE_ENV"] !== "production" && { stack: stack }),
  });
};
