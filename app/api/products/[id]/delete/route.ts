import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function POST(
  req: NextRequest, { params }: RouteContext
) {
  await connectDB();

  await Product.findByIdAndDelete(params.id);

  return NextResponse.redirect(
    new URL("/dashboard/products", req.url)
  );
}
