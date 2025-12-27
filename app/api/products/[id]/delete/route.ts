import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";

export async function POST(req: Request, { params }) {
  await connectDB();

  await Product.findByIdAndDelete(params.id);

  return NextResponse.redirect(
    new URL("/dashboard/products", req.url)
  );
}
