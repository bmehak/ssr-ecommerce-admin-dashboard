import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(req: Request, context: RouteContext) {
  const { id } = await context.params;

  await connectDB();
  
  try {
    await Product.findByIdAndDelete(id);
    return NextResponse.redirect(new URL("/dashboard/products", req.url));
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}