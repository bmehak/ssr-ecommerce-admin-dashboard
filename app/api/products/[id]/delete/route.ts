import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(
  req: Request,
  context: any
) {
  await connectDB();

  await Product.findByIdAndDelete(context.params.id);

  return NextResponse.redirect(
    new URL("/dashboard/products", req.url)
  );
}
