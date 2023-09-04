import type { Auth } from "@poll/types";
import cookie from "cookie";
import type { NextFunction, Request, Response } from "express";
import { decode } from "next-auth/jwt";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: Auth.JWTPayload | null;
    }
  }
}

export const withAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtData = (await decode({
    secret: process.env.NEXTAUTH_SECRET as string,
    token: cookie.parse(req.headers.cookie || "")["next-auth.session-token"],
  })) as Auth.JWTPayload | null;

  req.user = jwtData;
  next();
};
