import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  callbacks: {
    async signIn() {
      // Auto-set brandId cookie to default brand on every login
      try {
        const brand = await prisma.brand.findFirst({ where: { published: true }, orderBy: { createdAt: "asc" } });
        if (brand) {
          // Cookie is set via headers in the middleware — see middleware.ts
        }
      } catch {}
      return true;
    },
    async jwt({ token, user }) {
      if (user) { token.id = user.id; }
      // Attach default brandId to token
      if (!token.brandId) {
        const brand = await prisma.brand.findFirst({ where: { published: true }, orderBy: { createdAt: "asc" } });
        if (brand) token.brandId = brand.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) { session.user.id = token.id as string; }
      (session as any).brandId = token.brandId as string;
      return session;
    },
  },
};
