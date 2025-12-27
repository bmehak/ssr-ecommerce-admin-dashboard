import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";

interface RouteContext {
  params: { id: string };
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = context.params;

  await connectDB();

  await Product.findByIdAndDelete(id);

  return NextResponse.redirect(
    new URL("/dashboard/products", request.url)
  );
}
