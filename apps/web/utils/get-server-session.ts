import type { IncomingMessage, ServerResponse } from "http";
import { getServerSession as _getServerSession } from "next-auth";
import type { NextApiRequestCookies } from "next/dist/server/api-utils";

import { getAuthOptions } from "../pages/api/auth/[...nextauth]";

export const getServerSession = async ({
  req,
  res,
}: {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
  res: ServerResponse;
}) => {
  // @ts-expect-error
  const session = await _getServerSession(req, res, getAuthOptions(req));
  return session;
};
