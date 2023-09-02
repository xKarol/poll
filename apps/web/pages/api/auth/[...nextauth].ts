import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@poll/prisma";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
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
    async jwt({ token, account }) {
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
        ...(account && { token: account.id_token }),
      };
    },

    async session({ session, token }) {
      return { ...session, token: token.token };
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
