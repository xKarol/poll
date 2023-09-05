import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@poll/prisma";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { defaultCookies } from "../../../lib/default-cookies";

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
        },
      });
      if (!user) return token;

      return {
        ...token,
        id: user.id,
        email: user.email,
        name: user.name,
      };
    },

    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
