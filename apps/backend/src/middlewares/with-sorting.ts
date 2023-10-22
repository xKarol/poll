import type { NextFunction, Request, Response } from "express";
import z from "zod";

type Order = "asc" | "desc";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      sorting: {
        sortBy: string;
        order: Order;
      };
    }
  }
}

const sortingParams = z.object({
  order: z.enum(["asc", "desc"]).default("desc").optional(),
});

type withSortingParams<T> = {
  allowedFields: readonly [T, ...T[]];
  defaultField: NonNullable<T>;
  defaultOrder?: Order;
};

export const withSorting =
  <T extends string>({
    allowedFields,
    defaultField,
    defaultOrder = "desc",
  }: withSortingParams<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sortBy, order } = sortingParams
        .extend({
          sortBy: z.enum(allowedFields).optional(),
        })
        .parse(req.query);
      req.sorting = {
        sortBy: sortBy || defaultField,
        order: order || defaultOrder,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
