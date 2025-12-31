import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user && "role" in user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role as "admin" | "user";
      return session;
    },

    authorized({ auth, request }) {
      const user = auth?.user;
      const path = request.nextUrl.pathname;

      const isDashboard = path.startsWith("/dashboard");
      const isAdminRoute = path.startsWith("/dashboard/admins");

      if (isDashboard && !user) return false;
      if (isAdminRoute && user?.role !== "admin") return false;

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
