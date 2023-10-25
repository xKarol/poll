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

const isSecure = process.env.NODE_ENV === "production";
const cookiePrefix = isSecure ? "__Secure-" : "";

export const withAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("DEBUG_COOKIES:", req.headers.cookie);
  console.log("DEBUG_COOKIE_NAME:", `${cookiePrefix}next-auth.session-token`);
  const jwtData = (await decode({
    secret: process.env.NEXTAUTH_SECRET as string,
    token: cookie.parse(req.headers.cookie || "")[
      `${cookiePrefix}next-auth.session-token`
    ],
  })) as Auth.JWTPayload | null;
  console.log("DEBUG_JWT_DATA:", jwtData);
  req.user = jwtData;
  next();
};
