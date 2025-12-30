import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";

type Context = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, context: Context) {
  const { id } = await context.params;

  await connectDB();

  const data = await req.json();

  await Product.findByIdAndUpdate(id, data);

  return NextResponse.json({ success: true });
}
