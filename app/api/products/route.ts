import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import { Product } from "../../../models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  const product = await Product.create(body);
  return NextResponse.json(product);
}
