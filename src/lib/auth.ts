import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

const allowedEmails = process.env.ADMIN_ALLOWED_EMAILS
  ? process.env.ADMIN_ALLOWED_EMAILS.split(",").map((email) => email.trim())
  : [];

export const authOptions = {
  // Use adapter for Google OAuth (requires database)
  // For credentials, we'll use JWT sessions (no database needed)
  adapter: process.env.DATABASE_URL ? PrismaAdapter(prisma) : undefined,
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        const envUsername = process.env.ADMIN_USERNAME;
        const envPassword = process.env.ADMIN_PASSWORD;

        if (
          !credentials?.username ||
          !credentials?.password ||
          !envUsername ||
          !envPassword
        ) {
          return null;
        }

        if (
          credentials.username === envUsername &&
          credentials.password === envPassword
        ) {
          const email = envUsername.includes("@")
            ? envUsername
            : `${envUsername}@amertrading.local`;

          return {
            id: `admin-${envUsername}`,
            name: "Administrator",
            email,
            role: "admin",
          } as any;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (allowedEmails.length === 0) return true;
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }
      return false;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "admin";
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role ?? "admin";
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/signin",
    error: "/admin/signin",
  },
} as const;

export const getAuthSession = () =>
  getServerSession(authOptions as unknown as Parameters<typeof NextAuth>[2]);

