import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/db";
import { Product } from "../../../../models/Product";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(req: Request, context: RouteContext) {
  await connectDB();

  const { id } = await context.params;

  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
