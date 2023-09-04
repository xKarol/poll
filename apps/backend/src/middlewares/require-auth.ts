import type { NextFunction, Request, Response } from "express";
import httpError from "http-errors";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw httpError.Unauthorized("Please Log In.");
    next();
  } catch (error) {
    next(error);
  }
};
