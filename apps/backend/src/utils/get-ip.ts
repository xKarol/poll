import type { Request } from "express";
import requestIp from "request-ip";

export const getIP = (req: Request) => {
  const ip = requestIp.getClientIp(req);
  return ip as string;
};
