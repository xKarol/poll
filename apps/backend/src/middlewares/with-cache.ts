import type { Request, Response, NextFunction } from "express";

import redis from "../lib/redis";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      cache: {
        set: (data: Record<string, unknown> | unknown[]) => Promise<void>;
        delete: (cacheKey: string) => Promise<void>;
      };
    }
  }
}

export const withCache = (secondsToExpire: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cacheKey = req.originalUrl;
      const cacheDataRaw = await redis.get(cacheKey);
      if (cacheDataRaw) {
        const cacheData = JSON.parse(cacheDataRaw);
        return res.send(cacheData);
      }

      req.cache = {
        set: async (data) => {
          await redis.setex(cacheKey, secondsToExpire, JSON.stringify(data));
        },
        delete: async () => {
          await redis.del(cacheKey);
        },
      };
      next();
    } catch (error) {
      next(error);
    }
  };
};
