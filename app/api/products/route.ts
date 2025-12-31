import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import { Product } from "../../../models/Product";
import { productSchema } from "@/lib/zod-schemas";
import { auth } from "@/auth";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (err) {
    console.error("GET ERROR:", err);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

    const json = await req.json();
    const parsed = productSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    await connectDB();
    console.log("Creating product:", parsed.data);
    const product = await Product.create(parsed.data);

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("POST ERROR:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return NextResponse.json({ message: "Failed to delete product" }, { status: 500 });
  }
}