import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

const allowedEmails = process.env.ADMIN_ALLOWED_EMAILS
  ? process.env.ADMIN_ALLOWED_EMAILS.split(",").map((email) => email.trim())
  : [];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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
          } as unknown as Record<string, unknown>;
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
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      if (allowedEmails.length === 0) return true;
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }
      return false;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role ?? "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/signin",
    error: "/admin/signin",
  },
};

export const getAuthSession = () => getServerSession(authOptions);

