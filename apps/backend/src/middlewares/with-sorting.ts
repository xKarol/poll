import type { OrderBy } from "@poll/types";
import type { NextFunction, Request, Response } from "express";
import z from "zod";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      sorting: {
        sortBy: string;
        orderBy: OrderBy;
      };
    }
  }
}

const sortingParams = z.object({
  orderBy: z.enum(["asc", "desc"]).default("desc").optional(),
});

type withSortingParams<T> = {
  allowedFields: readonly [T, ...T[]];
  defaultField: NonNullable<T>;
  defaultOrder?: OrderBy;
};

export const withSorting =
  <T extends string>({
    allowedFields,
    defaultField,
    defaultOrder = "desc",
  }: withSortingParams<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sortBy, orderBy } = sortingParams
        .extend({
          sortBy: z.enum(allowedFields).optional(),
        })
        .parse(req.query);
      req.sorting = {
        sortBy: sortBy || defaultField,
        orderBy: orderBy || defaultOrder,
      };
      next();
    } catch (error) {
      next(error);
    }
  };
