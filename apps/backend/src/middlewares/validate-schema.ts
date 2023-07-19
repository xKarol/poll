import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject, ZodSchema } from "zod";

export const validateSchema =
  (schema: ZodSchema | AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
