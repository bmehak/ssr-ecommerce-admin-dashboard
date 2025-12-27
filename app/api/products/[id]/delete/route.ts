import { NextResponse } from "next/server";
import { connectDB } from "../../../../../lib/db";
import { Product } from "../../../../../models/Product";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function POST(req: Request, context: RouteContext) {
  await connectDB();

  await Product.findByIdAndDelete(context.params.id);

  return NextResponse.redirect(
    new URL("/dashboard/products", req.url)
  );
}
