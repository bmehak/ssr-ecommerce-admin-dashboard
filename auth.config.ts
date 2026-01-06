import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role;
      }
      if (!token.id && token.sub) token.id = token.sub;
      return token;
    },

    async session({ session, token }) {
      if(session.user){
        session.user.id = token.id as string;
        session.user.role = token.role as "admin" | "user";
      }
      return session;
    },

    authorized({ auth, request }) {
      const user = auth?.user;
      const path = request.nextUrl.pathname;

      if (path.startsWith("/dashboard")) {
        if (!user) return false;
      
        if (path.startsWith("/dashboard/admins") && user.role !== "admin") {
          return false;
        }
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;
