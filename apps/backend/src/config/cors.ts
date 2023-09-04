import type { CorsOptions } from "cors";

const whiteList = new Set([
  new URL(process.env.ORIGIN_URL as string).origin,
  new URL(process.env.FRONTEND_URL as string).origin,
]);

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whiteList.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
};
