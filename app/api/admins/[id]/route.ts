import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { auth } from "@/auth";

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(req: Request, context: Context) {
  const session = await auth();

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = await context.params;

  await connectDB();

  await User.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
