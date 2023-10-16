import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { routes } from "../../../config/routes";
import { defaultCookies } from "../../../lib/default-cookies";
import prisma from "../../../lib/prisma";

const isSecure = process.env.NODE_ENV === "production";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  cookies: defaultCookies(isSecure),
  useSecureCookies: isSecure,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      const user = await prisma.user.findFirst({
        where: { email: token.email },
        select: {
          id: true,
          email: true,
          name: true,
          plan: true,
          timezone: true,
          clockType: true,
        },
      });
      if (!user) return token;
      return {
        ...token,
        ...user,
      };
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          plan: token.plan,
          clockType: token.clockType,
          timezone: token.timezone,
        },
      };
    },
  },
  pages: {
    signIn: routes.LOGIN,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
