import type { Request, Response, NextFunction } from "express";

import { createQueue, createWorker } from "../lib/queue";
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

type WithCacheOptions = {
  requireUser?: boolean;
};

export function withCache(
  secondsToExpire: number,
  options: WithCacheOptions = {}
) {
  const { requireUser = false } = options;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.data?.id;
      const cacheKey = `${req.originalUrl}${requireUser ? `:${userId}` : ""}`;

      if (requireUser && !userId) {
        next();
      }

      const cacheDataRaw = await redis.get(cacheKey);
      if (cacheDataRaw) {
        const cacheData = JSON.parse(cacheDataRaw);
        return res.send(cacheData);
      }

      req.cache = {
        set: async (data) => {
          cacheQueue.add(cacheKey, {
            ex: secondsToExpire,
            data: JSON.stringify(data),
          });
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
}

type QueueData = {
  ex: number;
  data: string;
};

const cacheQueue = createQueue<QueueData>("cache-queue");
createWorker<QueueData>("cache-queue", async (job) => {
  const { ex, data } = job.data;
  return await redis.setex(job.name, ex, data);
});
