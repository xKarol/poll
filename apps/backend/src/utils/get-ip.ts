import type { Request } from "express";

export const getIP = (req: Request) => {
  const ip =
    req.headers["x-real-ip"] || req.headers["true-client-ip"] || req.ip;
  return ip as string;
};