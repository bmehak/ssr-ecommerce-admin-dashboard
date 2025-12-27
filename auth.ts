import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { connectDB } from "./lib/db";
import { User } from "./models/User";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email });
        
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(
          credentials!.password as string,
          user.password
        );

        if (passwordsMatch) return { id: user._id.toString(), email: user.email };
        return null;
      },
    }),
  ],
});