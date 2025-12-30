import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./lib/db";
import { User } from "./models/User";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = credentials.email as string;
        const password = credentials.password as string;
        await connectDB();

        const user = await User.findOne({ email }).lean();

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!passwordMatch) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          role: user.role as "admin" | "user",
        };
      },
    }),
  ],
});
