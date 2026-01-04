import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Login required" },
      { status: 401 }
    );
  }
  try {
    await connectDB();

    const { productId, quantity, price } = await req.json();

    if (!productId || !quantity || !price) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    if (product.stock < quantity) {
      return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
    }

    await Order.create({
      productId,
      quantity,
      price: product.price,
    });

    product.stock -= quantity;
    await product.save();

    return NextResponse.json({ message: "Order placed" }, { status: 201 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
