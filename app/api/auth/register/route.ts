import { connectDB } from "@/lib/db";
import { User } from "@/models/User"; // Ensure you have a User model
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ message: "User exists" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "Admin created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}