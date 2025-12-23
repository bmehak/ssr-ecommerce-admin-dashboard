import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import { Product } from "../../../models/Product";
import { productSchema } from "../../../lib/validators/product";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const json = await req.json();

  const parsed = productSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await connectDB();
  const product = await Product.create(parsed.data);

  return NextResponse.json(product, { status: 201 });
}
