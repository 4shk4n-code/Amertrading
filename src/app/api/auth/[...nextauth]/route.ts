import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };

