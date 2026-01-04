import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email & password required" },
      { status: 400 }
    );
  }

  await connectDB();

  const exists = await User.findOne({ email });

  if (exists) {
    return NextResponse.json(
      { message: "Account already exists" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashed,
    role: "user",   // 🔥 FORCE USER ROLE
  });

  return NextResponse.json(
    { message: "Account created successfully" },
    { status: 201 }
  );
}
